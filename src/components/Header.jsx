import { useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { LuListCollapse } from "react-icons/lu";
import { Link } from "react-router-dom";
import UserData from "./userData";

export default function Header() {
	const [sideBarOpen, setSideBarOpen] = useState(false);
	return (
		<header className="w-full h-[100px] bg-charcoal flex relative shadow-lg border-b border-graphite">
			<LuListCollapse
				onClick={() => {
					setSideBarOpen(true);
				}}
				className="text-text-primary my-auto text-2xl ml-6 lg:hidden hover:text-cyan transition-colors"
			/>
			<img src="/pc-logo.png" className="h-full" alt="logo" />
			<div className="w-full h-full hidden lg:flex text-xl text-text-primary justify-center items-center  gap-[30px]">
				<Link to="/" className="hover:text-cyan transition-colors font-medium">Home</Link>
				<Link to="/products" className="hover:text-cyan transition-colors font-medium">Products</Link>
				<Link to="/about" className="hover:text-cyan transition-colors font-medium">About</Link>
				<Link to="/contact" className="hover:text-cyan transition-colors font-medium">Contact</Link>
			</div>
			<div className="absolute right-24 top-0 h-full  items-center hidden lg:flex">
				<UserData />
			</div>
			<Link
				to="/cart"
				className="absolute right-4 top-1/2 -translate-y-1/2 text-text-primary text-2xl hover:text-cyan transition-colors"
			>
				<BiShoppingBag />
			</Link>
			{sideBarOpen && (
				<div className="fixed lg:hidden w-[100vw] h-screen top-0 left-0 bg-black/70 z-50 transition-all duration-300" onClick={() => setSideBarOpen(false)}>
					<div className="w-[280px] sm:w-[300px] h-screen flex-col relative" onClick={(e) => e.stopPropagation()}>
						<div className="w-full h-full bg-charcoal flex flex-col border-r border-graphite shadow-2xl">
							<div className="w-full h-[100px] bg-charcoal flex items-center justify-between px-4 border-b border-graphite">
								<img src="/pc-logo.png" className="h-full" alt="logo" />
								<LuListCollapse
									onClick={() => {
										setSideBarOpen(false);
									}}
									className="text-text-primary text-2xl hover:text-cyan transition-colors cursor-pointer"
								/>
							</div>
							<div className="w-full h-full flex flex-col text-xl text-text-primary justify-start items-start gap-6 mt-10 pl-6 overflow-y-auto">
								<Link
									to="/"
									className="hover:text-cyan transition-colors font-medium"
									onClick={() => setSideBarOpen(false)}
								>
									Home
								</Link>
								<Link
									to="/products"
									className="hover:text-cyan transition-colors font-medium"
									onClick={() => setSideBarOpen(false)}
								>
									Products
								</Link>
								<Link
									to="/about"
									className="hover:text-cyan transition-colors font-medium"
									onClick={() => setSideBarOpen(false)}
								>
									About
								</Link>
								<Link
									to="/contact"
									className="hover:text-cyan transition-colors font-medium"
									onClick={() => setSideBarOpen(false)}
								>
									Contact
								</Link>
								<div className="w-full flex justify-center bg-gradient-to-r from-accent to-cyan p-2 rounded-full mt-4">
									<UserData />
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</header>
	);
}