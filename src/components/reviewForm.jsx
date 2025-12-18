import axios from "axios";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ReviewForm({ productID, onReviewSubmitted }) {
	const [rating, setRating] = useState(0);
	const [hoverRating, setHoverRating] = useState(0);
	const [comment, setComment] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const token = localStorage.getItem("token");
		if (!token) {
			toast.error("Please login to submit a review");
			navigate("/login");
			return;
		}

		if (rating === 0) {
			toast.error("Please select a rating");
			return;
		}

		if (comment.trim() === "") {
			toast.error("Please write a comment");
			return;
		}

		setSubmitting(true);

		try {
			await axios.post(
				import.meta.env.VITE_BACKEND_URL + "/reviews",
				{
					productID,
					rating,
					comment: comment.trim(),
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			toast.success("Review submitted successfully!");
			setRating(0);
			setComment("");
			if (onReviewSubmitted) {
				onReviewSubmitted();
			}
		} catch (error) {
			if (error.response?.data?.message) {
				toast.error(error.response.data.message);
			} else {
				toast.error("Failed to submit review");
			}
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="w-full border border-graphite rounded-lg p-6 bg-graphite shadow-lg">
			<h3 className="text-xl font-bold mb-4 text-text-primary">Write a Review</h3>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium mb-2">Rating</label>
					<div className="flex items-center gap-2">
						{[1, 2, 3, 4, 5].map((star) => (
							<button
								key={star}
								type="button"
								onClick={() => setRating(star)}
								onMouseEnter={() => setHoverRating(star)}
								onMouseLeave={() => setHoverRating(0)}
								className="focus:outline-none"
							>
								<FaStar
									className={
										star <= (hoverRating || rating)
											? "text-yellow-400"
											: "text-secondary/30"
									}
									size={24}
								/>
							</button>
						))}
						{rating > 0 && (
							<span className="ml-2 text-sm text-secondary/70">
								{rating} {rating === 1 ? "star" : "stars"}
							</span>
						)}
					</div>
				</div>
				<div>
					<label className="block text-sm font-medium mb-2">Comment</label>
					<textarea
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						placeholder="Share your thoughts about this product..."
						className="w-full p-3 border border-graphite rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan resize-none bg-charcoal text-text-primary placeholder-secondary"
						rows="4"
						required
					/>
				</div>
				<button
					type="submit"
					disabled={submitting}
					className="bg-gradient-to-r from-accent to-cyan text-white px-6 py-2 rounded-lg hover:from-cyan hover:to-accent transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
				>
					{submitting ? "Submitting..." : "Submit Review"}
				</button>
			</form>
		</div>
	);
}

