import React, { FC } from "react";
import TransactionForm from "../components/TransactionForm";
import { instance } from "../api/axios.api";
import {
	ICategory,
	IResponceTransactionLoader,
	ITransaction,
} from "../types/types";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import TransactionTable from "../components/TransactionTable";
import Chart from "../components/Chart";
export const transactionLoader = async () => {
	const categories = await instance.get<ICategory[]>("/categories");
	const transactions = await instance.get<ITransaction>("/transactions");
	const totalIncome = await instance.get<number>("/transactions/income/find");
	const totalExpence = await instance.get<number>("/transactions/expence/find");
	const data = {
		categories: categories.data,
		transactions: transactions.data,
		totalIncome: totalIncome.data,
		totalExpence: totalExpence.data,
	};
	return data;
};
export const transactionAction = async ({ request }: any) => {
	switch (request.method) {
		case "POST": {
			const formData = await request.formData();
			const newTransaction = {
				title: formData.get("title"),
				amount: +formData.get("amount"),
				category: formData.get("category"),
				type: formData.get("type"),
			};
			await instance.post("/transactions", newTransaction);
			toast.success("trancastion added");
			return null;
		}
		case "DELETE": {
			const formData = await request.formData();
			const id = formData.get("id");
			console.log(id);
			await instance.delete(`transactions/transaction/${id}`);
			toast.success("transaction deleted");
			return null;
		}
	}
};
const Transactions: FC = () => {
	const { totalExpence, totalIncome } =
		useLoaderData() as IResponceTransactionLoader;
	return (
		<>
			<div className=" grid grid-cols-3 gap-4 mt-4 items-start">
				{/* Add transaction form */}

				<div className="grid col-span-2 ">
					<TransactionForm />
				</div>
				{/* Statistics */}
				<div className="rounded-md bg-slate-800 p-3">
					<div className="grid grid-cols-2 gap-3">
						<div>
							<p className="text-md text-center font-bold uppercase">
								Total income:
							</p>
							<p className="mt-2 rounded-sm bg-green-600 p-1 text-center">
								{totalIncome}
							</p>
						</div>
						<div>
							<p className="text-md text-center font-bold uppercase">
								Total expence:
							</p>
							<p className="mt-2 rounded-sm bg-red-600 p-1 text-center">
								{totalExpence}
							</p>
						</div>
					</div>
					<Chart totalExpence={totalExpence} totalIncome={totalIncome} />
				</div>
			</div>
			<TransactionTable limit={3} />
		</>
	);
};

export default Transactions;
