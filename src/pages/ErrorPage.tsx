import React, { FC } from "react";
import { Link } from "react-router-dom";

const ErrorPage: FC = () => {
	return (
		<div className="min-h-screen bg-slate-900 font-roboto text-white justify-center items-center flex-col gap-10 ">
			<div className="flex justify-center items-center">
				<Link
					to={"/"}
					className="bg-sky-500 py-2 px-6 rounded-md hover:gb-sky-600  "
				>
					To Home Page
				</Link>
			</div>
		</div>
	);
};

export default ErrorPage;
