import { NavLink } from "react-router-dom";
import { cn } from "../../lib/cn";

type NavItemProp = {
	to: string;
	icon: React.ReactNode;
	content: string;
};

function NavItem({ to, icon, content }: NavItemProp) {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				cn(
					"px-3 py-2.5 flex items-center gap-3 rounded-sm text-body-sm transition-colors",
					isActive
						? "bg-category-groceries text-toggle-on"
						: "text-text-secondary hover:bg-category-groceries hover:text-toggle-on",
				)
			}>
			{icon}
			{content}
		</NavLink>
	);
}

export default NavItem;
