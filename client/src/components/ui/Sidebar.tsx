import NavItem from "./NavItem";
import {
	LayoutDashboard,
	Wallet,
	UserSquare2Icon,
	PieChart,
	PiggyBank,
	CircleDollarSign,
	ListTodo,
	BookOpen,
} from "lucide-react";

function Sidebar() {
	const navItems = [
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
	return (
		<div className="px-4 py-6 w-3xs min-h-dvh lg:flex flex-col gap-4 bg-table-row-hover/50 rounded-tr-md rounded-br-md hidden">
			<div className="flex items-center gap-3 mb-5">
				<div className="p-2 flex items-center justify-center rounded-xs bg-toggle-on/50">
					<BookOpen className="stroke-text-primary" />
				</div>
                <h2 className="text-h2 text-text-primary">Finance App</h2>
			</div>
			{navItems.map((i) => (
				<NavItem key={i.id} to={i.to} icon={i.icon} content={i.item} />
			))}
		</div>
	);
}

export default Sidebar;
