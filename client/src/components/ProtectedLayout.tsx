import Sidebar from "../components/ui/Sidebar";
import ProtectedRoute from "../routes/ProtectedRoute";
import { Outlet } from "react-router-dom";
import MobileNav from "./ui/MobileNav";

const ProtectedLayout = () => {
	return (
		<ProtectedRoute>
			<div className="flex min-h-dvh">
				<Sidebar />
				<MobileNav />
				<main className="flex-1 px-6 pt-6 pb-20 ">
					<Outlet />
				</main>
			</div>
		</ProtectedRoute>
	);
};

export default ProtectedLayout;
