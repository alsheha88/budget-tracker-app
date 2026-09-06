import { useMutation, useQuery } from "@tanstack/react-query";
import { login, logout, signup } from "../../api/auth/authApi";
import { useNavigate } from "react-router-dom";
import { clearAuthToken, setAuthToken } from "../../lib/api";
import { getUser } from "../../api/user/userApi";

export const useLogin = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: login,
		onSuccess: (token) => {
			setAuthToken(token);
			navigate("/dashboard");
		},
		onError: (e) => {
		},
	});
};
export const useSignup = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: signup,
		onSuccess: () => {
			navigate("/verify-email");
		},
		onError: (e) => {
		},
	});
};

export const useLogout = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: logout,
		onSuccess: () => {
			clearAuthToken();
			navigate("/login");
		},
		onError: (e) => {
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
