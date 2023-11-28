import { useState } from 'react';
import { Link } from 'react-router-dom';

function Play() {
  return (
    <>
      <h2 className="mb-4 text-2xl font-semibold">Join game room</h2>
      <p className="mb-6">
        <div className="flex gap-4">
          <Link className="p-2 border rounded border-slate-500 hover:border-slate-400" to={"/play"}>
            Join or create game room
          </Link>

          <Link className="p-2 border rounded border-slate-500 hover:border-slate-400" to={"/play"}>
            (Require auth) Join or create game room
          </Link>
        </div>
      </p>

      <hr className="my-8 border-slate-600" />

      <h2 className="mb-2 text-2xl font-semibold">Colyseus Webgame Template</h2>
      <ul className="ml-6 list-disc mb-6">
        <li>
          Backend:
          <ul className="ml-6 list-disc mb-6">
            <li><code>colyseus</code> → Room </li>
            <li><code>@colyseus/auth</code> → Authentication (Email/Password, Discord, Google)</li>
            <li><code>@colyseus/database</code> → A Kysely-powered database module</li>
          </ul>
        </li>
        <li>
          Frontend:
          <ul className="ml-6 list-disc mb-6">
            <li><code>react</code> + <code>react-router-dom</code></li>
            <li><code>vite</code> → Build tool</li>
            <li><code>tailwindcss</code> → CSS Framework</li>
          </ul>
        </li>
      </ul>


    </>
  )
}

export default Play
