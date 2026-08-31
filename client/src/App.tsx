import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/authPages/LoginPage";
import SignupPage from "./pages/authPages/SignupPage";
import { PublicOnlyRoute } from "./routes/PublicRoute";
import ProtectedLayout from "./components/ProtectedLayout";
import DashboardPage from "./pages/featuresPages/DashboardPage";
import { Suspense } from "react";
import TransactionsPage from "./pages/featuresPages/TransactionsPage";
import AccountsPage from "./pages/featuresPages/AccountsPage";
import BudgetsPage from "./pages/featuresPages/BudgetsPage";
import SavingsPage from "./pages/featuresPages/SavingsPage";
import BillsPage from "./pages/featuresPages/BillsPage";

function App() {
	return (
		<Routes>
			<Route
				path="/login"
				element={
					<PublicOnlyRoute>
						<LoginPage />
					</PublicOnlyRoute>
				}
			/>
			<Route
				path="/signup"
				element={
					<PublicOnlyRoute>
						<SignupPage />
					</PublicOnlyRoute>
				}
			/>
			<Route element={<ProtectedLayout />}>
				<Route path="/dashboard" element={<DashboardPage />} />
				<Route path="/transactions" element={<TransactionsPage />} />
				<Route path="/accounts" element={<AccountsPage />} />
				<Route path="/budgets" element={<BudgetsPage />} />
				<Route path="/savings" element={<SavingsPage />} />
				<Route path="/bills" element={<BillsPage />} />
			</Route>
		</Routes>
	);
}

export default App;
