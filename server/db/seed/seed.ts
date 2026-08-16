import { prisma } from "../../lib/prisma.js";
import seed from "../data/data.json" with { type: "json" };

type Category = {
	name: string;
	color: string;
};

export const main = async () => {
	const data = seed.categories as Category[];
	await prisma.category.deleteMany();
	const categories = await prisma.category.createMany({ data });

	const TEST_USER_ID = "94ebc7fb-a3e7-455d-ba09-a336eca41ad8";

	await prisma.account.create({
		data: {
			name: "Main Checking",
			accountType: "checking",
			startingBalance: 1000.0,
			userId: TEST_USER_ID,
		},
	});

	console.log(`${categories.count} seeded successfully`);
};

try {
	await main();
} catch (e) {
	console.error({ err: e }, "Seed failed");
	process.exit(1);
} finally {
	await prisma.$disconnect();
}
