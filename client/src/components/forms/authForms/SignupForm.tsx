import { zodResolver } from "@hookform/resolvers/zod";
import { getApiErrorMessage } from "../../../lib/api";
import { createUserSchema, type SignUpData } from "../../../schemas/authSchema";
import { Button } from "../../ui/Button";
import Input from "../../ui/Input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSignup } from "../../../hooks/auth/useAuth";

function SignupForm() {
    const {mutate, error, isPending} = useSignup()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpData>({
		resolver: zodResolver(createUserSchema),
		defaultValues: {
			fullName: "",
			email: "",
			passwordHash: "",
			phoneNumber: "",
		},
	});
    const onSubmit:SubmitHandler<SignUpData> = (data) => mutate(data)
	return (
		<form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
			<div className="grid gap-4">
				<Input
					type={"text"}
					id={"fullName"}
					label="Full Name"
					error={errors.fullName?.message}
					{...register("fullName")}
				/>
				<Input
					type={"text"}
					id={"email"}
					label="Email"
					error={errors.email?.message}
					{...register("email")}
				/>
				<Input
					type={"text"}
					id={"phoneNumber"}
					label="Phone Number"
					error={errors.phoneNumber?.message}
					{...register("phoneNumber")}
				/>
				<Input
					type={"password"}
					id={"password"}
					label="Password"
					error={errors.passwordHash?.message}
					{...register("passwordHash")}
				/>
				<Input
					type={"password"}
					id={"confirmPassword"}
					label="Confirm Password"
					error={errors.passwordHash?.message}
					{...register("confirmPassword")}
				/>
			</div>
			<Button disabled={isPending}>Sign Up</Button>
			{error && (
				<small className="text-feedback-error text-body-sm">
					{getApiErrorMessage(error)}
				</small>
			)}
		</form>
	);
}

export default SignupForm;
