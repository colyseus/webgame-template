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

			<button onClick={onLogoutClick} className="mt-4">Logout</button>
		</>
	)
}

export default Profile
