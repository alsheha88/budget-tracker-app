import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login, logout, signup } from "../../api/auth/authApi";
import { useNavigate } from "react-router-dom";
import {
	clearAuthToken,
	getApiErrorMessage,
	setAuthToken,
} from "../../lib/api";
import { getUser } from "../../api/user/userApi";
import toast from "react-hot-toast";

export const useLogin = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: login,
		onSuccess: (token) => {
			setAuthToken(token);
			navigate("/dashboard");
			toast.success("Welcome!");
		},
		onError: () => {
			toast.error("Something went wrong");
		},
	});
};
export const useSignup = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: signup,
		onSuccess: () => {
			navigate("/verify-email");
			toast.success("Sign up successfull, please verify your email");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};

export const useLogout = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: logout,
		onSuccess: () => {
			clearAuthToken();
			queryClient.clear();
			navigate("/login");
			toast.success("Logged out successfully");
		},
		onError: (error) => {
			toast.error(getApiErrorMessage(error));
		},
	});
};

export const useGetUser = () => {
	return useQuery({
		queryFn: getUser,
		queryKey: ["me"],
		retry: false,
		staleTime: Infinity,
	});
};
