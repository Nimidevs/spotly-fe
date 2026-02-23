import { useEffect, useRef } from "react";
import { wsEventBus } from "./wsEventBus";

/**
 * Subscribe to a specific WebSocket event in a component.
 * The callback receives the event's `data` payload.
 * Unsubscribes on unmount. Safe to pass inline callbacks (no need for useCallback).
 */
export function useWsEvent<T = unknown>(
  event: string,
  callback: (data: T) => void
) {
  const cbRef = useRef(callback);
  cbRef.current = callback;
  

  useEffect(() => {
    const unsubscribe = wsEventBus.subscribe(event, (data: unknown) => {
      cbRef.current(data as T);
    });
    return unsubscribe;
  }, [event]);
}
