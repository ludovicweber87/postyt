import PageError from "@postyt/pages/404";
import Home from "@postyt/pages/home";
import JoinRoom from "@postyt/pages/join-room";
import Room from "@postyt/pages/room";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/room/:roomName",
    element: <Room />,
  },
  {
    path: "/join-room",
    element: <JoinRoom />,
  },
  {
    path: "*",
    element: <PageError />,
  },
]);

export default router;
