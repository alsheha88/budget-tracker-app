import { ThreeCircles } from "react-loader-spinner";
import { useGetUser } from "../hooks/auth/useAuth";
import { Navigate } from "react-router-dom";

export function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
	const { data, isLoading } = useGetUser();

	if (isLoading)
		return (
			<div className="flex items-center justify-center min-h-screen">
				<ThreeCircles color="#10b77f" />
			</div>
		);

	if (data) return <Navigate to="/dashboard" replace />;

	return children;
}
