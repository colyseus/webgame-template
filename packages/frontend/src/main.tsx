import './index.css'

import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import MainLayout from './layouts/MainLayout.tsx';
import Play from './pages/Play.tsx'
import Leaderboard from './pages/Leaderboard.tsx';
import Settings from './pages/Settings.tsx';
import Page1 from './pages/Page1.tsx';
import Credits from './pages/Credits.tsx';
import Game from './game/Game.tsx';

// function RequireAuth({ children }: { children: JSX.Element }) {
//   let auth = useAuth();
//   let location = useLocation();

//   if (!auth.user) {
//     // Redirect them to the /login page, but save the current location they were
//     // trying to go to when they were redirected. This allows us to send them
//     // along to that page after they login, which is a nicer user experience
//     // than dropping them off on the home page.
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// }


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Play /> },
      { path: "/page1", element: <Page1 /> },
      { path: "/settings", element: <Settings /> },
      { path: "/leaderboard", element: <Leaderboard /> },
      { path: "/credits", element: <Credits /> },
      { path: "/play", element: <Game /> },
      // { path: "/profile", element: <Profile /> },
      // { path: "/logout", element: <Logout /> },
      // { path: "/games/create", element: <Play /> },
    ]
  },

]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);