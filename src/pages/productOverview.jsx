import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/loader";
import ImageSlider from "../components/imageSlider";
import { CgChevronRight } from "react-icons/cg";
import { addToCart } from "../utils/cart";
import ReviewDisplay from "../components/reviewDisplay";
import ReviewForm from "../components/reviewForm";

export default function ProductOverview() {
	const navigate = useNavigate();
	const params = useParams();
	const [product, setProduct] = useState(null);
	const [status, setStatus] = useState("loading"); //loading, error, success
	const [reviewKey, setReviewKey] = useState(0); // Force re-render of reviews

	useEffect(() => {
		if (status == "loading") {
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/products/" + params.productID)
				.then((response) => {
					setProduct(response.data);
					setStatus("success");
				})
				.catch(() => {
					toast.error("Product Not Found");
					setStatus("error");
				});
		}
	}, []);
	return (
		<>
			{status == "loading" && <Loader />}
			{status == "error" && (
				<h1 className="text-center mt-10 text-2xl">Error loading product.</h1>
			)}
			{status == "success" && (
				<div className="w-full min-h-[calc(100vh-100px)] flex flex-col bg-midnight">
					<div className="w-full flex flex-col lg:flex-row">
						<h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold lg:hidden text-center sticky top-0 bg-charcoal text-text-primary p-4 border-b border-graphite z-10">
							{product.name}
						</h1>

						<div className="w-full lg:w-1/2 h-[400px] sm:h-[500px] lg:h-[calc(100vh-100px)] flex justify-center items-center bg-graphite">
							<ImageSlider images={product.images} />
						</div>
						<div className="w-full lg:w-1/2 h-full p-4 sm:p-6 md:p-10 flex flex-col gap-4 sm:gap-6 bg-midnight">
							<h1 className="text-3xl sm:text-4xl font-bold text-text-primary hidden lg:block">
								{product.name}
							</h1>
							<h2 className="text-base sm:text-lg text-secondary">{product.productID}</h2>
							<h3 className="text-base sm:text-lg text-secondary flex items-center">
								<CgChevronRight /> {product.category}
							</h3>
							{/* alternative names */}
							{product.altNames && product.altNames.length > 0 && (
								<h3 className="text-sm sm:text-md text-secondary break-words">
									{product.altNames.join(" | ")}
								</h3>
							)}
							<p className="text-sm sm:text-md text-justify text-secondary min-h-[100px] sm:h-32 overflow-y-auto">
								{product.description}
							</p>
							<div className="w-full">
								{product.labelledPrice > product.price && (
									<h2 className="text-muted line-through decoration-2 mr-2 text-lg sm:text-xl">
										LKR. {product.labelledPrice.toFixed(2)}
									</h2>
								)}
								<h2 className="bg-gradient-to-r from-accent to-cyan bg-clip-text text-transparent font-bold text-2xl sm:text-3xl">
									LKR. {product.price.toFixed(2)}
								</h2>
							</div>
							<div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
								<button
									onClick={() => {
										addToCart(product, 1);
									}}
									className="w-full sm:w-auto bg-gradient-to-r from-accent to-cyan text-white px-6 py-3 rounded-lg hover:from-cyan hover:to-accent transition-all shadow-lg hover:shadow-xl font-semibold"
								>
									Add to Cart
								</button>
								<button
									onClick={() => {
										navigate("/checkout", {
											state: [
												{
													productID: product.productID,
													name: product.name,
													price: product.price,
													labelledPrice: product.labelledPrice,
													image: product.images[0],
													quantity: 1,
												},
											],
										});
									}}
									className="w-full sm:w-auto border-2 border-accent text-accent px-6 py-3 rounded-lg hover:bg-gradient-to-r hover:from-accent hover:to-cyan hover:text-white hover:border-transparent transition-all font-semibold"
								>
									Buy Now
								</button>
							</div>
						</div>
					</div>
					<div className="w-full p-4 sm:p-6 md:p-10 border-t border-graphite mt-8 bg-midnight">
						<div className="max-w-4xl mx-auto space-y-6">
							<ReviewForm
								productID={product.productID}
								onReviewSubmitted={() => {
									setReviewKey((prev) => prev + 1);
								}}
							/>
							<div className="mt-8">
								<ReviewDisplay key={reviewKey} productID={product.productID} />
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}