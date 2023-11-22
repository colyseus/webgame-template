import { useState } from 'react';
import { Link } from 'react-router-dom';

function Play() {
  return (
    <>
      <Link className="p-2 border border-slate-500 hover:border-slate-400" to={"/play"}>
        Join or create game room
      </Link>

      <br />
      <br />
      This template includes <a href="https://tailwindcss.com/">Tailwind CSS</a> and <a href="https://vitejs.dev/">Vite</a>.
    </>
  )
}

export default Play
