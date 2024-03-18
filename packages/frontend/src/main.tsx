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
import DiscordActivity from './game/DiscordActivity.tsx';

// function RequireAuth({ children }: { children: JSX.Element }) {
//   let auth = useAuth();
//   let location = useLocation();

//   if (!auth.user) {
//     // Redirect them to the /sign-in page, but save the current location they were
//     // trying to go to when they were redirected. This allows us to send them
//     // along to that page after they login, which is a nicer user experience
//     // than dropping them off on the home page.
//     return <Navigate to="/sign-in" state={{ from: location }} replace />;
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
      { path: "/profile", element: <Profile /> },

      { path: "/sign-in", element: <SignIn /> },
      { path: "/create-account", element: <CreateAccount /> },

      { path: "/discord-activity", element: <DiscordActivity /> },

      // { path: "/profile", element: <Profile /> },
      // { path: "/logout", element: <Logout /> },
      // { path: "/games/create", element: <Play /> },
    ]
  },

]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);