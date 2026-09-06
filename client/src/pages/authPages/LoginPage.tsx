import LoginForm from "../../components/forms/authForms/LoginForm";
import { NavLink } from "react-router-dom";

function LoginPage() {
	return (
		<div className="min-h-dvh flex items-center justify-center">
			<div className="min-w-[320px] max-w-[95%] grid gap-6 bg-bg-dark p-10 rounded-lg border border-interactive-secondary-active">
				<h3 className="text-text-link text-h3">Sign In</h3>
				<LoginForm />
				<p className="text-caption-lg text-text-tertiary">
					Don't have an account?
					<NavLink to={"/signup"} className={"text-toggle-on"}>
						Create account
					</NavLink>
				</p>
			</div>
		</div>
	);
}

export default LoginPage;
