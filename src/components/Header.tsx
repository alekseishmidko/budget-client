import React, { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBtc, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
const Header: FC = () => {
	const isAuth = true;
	// const isAuth = false;
	return (
		<header className=" px-4 py-3 bg-slate-800 flex items-center  shadow-sm backdrop-blur-sm">
			<Link to={"/"}>
				<FaBtc size={20} />
			</Link>
			{isAuth && (
				<nav className="ml-auto mr-18">
					<ul className="flex items-center gap-5 mr-5">
						<li>
							<NavLink
								to={"/"}
								className={(isActive) =>
									isActive ? "text-white" : "text-white/30"
								}
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to={"/categories"}
								className={(isActive) =>
									isActive ? "text-white" : "text-white/30"
								}
							>
								{" "}
								categories
							</NavLink>
						</li>
						<li>
							<NavLink
								to={"/transactions"}
								className={(isActive) =>
									isActive ? "text-white" : "text-white/30"
								}
							>
								{" "}
								transactions
							</NavLink>
						</li>
					</ul>
				</nav>
			)}
			{isAuth ? (
				<button className="btn btn-red">
					<span>Log Out</span>
					<FaSignOutAlt />
				</button>
			) : (
				<Link
					to={"auth"}
					className="py-2 text-white/50 hover:text-white ml-auto"
				>
					{" "}
					<button className="btn btn-green">
						<span>Log In</span>
						<FaSignInAlt />
					</button>
				</Link>
			)}
		</header>
	);
};

export default Header;
