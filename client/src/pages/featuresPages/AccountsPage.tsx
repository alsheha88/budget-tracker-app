// React hooks imports
import { useState } from "react";
// Components imports
import { Button } from "../../components/ui/Button";
import AccountForm from "../../components/forms/accountsForms/AccountForm";
import ErrorState from "../../components/state/ErrorState";
import LoadingState from "../../components/state/LoadingState";
import EmptyState from "../../components/state/EmptyState";
// Icons imports
import { Wallet } from "lucide-react";
// Custom hooks imports
import { useGetAccountStats } from "../../hooks/accounts/useAccounts";
// Types imports
import type { AccountStatsResponse } from "../../../../shared/types";
import AccountsStatsCard from "../../components/features/accounts/AccountsStatsCard";
import AccountCard from "../../components/features/accounts/AccountCard";

type AccountItem = AccountStatsResponse["accounts"][number];

function AccountsPage() {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [formType, setFormType] = useState<"Add" | "Edit">("Add");
	const [account, setAccount] = useState<AccountItem | null>(null);
	const { data: accounts, isError, isPending, refetch } = useGetAccountStats();
	if (isPending) return <LoadingState />;
	if (isError)
		return (
			<ErrorState
				title={"Something Went Wrong!"}
				message={"We couldn't load your accounts please try again"}
				onAction={refetch}
			/>
		);

	return (
		<div className="grid gap-7">
			<div className="flex flex-col md:flex-row sm:items-center justify-between gap-4">
				{" "}
				<div className="flex flex-col gap-1">
					<h2 className="text-h2 text-text-primary">Accounts</h2>
					<p className="text-caption-lg text-text-secondary">
						Manage and monitor your linked bank accounts and wallets.
					</p>
				</div>
				<div className="flex gap-2 shrink-0">
					<Button
						size="lg"
						type="button"
						onClick={() => {
							setIsFormOpen(true);
							setFormType("Add");
						}}>
						Add Account
					</Button>
				</div>
			</div>
			{accounts.accounts.length === 0 ? (
				<EmptyState
					icon={<Wallet />}
					title={"No Accounts Linked"}
					message={"You accounts will display here once you create them"}
					btnText="Create Account"
					onAction={() => {
						setIsFormOpen(true);
						setFormType("Add");
					}}
				/>
			) : (
				<>
					<div className="flex flex-col gap-3.5">
						<p className="text-button-md text-text-secondary">
							FINANCIAL SUMMARY
						</p>
						<AccountsStatsCard
							total={accounts.summary.total}
							assets={accounts.summary.totalAssets}
							liabilities={accounts.summary.totalLiabilities}
						/>
					</div>
					<div className="flex flex-col gap-3.5">
						<p className="text-button-md text-text-secondary">
							LINKED ACCOUNTS
						</p>
						<div className="grid md:grid-cols-2 grid-cols-1 gap-4">
							{accounts.accounts.map((i) => (
								<AccountCard
									key={i.id}
									account={i}
									onEdit={(acc) => {
										setAccount(acc);
										setFormType("Edit");
										setIsFormOpen(true);
									}}
								/>
							))}
						</div>
					</div>
				</>
			)}
			<AccountForm
				type={formType}
				isOpen={isFormOpen}
				setIsOpen={setIsFormOpen}
				account={account!}
			/>
		</div>
	);
}

export default AccountsPage;
