import React, { FC } from "react";
import { useAuth } from "../hooks/useAuth";
import Auth from "../pages/Auth";

interface Props {
	children: JSX.Element;
}
const ProtectedRoute: FC<Props> = ({ children }) => {
	const isAuth = useAuth();
	return (
		<>
			{isAuth ? (
				children
			) : (
				<>
					<Auth />
				</>
			)}
		</>
	);
};

export default ProtectedRoute;
