import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Network from "../../core/Network";
import { Navigate } from "react-router-dom";

function CreateAccount() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // navigate to root ("/") once authenticated.
  if (user) {
    return <Navigate to="/" />;
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;
    try {
      setIsLoading(true);
      await Network.client.auth.registerWithEmailAndPassword(email, password, {
        locale: "br",
        birthdate: new Date(),
        custom_data: [1,2,3,4],
      });

    } catch (e: any) {
      setError(`${e.name} - ${e.message}`);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={(isLoading) ? "pointer-events-none opacity-50 transition-all cursor-wait" : ""}>
      <h2 className="text-xl mb-2">Create account</h2>
      <form onSubmit={onSubmit} className="flex mb-8">
        <div className="flex gap-2">
          <input className="p-2 rounded text-slate-800" type="text" name="email" placeholder="Email" />
          <input className="p-2 rounded text-slate-800" type="password" name="password" placeholder="Password" />
          <button type="submit" className="p-2 border rounded border-slate-500 hover:border-slate-400">Create account</button>
          {/* Error message */}
          { (error) && <p className="text-red-500">{error}</p> }
        </div>
      </form>

    </div>
  )
}

export default CreateAccount
