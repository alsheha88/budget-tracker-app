import { useState } from "react";
import { Button } from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useGetAccountStats } from "../../hooks/accounts/useAccounts";
import { Card } from "../../components/ui/Card";
import { ArrowDownLeftIcon, Edit2, PiggyBank, Wallet } from "lucide-react";
import { capitalizeFirstLetter, formatDateShort } from "../../lib/utils";
import Badge from "../../components/ui/Badge";
import AccountForm from "../../components/forms/accountsForms/AccountForm";
import type { AccountStatsResponse } from "../../../../shared/types";

type AccountItem = AccountStatsResponse["accounts"][number];

function AccountsPage() {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [formType, setFormType] = useState<"Add" | "Edit">("Add");
	const [account, setAccount] = useState<AccountItem | null>(null);
	const [searchInput, setSearchInput] = useState("");
	const { data: accounts, isError, isPending } = useGetAccountStats();

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
					<Input
						type={"text"}
						placeholder="Search accounts, banks..."
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
					/>
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
			<div className="flex flex-col gap-3.5">
				<p className="text-button-md text-text-secondary">FINANCIAL SUMMARY</p>
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
						<h2 className="text-h2 text-text-primary">
							{accounts?.summary.total.toFixed(1)} KWD
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
						<h2 className="text-h2 text-text-primary">
							{accounts?.summary.totalAssets.toFixed(1)} KWD
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
						<h2 className="text-h2 text-text-primary">
							{accounts?.summary.totalLiabilities.toFixed(1)} KWD
						</h2>
					</Card>
				</div>
			</div>
			<div className="flex flex-col gap-3.5">
				<p className="text-button-md text-text-secondary">LINKED ACCOUNTS</p>
				<div className="grid sm:grid-cols-4 grid-cols-2 gap-4">
					{accounts?.accounts.map((i) => (
						<Card className="flex flex-col gap-4 flex-1" key={i.id}>
							<div className="flex flex-col gap-2">
								<div className="flex items-center justify-between">
									<p className="text-button-lg text-text-primary">{i.name}</p>
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
									{i.balance.toFixed(1)} KWD
								</p>
								<p className="text-caption-sm text-text-secondary">
									Last transaction: {formatDateShort(i.updatedAt.toString())}
								</p>
							</div>
						</Card>
					))}
				</div>
			</div>
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
