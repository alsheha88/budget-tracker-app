import { Button } from "../components/ui/Button";
import { type SubmitHandler, useForm } from "react-hook-form";
import { loginSchema, type LoginData } from "../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/auth/useAuth";

function LoginPage() {
	const { mutate, isError, isPending, error } = useLogin();
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
		<form
			className="grid gap-4 px-10 py-5 border border-border-default bg-card-default rounded-sm"
			onSubmit={handleSubmit(onSubmit)}>
			<label className="flex flex-col gap-2 w-full text-label-lg text-text-primary">
				Email
				<input
					type="text"
					className="border-border-default px-2 py-2 bg-input-background rounded-sm"
					{...register("email")}
				/>
			</label>
			{errors.email && <small>{errors.email.message}</small>}
			<label className="flex flex-col gap-2 w-full text-label-lg text-text-primary">
				Password
				<input
					type="password"
					className="border-border-default px-2 py-2 bg-input-background rounded-sm"
					{...register("passwordHash")}
				/>
			</label>
			{errors.passwordHash && <small>{errors.passwordHash.message}</small>}
			<Button variant="primary" type="submit" disabled={isPending}>
				Login
			</Button>
		</form>
	);
}

export default LoginPage;
