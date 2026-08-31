import * as Slider from "radix-ui/slider";
import { useId } from "react";

type SliderProps = {
	label: string;
	value: number[];
	onValueChange: (value: number[]) => void;
};
function SliderComponent({ label, onValueChange, value }: SliderProps) {
	const labelId = useId();

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center justify-between">
				<label className="text-text-secondary text-body-sm" htmlFor={labelId}>
					{label}
				</label>
                <p className="text-caption-sm text-toggle-on">{value[0]}%</p>
			</div>
			<Slider.Root
				className="relative flex items-center w-full h-5"
				max={100}
				min={0}
				step={1}
				onValueChange={onValueChange}
				value={value}>
				<Slider.Track className="bg-accent-default relative h-1.5 w-full rounded-full grow">
					<Slider.Range className="bg-toggle-on absolute h-full rounded-full" />
				</Slider.Track>
				<Slider.Thumb className="block w-4 h-4 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-border-focus" />
			</Slider.Root>
		</div>
	);
}

export default SliderComponent;
