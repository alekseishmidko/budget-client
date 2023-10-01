import React, { FC, useState } from "react";
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import CategoryModal from "../components/CategoryModal";
import { instance } from "../api/axios.api";
import { ICategory } from "../types/types";

export const categoriesAction = async ({ request }) => {
	switch (request.method) {
		case "POST": {
			const formData = await request.formData();
			const title = {
				title: formData.get("title"),
			};
			await instance.post("/categories", title);
			return null;
		}
		case "PATCH": {
			const formData = await request.formData();
			const id = formData.get("id");
			const title = {
				title: formData.get("title"),
			};
			await instance.patch(`/categories/category/${id}`, title);
			return null;
		}
		case "DELETE": {
			const formData = await request.formData();
			const id = formData.get("id");
			await instance.delete(`/categories/category/${id}`);
			return null;
		}
	}
};
export const categoryLoader = async () => {
	const { data } = await instance.get<ICategory[]>("/categories");
	return data;
};
const Categories: FC = () => {
	const categories = useLoaderData() as ICategory;
	const [visibleModal, setVisibleModal] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [categoryId, setCategoryId] = useState<number>(0);
	return (
		<>
			<div className=" mt-10 p-4 rounded-md bg-slate-800">
				<h1 className="">Your category list:</h1>
				<div className="mt-2 flex flex-wrap items-center gap-2">
					{categories.map((item, index) => (
						<div
							key={index}
							className="group relative flex items-center gap-2 rounded-lg bg-blue-600 py-6 px-14"
						>
							<div className="absolute px-3 left-0 top-0 bottom-0 right-0 rounded-lg bg-black/90 flex items-center justify-between group-hover:flex">
								{item.title}
								<button
									onClick={() => {
										setCategoryId(item.id);
										setVisibleModal(true);
										setIsEdit(true);
									}}
								>
									<AiFillEdit />
								</button>
								<Form className="flex" method="DELETE" action="/categories">
									<input type="hidden" name={"id"} value={item.id} />
									<button type="submit">
										<AiFillCloseCircle />
									</button>
								</Form>
							</div>
						</div>
					))}
				</div>
				<button
					onClick={() => setVisibleModal(true)}
					className=" mt-5 flex max-w-fit items-center gap-2 text-white/50 hover:text-white"
				>
					<FaPlus />
					<span> Create a new category</span>
				</button>
			</div>
			{/* add category modal */}
			{visibleModal && (
				<CategoryModal type="post" setVisibleModal={setVisibleModal} />
			)}
			{/* edit  category modal */}
			{isEdit && visibleModal && (
				<CategoryModal
					type="patch"
					id={categoryId}
					setVisibleModal={setVisibleModal}
					setIsEdit={setIsEdit}
				/>
			)}
		</>
	);
};

export default Categories;
