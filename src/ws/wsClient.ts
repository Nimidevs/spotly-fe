/**
 * Global WebSocket client (singleton).
 * One connection for the app; connect when user is authenticated, disconnect on logout.
 */

type MessageHandler = (data: unknown, ws: WebSocket) => void;

let ws: WebSocket | null = null;
let messageHandler: MessageHandler | null = null;
let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
let reconnectAttempts = 0;
let currentUrl: string | null = null;
let autoReconnect = true;
let onOpenCallback: (() => void) | null = null;
let onCloseCallback: (() => void) | null = null;

export interface ConnectOptions {
  url: string;
  onOpen?: () => void;
  onClose?: () => void;
}

function connect(urlOrOptions: string | ConnectOptions) {
  const url = typeof urlOrOptions === "string" ? urlOrOptions : urlOrOptions.url;
  const onOpen = typeof urlOrOptions === "object" ? urlOrOptions.onOpen : null;
  const onClose = typeof urlOrOptions === "object" ? urlOrOptions.onClose : null;

  if (ws?.readyState === WebSocket.OPEN) {
    if (currentUrl === url) return;
    ws.close();
  }

  onOpenCallback = onOpen ?? null;
  onCloseCallback = onClose ?? null;
  currentUrl = url;
  autoReconnect = true;

  try {
    ws = new WebSocket(url);

    ws.onopen = () => {
      reconnectAttempts = 0;
      onOpenCallback?.();
    };

    ws.onmessage = (event: MessageEvent) => {
      try {
        const raw = typeof event.data === "string" ? event.data : String(event.data);
        messageHandler?.(raw, ws!);
      } catch (e) {
        console.error("WS message error", e);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error", err);
    };

    ws.onclose = () => {
      onCloseCallback?.();
      ws = null;
      if (autoReconnect && currentUrl) {
        const delay = Math.min(1000 * 2 ** reconnectAttempts, 30000);
        reconnectAttempts++;
        reconnectTimeout = setTimeout(() => {
          connect(currentUrl!);
        }, delay);
      }
    };
  } catch (e) {
    console.error("WebSocket connect error", e);
  }
}

function disconnect() {
  autoReconnect = false;
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = null;
  }
  reconnectAttempts = 0;
  if (ws) {
    ws.close();
    ws = null;
  }
  currentUrl = null;
}

function send(data: unknown) {
  if (ws?.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(data));
  }else {
    console.warn('WebSocket is not connected');
  }
}

function setMessageHandler(handler: MessageHandler | null) {
  messageHandler = handler;
}

function getConnection(): WebSocket | null {
  return ws;
}

function isOpen(): boolean {
  return ws?.readyState === WebSocket.OPEN || false;
}

export const wsClient = {
  connect,
  disconnect,
  send,
  setMessageHandler,
  getConnection,
  isOpen,
};
