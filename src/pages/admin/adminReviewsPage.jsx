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
		<div className="w-full p-4 sm:p-6 md:p-10 bg-midnight">
			<div className="mb-6">
				<h1 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-accent to-cyan bg-clip-text text-transparent">Product Reviews</h1>
				<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
					<label className="text-sm font-medium text-text-primary">Filter by Product:</label>
					<select
						value={selectedProduct || ""}
						onChange={(e) => setSelectedProduct(e.target.value || null)}
						className="w-full sm:w-auto flex-1 sm:flex-none px-4 py-2 border-2 border-graphite rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan bg-charcoal text-text-primary"
					>
						<option value="">All Products</option>
						{products.map((product) => (
							<option key={product.productID} value={product.productID}>
								{product.name} ({product.productID})
							</option>
						))}
					</select>
					<span className="text-sm text-secondary">
						{filteredReviews.length} review{filteredReviews.length !== 1 ? "s" : ""}
					</span>
				</div>
			</div>

			{productIds.length === 0 ? (
				<div className="text-center py-10 text-secondary">
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
								className="border-2 border-graphite rounded-lg p-4 sm:p-6 bg-graphite shadow-lg"
							>
								<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
									<div>
										<h2 className="text-xl sm:text-2xl font-bold text-text-primary">
											{product ? product.name : productID}
										</h2>
										<p className="text-xs sm:text-sm text-secondary">
											Product ID: {productID}
										</p>
									</div>
									<div className="text-left sm:text-right">
										<div className="flex items-center gap-2 mb-1">
											<span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-accent to-cyan bg-clip-text text-transparent">{avgRating.toFixed(1)}</span>
											<div className="flex items-center">
												<FaStar className="text-yellow-400" size={20} />
											</div>
										</div>
										<p className="text-xs sm:text-sm text-secondary">
											{productReviews.length} review
											{productReviews.length !== 1 ? "s" : ""}
										</p>
									</div>
								</div>

								<div className="space-y-4 mt-6">
									{productReviews.map((review, index) => (
										<div
											key={index}
											className="border-l-4 border-accent pl-4 py-2 bg-charcoal rounded-r-lg"
										>
											<div className="flex items-center justify-between mb-2">
												<div className="flex items-center gap-2">
													<div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-cyan flex items-center justify-center text-white font-semibold text-sm shadow-md">
														{review.firstName.charAt(0).toUpperCase()}
														{review.lastName.charAt(0).toUpperCase()}
													</div>
													<div>
														<p className="font-semibold text-text-primary">
															{review.firstName} {review.lastName}
														</p>
														<p className="text-xs text-secondary">
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
																	: "text-muted"
															}
															size={16}
														/>
													))}
												</div>
											</div>
											<p className="text-secondary mt-2">{review.comment}</p>
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

