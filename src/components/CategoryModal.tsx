import { FC } from "react";
import { Form } from "react-router-dom";

interface ICategoryModal {
	type: "post" | "patch";
	id?: string;
	setVisibleModal: (visible: boolean) => void;
}
const CategoryModal: FC<ICategoryModal> = ({
	type,
	id,
	setVisibleModal,
	setIsEdit,
}) => {
	return (
		<div className="fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-black/50 flex justify-center items-center">
			<Form
				action="/categories"
				method={type}
				onSubmit={() => setTimeout(() => setVisibleModal(false), 350)}
				className="grid w-[300px] gap-2 rounded-md bg-slate-900 p-5 "
			>
				<label htmlFor="title">
					<small>Category Title</small>
					<input
						type="text"
						name="title"
						placeholder="Title..."
						className="input w-full"
					/>
					<input type="hidden" name="id" value={id} />
				</label>
				<div className="flex items-center gap-2">
					<button className="btn btn-green " type="submit">
						{type === "patch" ? "Save" : "Create"}
					</button>
					<button
						onClick={() => {
							setVisibleModal(false);
							setIsEdit(false);
						}}
						className="btn btn-red "
					>
						Close
					</button>
				</div>
			</Form>
		</div>
	);
};

export default CategoryModal;
