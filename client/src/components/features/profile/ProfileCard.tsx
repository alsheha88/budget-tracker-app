import { useGetUser, useLogout } from "../../../hooks/auth/useAuth";
import { getInitials } from "../../../lib/utils";
import ErrorState from "../../state/ErrorState";
import LoadingState from "../../state/LoadingState";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import Input from "../../ui/Input";

function ProfileCard() {
	const { data, isError, isPending, refetch } = useGetUser();
	const { mutate: logout, isPending: pendingLogout } = useLogout();

	if (isPending) return <LoadingState />;
	if (isError)
		return (
			<ErrorState
				title={"Something Went Wrong!"}
				message={"We could't load your data"}
				onAction={refetch}
			/>
		);
	return (
		<Card className="flex flex-col gap-6">
			<span className="p-2 rounded-full bg-toggle-on text-text-primary text-h3 place-self-start">
				{getInitials(data.fullName)}
			</span>
			<hr className="text-border-default" />
			<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
				<Input type={"text"} label="Full Name" value={data.fullName} readOnly />
				<Input
					type={"text"}
					label="Email Address"
					value={data.email}
					readOnly
				/>
				<Input
					type={"text"}
					label="Phone Number"
					value={data.phoneNumber ?? ""}
					readOnly
				/>
				<Input
					type={"text"}
					label="Preferred Currency"
					value={"Kuwaiti Dinar - KWD"}
					readOnly
				/>
			</div>

			<Button
				variant="destructive"
				onClick={() => logout()}
				className="place-self-start"
				disabled={pendingLogout}>
				Logout
			</Button>
		</Card>
	);
}

export default ProfileCard;
