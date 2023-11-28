import { MouseEvent } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

function Profile() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	if (!user) {
		return <Navigate to="/sign-in" />;
	}

	const onLogoutClick = (e: MouseEvent) => {
		logout();
		navigate("/");
	}

	return (
		<>
			Name: {user?.name} <br />
			Email: {user?.email} <br />
			Locale: {user?.locale} <br />

			<button onClick={onLogoutClick} className="mt-4 p-2 border rounded border-slate-500 hover:border-slate-400">Logout</button>
		</>
	)
}

export default Profile
