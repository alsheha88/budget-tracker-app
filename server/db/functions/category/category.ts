import { prisma } from "../../../lib/prisma.js"


export const findCategories = async () => {
    return await prisma.category.findMany()
}