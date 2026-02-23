/**
 * Small pub-sub so components can subscribe to specific WS events.
 * onMessageHandler emits here; components use useWsEvent(event, callback).
 */

type Listener = (data: unknown) => void;
const listeners: Map<string, Set<Listener>> = new Map();

function getListeners(event: string): Set<Listener> {
  let set = listeners.get(event);
  if (!set) {
    set = new Set();
    listeners.set(event, set);
  }
  return set;
}

export const wsEventBus = {
  emit(event: string, data: unknown) {
    getListeners(event).forEach((fn) => {
      try {
        fn(data);
      } catch (e) {
        console.error(`[wsEventBus] listener error for "${event}"`, e);
      }
    });
  },

  subscribe(event: string, listener: Listener): () => void {
    const set = getListeners(event);
    set.add(listener);
    return () => {
      set.delete(listener);
      if (set.size === 0) listeners.delete(event);
    };
  },
};
