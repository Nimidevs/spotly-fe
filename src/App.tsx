import routes from "./routes";
import { RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";
import { WebSocketProvider } from "./ws/WebSocketContext";

function App() {
  return (
    <>
      <WebSocketProvider>
        <RouterProvider router={routes} />
      </WebSocketProvider>
      <Toaster />
    </>
  );
}

export default App;
