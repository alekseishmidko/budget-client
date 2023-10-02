import React, { FC, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IResponceTransactionLoader, ITransaction } from "../types/types";
import { Form, useLoaderData } from "react-router-dom";
import { instance } from "../api/axios.api";
import ReactPaginate from "react-paginate";
interface ITransactionTable {
	limit: number;
}
const TransactionTable: FC<ITransactionTable> = ({ limit = 3 }) => {
	const { transactions } = useLoaderData() as IResponceTransactionLoader;
	const [data, setData] = useState<ITransaction>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPage] = useState<number>(0);

	const fetchTransactions = async (page: number) => {
		const res = await instance.get(
			`/transactions/pagination?page=${page}&limit=${limit}`,
		);
		console.log(res, "res");
		setData(res.data);
		setTotalPage(Math.ceil(transactions.length / limit));
	};
	const handlePageChange = (selectedItem: { selected: number }) => {
		console.log(selectedItem, "sel it");
		setCurrentPage(selectedItem.selected + 1);
	};
	console.log(currentPage, "currnt");
	useEffect(() => {
		fetchTransactions(currentPage);
	}, [transactions, currentPage]);
	return (
		<>
			<ReactPaginate
				className="flex gap-3 justify-end mt-4 items-center"
				activeClassName="bg-blue-600 rounded-md"
				pageLinkClassName="text-white text-xs py-1 px-2 rounded-md"
				previousClassName=" text-white py-1 px-2 bg-slate-800 rounded-md text-xs"
				nextClassName=" text-white py-1 px-2 bg-slate-800 rounded-sm text-xs"
				disabledClassName="text-white/50 cursor-not-allowed"
				disabledLinkClassName="cursor-not-allowed text-slate-600"
				pageCount={totalPages}
				pageRangeDisplayed={1}
				marginPagesDisplayed={1}
				onPageChange={handlePageChange}
			/>
			<div className="bg-slate-800 px-4 py-3 mt-4 rounded-md">
				<table className="w-full">
					<thead>
						<tr>
							<td className="font-bold"> №</td>
							<td className="font-bold"> Title</td>
							<td className="font-bold"> Amount $</td>
							<td className="font-bold"> Categories</td>
							<td className="font-bold"> Date</td>
							<td className="text-right">Action</td>
						</tr>
					</thead>
					<tbody>
						{data?.map((item, index) => (
							<tr key={index}>
								<td className="">{index + 1}</td>
								<td className="">{item.title}</td>
								<td
									className={
										item.type === "income" ? "text-green-500" : "text-red-300"
									}
								>
									<span className="font-semibold">
										{item.type === "income" ? "+" : "-"}
										{item.amount}
									</span>
								</td>
								<td className="">{item.category?.title || "Other"}</td>
								<td className="">{item.createdAt.slice(0, -14)}</td>
								<td className="">
									<Form method="delete" action="/transactions">
										<input type="hidden" name="id" value={item.id} />
										<button className="btn hover:btn-red ml-auto">
											<FaTrash />
										</button>
									</Form>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default TransactionTable;
