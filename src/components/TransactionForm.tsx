import React, { FC, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import { IResponceTransactionLoader } from "../types/types";
import CategoryModal from "./CategoryModal";

const TransactionForm: FC = () => {
	const { categories } = useLoaderData() as IResponceTransactionLoader;
	const [visibleModal, setVisibleModal] = useState<boolean>(false);
	return (
		<div className="rounded-md bg-slate-800 p-4 ">
			<Form className=" grid gap-2 " method="post" action="/transactions">
				<label className="grid" htmlFor="title">
					<span>Title</span>
					<input
						type="text"
						className="input mt-1 border-slate-700"
						placeholder="title..."
						name="title"
						required
					/>
				</label>
				<label className="grid" htmlFor="amount">
					<span>Amount</span>
					<input
						type="number"
						className="input mt-1 border-slate-700"
						placeholder="amount..."
						name="amount"
						required
					/>
				</label>
				{/* select */}
				{categories.length ? (
					<label htmlFor="category" className="grid">
						<span>category</span>
						<select name="category" className="input  border-slate-700">
							{categories.map((item) => (
								<option key={item.id} value={item.id}>
									{item.title}
								</option>
							))}
						</select>
					</label>
				) : (
					<h1 className="text-red-300 "> to continue create a category</h1>
				)}
				<button
					onClick={() => {
						setVisibleModal(true);
					}}
					className=" mt-2 flex max-w-fit items-center gap-2 text-white/50 hover:text-white"
				>
					<FaPlus />
					<span> Add categories</span>
				</button>
				{/* Radio buttons */}
				<div className="flex items-center gap-4 my-1">
					<label className="flex cursor-pointer items-center gap-2">
						<input
							type="radio"
							name="type"
							value={"income"}
							className="form-radio text-blue-600"
						/>
						<span>Income</span>
					</label>
					<label className="flex cursor-pointer items-center gap-2">
						<input
							type="radio"
							name="type"
							value={"expence"}
							className="form-radio text-blue-600"
						/>
						<span>expence</span>
					</label>
				</div>
				{/* submit btn */}
				<button type="submit" className="btn btn-green max-w-fit">
					Submit
				</button>
			</Form>
			{visibleModal && (
				<CategoryModal type="post" setVisibleModal={setVisibleModal} />
			)}
		</div>
	);
};

export default TransactionForm;
