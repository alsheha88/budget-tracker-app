import DatePicker from "./components/ui/DatePicker";
import PopoverComponent from "./components/ui/Popover";
import ProgressBar from "./components/ui/ProgressBar";
import SelectComponent from "./components/ui/Select";
import { useGetCategories } from "./hooks/categories/useCategories";

function App() {
	const { data } = useGetCategories();
	const options = [
		{ label: "Capital Growth (Aggressive)", value: "capital" },
		{ label: "Balanced Yield (Moderate)", value: "yield" },
		{ label: "Fixed Income (Conservative)", value: "fixed" },
	];

	return (
		<div className="bg-bg-primary min-h-dvh grid place-items-center">
			{/* <SelectComponent label={"Pick a value"} options={options} placeholder={"Pick a value"} /> */}
			{/* <PopoverComponent /> */}
			<div className="w-80">
				<ProgressBar progress={20} color={"hsla(0, 84%, 60%, 1)"} />
			</div>
		</div>
	);
}

export default App;
