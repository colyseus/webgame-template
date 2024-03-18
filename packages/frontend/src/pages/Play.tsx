import { useState } from 'react';
import { Link } from 'react-router-dom';
import Networking from '../core/Networking';

function Play() {
  const [profileResponse, setProfileResponse] = useState<any>(null);
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  const onClickRequestProtectedRoute = async () => {
    setIsRequestLoading(true);
    try {
      const response = await Networking.client.http.get("/api/protected");
      setProfileResponse(response.data);
    } catch (e: any) {
      setProfileResponse({ error: e.message });
    } finally {
      setIsRequestLoading(false);
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
          <button onClick={onClickRequestProtectedRoute} className="p-2 border rounded border-slate-500 hover:border-slate-400" disabled={isRequestLoading}>
            Request <code>/api/protected</code> backend route
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

      <hr className="my-8 border-slate-600" />
      <p>View <a href="https://github.com/colyseus/webgame-template" className="underline text-gray-300 hover:text-gray-200" target="_blank">source-code</a> on GitHub.</p>

    </>
  )
}

export default Play
