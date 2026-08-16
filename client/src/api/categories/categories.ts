import { api } from "../../lib/api";

type CategoriesListResponse = {
	id: string;
	name: string;
	color: string;
}[];

export const getCategories = async (): Promise<CategoriesListResponse> => {
	const res = await api.get(`/categories`);

	return res.data.data.categories;
};
