import locationUpdatesHandler from "./locationUpdatesHandler";
import { wsEventBus } from "../ws/wsEventBus";
import store from "../store/store";
import { setNearbyUser } from "../store/slices/wsDataSlice";

export const onMessageHandler = (payload: string, ws: WebSocket) => {
  const { event, data } = JSON.parse(payload) as { event: string; data: unknown };

  // Emit so any component subscribed via useWsEvent(event, callback) receives the data
  wsEventBus.emit(event, data);

  switch (event) {
    case "auth:success":
      locationUpdatesHandler(data, ws as WebSocket);
      break;
    case "nearby:users":
      console.log("nearby:users", data);
      store.dispatch(setNearbyUser(data));
      break;
    default:
      break;
  }
};