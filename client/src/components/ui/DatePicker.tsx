import { DayPicker } from "@daypicker/react";
import { useState } from "react";

function DatePicker() {
	const [selected, setSelected] = useState<Date>();

	return (
		<DayPicker
			mode="single"
			animate
			selected={selected}
			onSelect={setSelected}
			className="p-4 bg-table-row-hover border border-border-default rounded-md text-text-primary"
			classNames={{
				selected: "overflow-hidden rounded-full text-accent-foreground border border-border-focus",
				chevron: "stroke-accent-foreground fill-accent-foreground mb-4 h-4 w-4",
				today: "text-accent-default",
				week: "text-caption-sm",
				month_caption: "text-caption-lg mb-4",
                
			}}></DayPicker>
	);
}

export default DatePicker;
