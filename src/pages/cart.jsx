import { useState } from "react";
import { addToCart, getCart, getCartTotal } from "../utils/cart";
import { BsChevronUp } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function CartPage() {
	const [cart, setCart] = useState(getCart());

	return (
		<div className="w-full flex flex-col items-center p-4 sm:p-[20px]">
			{cart.map((item, index) => {
				return (
					<div
						key={index}
						className="w-full lg:w-[50%] pt-4 sm:pt-[20px] relative min-h-[150px] lg:h-[150px] rounded-xl overflow-hidden shadow-2xl my-2 flex flex-col sm:flex-row justify-between bg-graphite border border-graphite/50"
					>
						<h1 className="lg:hidden w-full overflow-hidden text-sm sm:text-base font-semibold text-text-primary mb-2 px-4 pt-2">
							{item.name}
						</h1>
						<div className="h-full flex flex-row sm:flex-col items-center sm:items-start gap-2 sm:gap-0 px-4 sm:px-0">
							<img
								src={item.image}
								className="h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] lg:h-full lg:w-auto aspect-square object-cover rounded-lg"
							/>
							<div className="flex flex-col sm:hidden">
								{item.labelledPrice > item.price && (
									<h2 className="text-secondary/80 line-through decoration-gold/70 decoration-2 text-xs">
										LKR. {item.labelledPrice.toFixed(2)}
									</h2>
								)}
								<h2 className="text-sm text-accent font-semibold">
									LKR. {item.price.toFixed(2)}
								</h2>
								<h3 className="text-xs text-secondary mt-1">{item.productID}</h3>
							</div>
						</div>
						<div className="hidden lg:flex flex-col justify-center pl-4 w-[300px]">
							<h1 className="text-2xl font-semibold relative hover:[&_.tooltip]:opacity-100">
								<span className="opacity-0 tooltip italic text-sm absolute bottom-[-50px] bg-accent text-white p-2 rounded-lg">
									{item.name}
								</span>
								{item.name.length > 20
									? item.name.substring(0, 20) + "..."
									: item.name}
							</h1>
							{item.labelledPrice > item.price && (
								<h2 className="text-secondary/80 line-through decoration-gold/70 decoration-2 mr-2 text-lg">
									LKR. {item.labelledPrice.toFixed(2)}
								</h2>
							)}
							<h2 className="text-xl text-accent font-semibold mt-2">
								LKR. {item.price.toFixed(2)}
							</h2>
							<h3 className="text-lg mt-2">{item.productID}</h3>
						</div>
						<div className="min-h-full flex flex-row items-center justify-between sm:justify-end gap-2 sm:gap-4 px-4 pb-4 sm:pb-0 sm:px-0">
							<div className="h-full flex flex-col justify-center items-center">
								<BsChevronUp
									onClick={() => {
										addToCart(item, 1);
										const newCart = getCart();
										setCart(newCart);
									}}
									className="text-2xl cursor-pointer hover:text-accent transition"
								/>
								<span className="text-lg">{item.quantity}</span>
								<BsChevronUp
									onClick={() => {
										addToCart(item, -1);
										const newCart = getCart();
										setCart(newCart);
									}}
									className="rotate-180 text-2xl cursor-pointer hover:text-accent transition"
								/>
							</div>
							<span className="pr-0 sm:pr-4 text-base sm:text-lg font-semibold text-right">
								LKR. {(item.price * item.quantity).toFixed(2)}
							</span>
						</div>
					</div>
				);
			})}
			<div className="w-full lg:w-[50%] min-h-[100px] sm:h-[150px] rounded-xl overflow-hidden shadow-2xl my-2 flex flex-col sm:flex-row justify-between items-center bg-graphite border border-graphite/50 p-4">
				<Link
					to="/checkout"
					className="w-full sm:w-auto self-center sm:ml-4 px-6 py-3 rounded bg-accent text-white hover:bg-accent/90 transition text-center font-semibold"
					state={cart}
				>
					Checkout
				</Link>
				<span className="pr-0 sm:pr-4 text-lg sm:text-xl font-bold text-center sm:text-right mt-2 sm:mt-0">
					Total: LKR. {getCartTotal().toFixed(2)}
				</span>
			</div>
		</div>
	);
}