import './index.css'

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";

import { AuthProvider } from './contexts/AuthContext.tsx';
import MainLayout from './layouts/MainLayout.tsx';
import Play from './pages/Play.tsx'
import Leaderboard from './pages/Leaderboard.tsx';
import Settings from './pages/Settings.tsx';
import Page1 from './pages/Page1.tsx';
import Credits from './pages/Credits.tsx';
import Game from './game/Game.tsx';
import SignIn from './pages/auth/SignIn.tsx';
import CreateAccount from './pages/auth/CreateAccount.tsx';
import Profile from './pages/auth/Profile.tsx';

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
      { path: "/profile", element: <Profile /> },

      { path: "/sign-in", element: <SignIn /> },
      { path: "/create-account", element: <CreateAccount /> },
    ]
  },

]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);