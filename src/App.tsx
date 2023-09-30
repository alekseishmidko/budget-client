import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { useAppDispatch } from "./store/hooks";
import { getTokenFromLS } from "./helpers/localstorage.helper";
import { AuthService } from "./service/auth.service";
import { login, logout } from "./store/userSlice/userSlice";
import React from "react";

const App = () => {
	const dispatch = useAppDispatch();
	const checkAuthorisation = async () => {
		const token = getTokenFromLS();
		try {
			if (token) {
				const data = await AuthService.getMe();
				if (data) {
					dispatch(login(data));
				} else {
					dispatch(logout());
				}
			}
		} catch (error) {
			console.log(error, "err in checkAuthorisation ");
		}
	};
	React.useEffect(() => {
		checkAuthorisation();
	}, []);
	return <RouterProvider router={router} />;
};

export default App;
