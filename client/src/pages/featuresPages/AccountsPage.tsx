// React hooks imports
import { useState } from "react";
// Components imports
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import AccountForm from "../../components/forms/accountsForms/AccountForm";
import ErrorState from "../../components/state/ErrorState";
import LoadingState from "../../components/state/LoadingState";
import EmptyState from "../../components/state/EmptyState";
// Icons imports
import { ArrowDownLeftIcon, Edit2, PiggyBank, Wallet } from "lucide-react";
// Custom hooks imports
import { useGetAccountStats } from "../../hooks/accounts/useAccounts";
// Helpers imports
import {
	capitalizeFirstLetter,
	formatDateShort,
	formatKWD,
} from "../../lib/utils";
// Types imports
import type { AccountStatsResponse } from "../../../../shared/types";

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

	const accountType = {
		cash: "#22c55e",
		checking: "#eab308",
		savings: "#3b82f6",
		credit: "#ef4444",
		investment: "#06b6d4",
		loan: "#f97316",
	};

	return (
		<div className="grid gap-7">
			<div className="flex items-center justify-between">
				<div className="flex flex-col gap-1">
					<h2 className="text-h2 text-text-primary">Accounts</h2>
					<p className="text-caption-lg text-text-secondary">
						Manage and monitor your linked bank accounts and wallets.
					</p>
				</div>
				<div className="flex items-center gap-2">
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
						<div className="grid grid-cols-3 gap-4">
							<Card className="flex flex-col gap-4">
								<div className="flex items-center justify-between">
									<p className="text-text-secondary text-caption-lg">
										Total Balance
									</p>
									<div className="p-1 rounded-sm bg-category-groceries">
										<Wallet className="stroke-interactive-primary" />
									</div>
								</div>
								<h2 className="text-h3 text-text-primary">
									{formatKWD(accounts.summary.total)}
								</h2>
							</Card>
							<Card className="flex flex-col gap-4">
								<div className="flex items-center justify-between">
									<p className="text-text-secondary text-caption-lg">
										Total Assets
									</p>
									<div className="p-1 rounded-sm bg-category-groceries">
										<PiggyBank className="stroke-interactive-primary" />
									</div>
								</div>
								<h2 className="text-h3 text-text-primary">
									{formatKWD(accounts.summary.totalAssets)}
								</h2>
							</Card>
							<Card className="flex flex-col gap-4">
								<div className="flex items-center justify-between">
									<p className="text-text-secondary text-caption-lg">
										Total Liabilities
									</p>
									<div className="p-1 rounded-sm bg-category-dining">
										<ArrowDownLeftIcon className="stroke-interactive-destructive" />
									</div>
								</div>
								<h2 className="text-h3 text-text-primary">
									{formatKWD(accounts.summary.totalLiabilities)}
								</h2>
							</Card>
						</div>
					</div>
					<div className="flex flex-col gap-3.5">
						<p className="text-button-md text-text-secondary">
							LINKED ACCOUNTS
						</p>
						<div className="grid sm:grid-cols-3 grid-cols-2 gap-4">
							{accounts.accounts.map((i) => (
								<Card className="flex flex-col gap-4 flex-1" key={i.id}>
									<div className="flex flex-col gap-2">
										<div className="flex items-center justify-between">
											<p className="text-button-lg text-text-primary">
												{i.name}
											</p>
											<div className="flex items-center gap-3">
												<button
													className="text-text-secondary hover:text-text-tertiary cursor-pointer"
													type="button"
													onClick={() => {
														setIsFormOpen(true);
														setAccount(i);
														setFormType("Edit");
													}}>
													<Edit2 size={16} />
												</button>
											</div>
										</div>
										<Badge
											name={capitalizeFirstLetter(i.accountType)}
											color={accountType[i.accountType]}
										/>
									</div>
									<div className="flex flex-col gap-1.5">
										<p className="text-button-lg text-text-primary">
											{formatKWD(i.balance)}
										</p>
										<p className="text-caption-sm text-text-secondary">
											Last transaction:
											{formatDateShort(i.updatedAt.toString())}
										</p>
									</div>
								</Card>
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
