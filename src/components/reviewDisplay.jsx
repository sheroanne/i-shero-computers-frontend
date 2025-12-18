import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

export default function ReviewDisplay({ productID }) {
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get(import.meta.env.VITE_BACKEND_URL + "/reviews/product/" + productID)
			.then((response) => {
				setReviews(response.data);
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
			});
	}, [productID]);

	if (loading) {
		return <div className="text-center py-4">Loading reviews...</div>;
	}

	if (reviews.length === 0) {
		return (
			<div className="text-center py-4 text-secondary/70">
				No reviews yet. Be the first to review this product!
			</div>
		);
	}

	return (
		<div className="w-full space-y-4">
			<h3 className="text-xl font-bold mb-4 text-text-primary">Customer Reviews ({reviews.length})</h3>
			{reviews.map((review, index) => (
				<div
					key={index}
					className="border border-graphite rounded-lg p-4 bg-graphite shadow-md"
				>
					<div className="flex items-center justify-between mb-2">
						<div className="flex items-center gap-2">
							<div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-cyan flex items-center justify-center text-white font-semibold shadow-lg">
								{review.firstName.charAt(0).toUpperCase()}
								{review.lastName.charAt(0).toUpperCase()}
							</div>
							<div>
								<p className="font-semibold text-text-primary">
									{review.firstName} {review.lastName}
								</p>
								<p className="text-sm text-secondary">
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
	);
}

