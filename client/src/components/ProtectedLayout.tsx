import Sidebar  from "../components/ui/Sidebar";
import ProtectedRoute from "../routes/ProtectedRoute";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
	return (
		<ProtectedRoute>
			<div className="flex min-h-dvh">
				<Sidebar />
				<main className="flex-1 p-6">
					<Outlet />
				</main>
			</div>
		</ProtectedRoute>
	);
};

export default ProtectedLayout;
