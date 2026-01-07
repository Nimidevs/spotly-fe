import routes from "./routes";
import { RouterProvider } from "react-router";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster />
    </>
  );
}

export default App;
