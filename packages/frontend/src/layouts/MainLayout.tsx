import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import templateLogo from '/template-logo.png';
import { useAuth } from '../contexts/AuthContext';

const getNavLinkClassName = ({ isActive, isPending }: { isActive: boolean, isPending: boolean }) => {
  const className = "flex items-center justify-center flex-grow hover:bg-gray-700 transition-colors duration-100 w-full border-b border-gray-700";
  return (isActive)
    ? className + " bg-gray-800 hover:bg-gray-800 transition-colors duration-100 w-full border-b border-gray-700"
    : className;
};

function MainLayout() {
  const { user, isLoading } = useAuth();

  return (
    <div className={`text-slate-200 h-screen flex flex-col ${(isLoading) ? "cursor-wait" : ""}` }>
      <header className="w-full text-center flex">
        <div className="flex-grow">
          <Link to={'/'}><img src={templateLogo} className="logo h-24 m-auto p-4" alt="Logo" /></Link>

        </div>

        <div className="p-8">
          {(user)
            ? <Link to={'/profile'}>user.email</Link>
            : <>
                <Link to={'/sign-in'}>Sign in</Link> | <Link to={'/create-account'}>Create account</Link>
              </>}
        </div>
      </header>

      <main className="flex flex-grow">
        <div className="flex w-48 border-t border-gray-700">
          <nav className="flex flex-col h-full flex-grow justify-between items-center">
            <NavLink className={getNavLinkClassName} to={'/page1'}>Page 1</NavLink>
            <NavLink className={getNavLinkClassName} to={'/leaderboard'}>Leaderboard</NavLink>
            <NavLink className={getNavLinkClassName} to={'/'}>Play</NavLink>
            <NavLink className={getNavLinkClassName} to={'/settings'}>Settings</NavLink>
            <NavLink className={getNavLinkClassName} to={'/credits'}>Credits</NavLink>
          </nav>
        </div>

        <section className="flex-grow bg-gray-800 p-8 w-full">
          <Outlet />
        </section>
      </main>
    </div>
  )
}

export default MainLayout