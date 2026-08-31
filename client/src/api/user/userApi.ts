import { api } from "../../lib/api";

type UserResponse = {
	id: string;
	email: string;
	fullName: string;
	phoneNumber: string;
	createdAt: Date;
	updatedAt: Date;
	isVerified: boolean;
	avatar: string | null;
	timeZone: string | null;
};

export const getUser = async ():Promise<UserResponse> => {
	const res = await api.get("/auth/user/me");

	return res.data.data.user;
};
