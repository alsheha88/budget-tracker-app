import { Navigate } from "react-router-dom";
import { useGetUser } from "../hooks/auth/useAuth";
import { ThreeCircles } from "react-loader-spinner";
import { getApiErrorMessage } from "../lib/api";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { isError, isLoading, error } = useGetUser();

	if (isLoading)
		return (
			<div className="flex items-center justify-center min-h-screen">
				<ThreeCircles color="#10b77f" />
			</div>
		);

	if (isError) return <Navigate to={"/login"} replace />;

	return children;
}

export default ProtectedRoute;