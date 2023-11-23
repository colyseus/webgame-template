import { useState } from "react";
import { client } from "../../core/Networking";

function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  };

  const signInWithDiscord = async () => {
    try {
      setIsLoading(true);
      await client.auth.oauth("discord");

    } catch (e) {
      console.error(e);

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={(isLoading) ? "pointer-events-none opacity-50 transition-all cursor-wait" : ""}>
      <h2 className="text-xl mb-2">Email / Password:</h2>
      <form onSubmit={onSubmit} className="flex mb-8">
        <div className="flex gap-2">
          <input className="p-2 rounded" type="text" name="email" placeholder="Email" />
          <input className="p-2 rounded" type="password" name="password" placeholder="Password" />
          <button type="submit" className="p-2 rounded bg-slate-100 text-gray-800">Sign in</button>
        </div>
      </form>

      <h2 className="text-xl mb-2">OAuth: (Configure at <code>packages/backend/src/config/auth.ts</code>)</h2>
      <button onClick={signInWithDiscord}>Login with Discord</button>
    </div>
  )
}

export default SignIn
