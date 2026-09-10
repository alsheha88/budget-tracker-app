import { NavLink } from "react-router-dom";
import SignupForm from "../../components/forms/authForms/SignupForm";

function SignupPage() {
	return (
		<div className="min-h-dvh flex items-center justify-center">
			<div className="min-w-[320px] max-w-[95%] grid gap-6 bg-bg-dark p-10 rounded-lg border border-interactive-secondary-active">
				<h3 className="text-text-link text-h3">Sign Up</h3>
				<SignupForm />
				<p className="text-caption-lg text-text-tertiary">
					Have an account?
					<NavLink to={"/login"} className={"text-toggle-on"}>
						Log in
					</NavLink>
				</p>
			</div>
		</div>
	);
}

export default SignupPage;
