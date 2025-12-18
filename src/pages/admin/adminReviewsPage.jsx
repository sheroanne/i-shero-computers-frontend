import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Loader from "../../components/loader";
import toast from "react-hot-toast";

export default function AdminReviewsPage() {
	const [reviews, setReviews] = useState([]);
	const [products, setProducts] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [filteredReviews, setFilteredReviews] = useState([]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			window.location.href = "/login";
			return;
		}

		// Fetch all reviews
		axios
			.get(import.meta.env.VITE_BACKEND_URL + "/reviews", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setReviews(response.data);
				setFilteredReviews(response.data);
				setLoading(false);
			})
			.catch((error) => {
				toast.error("Failed to load reviews");
				setLoading(false);
			});

		// Fetch all products for filter
		axios
			.get(import.meta.env.VITE_BACKEND_URL + "/products", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setProducts(response.data);
			})
			.catch(() => {
				// Silently fail - products are optional
			});
	}, []);

	useEffect(() => {
		if (selectedProduct) {
			const filtered = reviews.filter(
				(review) => review.productID === selectedProduct
			);
			setFilteredReviews(filtered);
		} else {
			setFilteredReviews(reviews);
		}
	}, [selectedProduct, reviews]);

	if (loading) {
		return <Loader />;
	}

	// Group reviews by product
	const reviewsByProduct = {};
	filteredReviews.forEach((review) => {
		if (!reviewsByProduct[review.productID]) {
			reviewsByProduct[review.productID] = [];
		}
		reviewsByProduct[review.productID].push(review);
	});

	const productIds = Object.keys(reviewsByProduct);

	return (
		<div className="w-full p-10">
			<div className="mb-6">
				<h1 className="text-3xl font-bold mb-4">Product Reviews</h1>
				<div className="flex items-center gap-4">
					<label className="text-sm font-medium">Filter by Product:</label>
					<select
						value={selectedProduct || ""}
						onChange={(e) => setSelectedProduct(e.target.value || null)}
						className="px-4 py-2 border border-secondary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
					>
						<option value="">All Products</option>
						{products.map((product) => (
							<option key={product.productID} value={product.productID}>
								{product.name} ({product.productID})
							</option>
						))}
					</select>
					<span className="text-sm text-secondary/70">
						{filteredReviews.length} review{filteredReviews.length !== 1 ? "s" : ""}
					</span>
				</div>
			</div>

			{productIds.length === 0 ? (
				<div className="text-center py-10 text-secondary/70">
					No reviews found.
				</div>
			) : (
				<div className="space-y-8">
					{productIds.map((productID) => {
						const productReviews = reviewsByProduct[productID];
						const product = products.find((p) => p.productID === productID);
						const avgRating =
							productReviews.reduce((sum, r) => sum + r.rating, 0) /
							productReviews.length;

						return (
							<div
								key={productID}
								className="border border-secondary/20 rounded-lg p-6 bg-white/70"
							>
								<div className="flex items-center justify-between mb-4">
									<div>
										<h2 className="text-2xl font-semibold">
											{product ? product.name : productID}
										</h2>
										<p className="text-sm text-secondary/70">
											Product ID: {productID}
										</p>
									</div>
									<div className="text-right">
										<div className="flex items-center gap-2 mb-1">
											<span className="text-2xl font-bold">{avgRating.toFixed(1)}</span>
											<div className="flex items-center">
												<FaStar className="text-yellow-400" size={20} />
											</div>
										</div>
										<p className="text-sm text-secondary/70">
											{productReviews.length} review
											{productReviews.length !== 1 ? "s" : ""}
										</p>
									</div>
								</div>

								<div className="space-y-4 mt-6">
									{productReviews.map((review, index) => (
										<div
											key={index}
											className="border-l-4 border-accent pl-4 py-2 bg-primary/20 rounded-r-lg"
										>
											<div className="flex items-center justify-between mb-2">
												<div className="flex items-center gap-2">
													<div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold text-sm">
														{review.firstName.charAt(0).toUpperCase()}
														{review.lastName.charAt(0).toUpperCase()}
													</div>
													<div>
														<p className="font-semibold">
															{review.firstName} {review.lastName}
														</p>
														<p className="text-xs text-secondary/70">
															{review.email} •{" "}
															{new Date(review.date).toLocaleDateString()}
														</p>
													</div>
												</div>
												<div className="flex items-center gap-1">
													{[1, 2, 3, 4, 5].map((star) => (
														<FaStar
															key={star}
															className={
																star <= review.rating
																	? "text-yellow-400"
																	: "text-secondary/30"
															}
															size={16}
														/>
													))}
												</div>
											</div>
											<p className="text-secondary/90 mt-2">{review.comment}</p>
										</div>
									))}
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

