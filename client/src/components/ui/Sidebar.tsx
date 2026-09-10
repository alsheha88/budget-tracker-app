import { navItems } from "../../lib/navItems";
import NavItem from "./NavItem";
import { BookOpen } from "lucide-react";

function Sidebar() {
	return (
		<div className="px-4 py-6 w-3xs min-h-dvh sm:flex flex-col gap-4 bg-table-row-hover/50 rounded-tr-md rounded-br-md hidden">
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
