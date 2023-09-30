import React, { FC } from "react";
import { AuthService } from "../service/auth.service";
import { toast } from "react-toastify";
import { setTokenToLS } from "../helpers/localstorage.helper";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/userSlice/userSlice";
import { useNavigate } from "react-router-dom";

const Auth: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [isLogin, setIsLogin] = React.useState<boolean>(false);
	const [email, setEmail] = React.useState<string>("");
	const [password, setPassword] = React.useState<string>("");
	const registrationHandler = async (
		event: React.FormEvent<HTMLFormElement>,
	) => {
		try {
			event?.preventDefault();
			const data = await AuthService.registration({ email, password });
			if (data) {
				dispatch(login(data));
				toast.success("Account is created");
				setIsLogin(!isLogin);
				setTokenToLS("token", data.token);
				navigate("/");
			}
		} catch (err: any) {
			const error = err.response?.data.message;
			toast.error(error.toString());
		}
	};
	const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		try {
			event?.preventDefault();
			const data = await AuthService.login({ email, password });
			if (data) {
				dispatch(login(data));
				toast.success("Login is success");
				setTokenToLS("token", data.token);
				navigate("/");
			}
		} catch (err: any) {
			const error = err.response?.data.message;
			toast.error(error.toString());
		}
	};
	return (
		<div className="mt-40 flex flex-col items-center justify-center  bg-slate-900 text-white">
			<h1 className="text-center text-xl mb-3">
				{" "}
				{isLogin ? "Login" : "Registration"}
			</h1>
			<form
				className="flex w-1/3 flex-col mx-auto gap-5 mt-2"
				onSubmit={isLogin ? loginHandler : registrationHandler}
			>
				<input
					type="text"
					className="input"
					placeholder="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					className="input"
					placeholder="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className="btn btn-green mx-auto" type="submit">
					Submit
				</button>
			</form>
			<div className="flex justify-center mt-5">
				{isLogin ? (
					<button
						onClick={() => setIsLogin(!isLogin)}
						className="btn text-slate-300 hover:text-white"
					>
						You dont have acc? Register!
					</button>
				) : (
					<button
						onClick={() => setIsLogin(!isLogin)}
						className="btn text-slate-300 hover:text-white"
					>
						Already have an acc?
					</button>
				)}
			</div>
		</div>
	);
};

export default Auth;
