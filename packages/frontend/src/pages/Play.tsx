import { useState } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../core/Networking';

function Play() {
  const [profileResponse, setProfileResponse] = useState<any>(null);

  const onClickRequestProtectedRoute = async () => {
    try {
      const response = await client.http.get("/protected");
      setProfileResponse(response.data);
    } catch (e: any) {
      setProfileResponse({ error: e.message });
    }
  };

  return (
    <>
      <h2 className="mb-4 text-2xl font-semibold">Join game room</h2>
      <div className="mb-6  gap-4">
        <div className="flex gap-4">
          <Link className="p-2 border rounded border-slate-500 hover:border-slate-400" to={"/play"}>
            Join or create <code>"my_room"</code>
          </Link>
        </div>
        <div className="mt-4">
          <button onClick={onClickRequestProtectedRoute} className="p-2 border rounded border-slate-500 hover:border-slate-400">
            Request <code>/protected</code> backend route
          </button>

          {profileResponse && (
            <pre className="text-xs text-slate-400 mt-4">{JSON.stringify(profileResponse, null, 2)}</pre>
          )}

        </div>
      </div>

      <hr className="my-8 border-slate-600" />

      <h2 className="mb-2 text-2xl font-semibold">Colyseus Webgame Template</h2>
      <ul className="ml-6 list-disc mb-6">
        <li>
          Backend:
          <ul className="ml-6 list-disc mb-6">
            <li><code className="text-purple-400">colyseus</code> → Multiplayer Framework </li>
            <li><code className="text-purple-400">@colyseus/auth</code> → Authentication (Email/Password, OAuth, Anonymous)</li>
            <li><code className="text-purple-400">@colyseus/database</code> → Experimental Kysely-powered database module</li>
          </ul>
        </li>
        <li>
          Frontend:
          <ul className="ml-6 list-disc mb-6">
            <li><code className="text-orange-400">react</code> → UI library</li>
            <li><code className="text-orange-400">react-router-dom</code> → Navigation</li>
            <li><code className="text-orange-400">tailwindcss</code> → CSS Framework</li>
            <li><code className="text-orange-400">vite</code> → Build tool</li>
          </ul>
        </li>
      </ul>


    </>
  )
}

export default Play
