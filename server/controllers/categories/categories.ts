import type { RequestHandler } from "express"
import { findCategories } from "../../db/functions/category/category.js"


export const getCategories:RequestHandler = async (req, res) => {
    const categories = await findCategories();
    res.status(200).json({data: {categories}})
}