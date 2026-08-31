import Input from "../../ui/Input";
import { Button } from "../../ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLogin } from "../../../hooks/auth/useAuth";
import { type LoginData, loginSchema } from "../../../schemas/authSchema";
import { getApiErrorMessage } from "../../../lib/api";

function LoginForm() {
	const { mutate, isPending, error } = useLogin();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<LoginData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			passwordHash: "",
		},
	});
	const onSubmit: SubmitHandler<LoginData> = (data) => mutate(data);
	return (
		<form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
			<div className="grid gap-4">
				<Input
					type={"text"}
					id={"email"}
					label="Email"
					error={errors.email?.message}
					{...register("email")}
				/>
				<Input
					type={"password"}
					id={"password"}
					label="Password"
					error={errors.passwordHash?.message}
					{...register("passwordHash")}
				/>
			</div>
			<Button disabled={isPending}>Sign In</Button>
			{error && (
				<small className="text-feedback-error text-body-sm">
					{getApiErrorMessage(error)}
				</small>
			)}
		</form>
	);
}

export default LoginForm;
