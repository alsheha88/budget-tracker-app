import type { LoginData } from "../../schemas/authSchema";
import { api } from "../../lib/api";

export const login = async (data: LoginData) => {
	const res = await api.post("/auth/login", data);

    return res.data.data.token
};
