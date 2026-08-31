import type { LoginData, SignUpPayload } from "../../schemas/authSchema";
import { api } from "../../lib/api";

export const login = async (data: LoginData) => {
	const res = await api.post("/auth/login", data);

    return res.data.data.token
};
export const signup = async (data: SignUpPayload) => {
	const res = await api.post("/auth/signup", data);

    return res.data.data
};

export const logout = async () => {
    const res = await api.post("/logout");

    return res.data;
}
