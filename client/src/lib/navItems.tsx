import {
	LayoutDashboard,
	Wallet,
	ListTodo,
	PieChart,
	CircleDollarSign,
	PiggyBank,
	UserSquare2Icon,
} from "lucide-react";

export const navItems = [
	{
		id: 1,
		item: "Dashboard",
		to: "/dashboard",
		icon: <LayoutDashboard className="text-current" />,
	},
	{
		id: 2,
		item: "Accounts",
		to: "/accounts",
		icon: <Wallet className="text-current" />,
	},
	{
		id: 3,
		item: "Transactions",
		to: "/transactions",
		icon: <ListTodo className="text-current" />,
	},
	{
		id: 4,
		item: "Budgets",
		to: "/budgets",
		icon: <PieChart className="text-current" />,
	},
	{
		id: 5,
		item: "Bills",
		to: "/bills",
		icon: <CircleDollarSign className="text-current" />,
	},
	{
		id: 6,
		item: "Savings",
		to: "/savings",
		icon: <PiggyBank className="text-current" />,
	},
	{
		id: 7,
		item: "Profile",
		to: "/profile",
		icon: <UserSquare2Icon className="text-current" />,
	},
];
