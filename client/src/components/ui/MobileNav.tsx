import { NavLink } from "react-router-dom";
import { cn } from "../../lib/cn";
import { navItems } from "../../lib/navItems";

function MobileNav() {

	return (
		<nav className="flex p-3 justify-between fixed bottom-0 left-0 z-50 sm:hidden w-full bg-table-row-hover border-t border-t-card-default">
			{navItems.map((i) => (
				<NavLink
					key={i.id}
					to={i.to}
					aria-label={i.item}
					className={({ isActive }) =>
						cn(
							"px-3 py-2 flex items-center rounded-sm text-body-sm transition-colors",
							isActive
								? "bg-category-groceries text-toggle-on"
								: "text-text-secondary hover:bg-category-groceries hover:text-toggle-on",
						)
					}>
					{i.icon}
				</NavLink>
			))}
		</nav>
	);
}

export default MobileNav;
