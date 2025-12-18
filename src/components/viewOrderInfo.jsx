import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";

export default function ViewOrderInfo(props) {
	const order = props.order;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [notes, setNotes] = useState(order.notes);
	const [status, setStatus] = useState(order.status);

	if (!order) return null;

	const formatDateTime = (value) => {
		if (!value) return "-";
		const d = new Date(value);
		return d.toLocaleString();
	};

	const formatCurrency = (value) => {
		if (value == null) return "-";
		return `Rs. ${Number(value).toFixed(2)}`;
	};

	const getStatusBadgeClasses = (status) => {
		switch (status?.toLowerCase()) {
			case "completed":
			case "paid":
				return "bg-cyan/20 text-cyan border border-cyan/30";
			case "cancelled":
			case "canceled":
				return "bg-red-500/20 text-red-400 border border-red-500/30";
			case "processing":
				return "bg-accent/20 text-accent border border-accent/30";
			default:
				// pending / default
				return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
		}
	};

	const orderTotalFromItems =
		Array.isArray(order.items) && order.items.length > 0
			? order.items.reduce(
					(sum, item) => sum + (item.price || 0) * (item.quantity || 0),
					0
			  )
			: order.total;

	return (
		<>
			<Modal
				isOpen={isModalOpen}
				onRequestClose={() => setIsModalOpen(false)}
				ariaHideApp={false}
				overlayClassName="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
				className="w-full max-w-3xl mx-4 bg-graphite rounded-2xl shadow-2xl outline-none border border-accent/20"
			>
				<div className="flex flex-col h-full max-h-[90vh]">
					{/* Header */}
					<div className="flex items-start justify-between border-b border-graphite px-6 py-4 bg-charcoal/50">
						<div>
							<h2 className="text-2xl font-bold text-text-primary">
								Order Details
							</h2>
							<p className="text-sm text-secondary mt-1">
								Review the full breakdown of this customer order.
							</p>
						</div>
						<button
							onClick={() => setIsModalOpen(false)}
							className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-graphite text-text-primary hover:bg-accent/20 hover:text-cyan transition"
							aria-label="Close"
						>
							<span className="text-lg leading-none">&times;</span>
						</button>
					</div>

					{/* Body */}
					<div className="px-6 py-4 space-y-6 overflow-y-auto bg-midnight">
						{/* Top summary */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<div>
									<p className="text-xs font-semibold tracking-wide text-secondary uppercase">
										Order ID
									</p>
									<p className="text-sm font-semibold text-text-primary">
										{order.orderId}
									</p>
								</div>
								<div>
									<p className="text-xs font-semibold tracking-wide text-secondary uppercase">
										Customer Name
									</p>
									<p className="text-sm text-text-primary">{order.name}</p>
								</div>
								<div>
									<p className="text-xs font-semibold tracking-wide text-secondary uppercase">
										Email
									</p>
									<p className="text-sm text-text-primary break-all">
										{order.email}
									</p>
								</div>
								{order.phone && (
									<div>
										<p className="text-xs font-semibold tracking-wide text-secondary uppercase">
											Phone
										</p>
										<p className="text-sm text-text-primary">{order.phone}</p>
									</div>
								)}
							</div>

							<div className="space-y-2">
								<div>
									<p className="text-xs font-semibold tracking-wide text-secondary uppercase">
										Order Date &amp; Time
									</p>
									<p className="text-sm text-secondary">
										{formatDateTime(order.date)}
									</p>
								</div>
								<div>
									<p className="text-xs font-semibold tracking-wide text-secondary uppercase">
										Status
									</p>
									<div className=" flex flex-row">
										<span
											className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClasses(
												order.status
											)}`}
										>
											<span className="w-1.5 h-1.5 rounded-full bg-current mr-2" />
											{order.status || "pending"}
										</span>
										<select
											value={status}
											onChange={(e) => setStatus(e.target.value)}
											className="ml-4 px-2 py-1 border border-graphite rounded-lg text-sm text-text-primary outline-none focus:ring-2 focus:ring-cyan bg-charcoal"
										>
											<option
												value="pending"
												className="bg-transparent border-1 border-accent rounded-full"
											>
												Pending
											</option>
											<option
												value="processing"
												className="bg-transparent border-1 border-accent rounded-full"
											>
												Processing
											</option>
											<option
												value="completed"
												className="bg-transparent border-1 border-accent rounded-full"
											>
												Completed
											</option>
											<option
												value="cancelled"
												className="bg-transparent border-1 border-accent rounded-full"
											>
												Cancelled
											</option>
										</select>
									</div>
								</div>
								<div>
									<p className="text-xs font-semibold tracking-wide text-secondary uppercase">
										Total Amount
									</p>
									<p className="text-lg font-bold text-cyan">
										{formatCurrency(order.total ?? orderTotalFromItems)}
									</p>
									{order.total != null &&
										orderTotalFromItems != null &&
										Number(order.total) !== Number(orderTotalFromItems) && (
											<p className="text-[11px] text-secondary mt-0.5">
												Calculated from items:{" "}
												<span className="font-medium">
													{formatCurrency(orderTotalFromItems)}
												</span>
											</p>
										)}
								</div>
							</div>
						</div>

						{/* Address */}
						<div className="border border-graphite rounded-xl p-4 bg-graphite">
							<p className="text-xs font-semibold tracking-wide text-secondary uppercase mb-1">
								Delivery Address
							</p>
							<p className="text-sm text-text-primary whitespace-pre-line">
								{order.address}
							</p>
						</div>

						{/* Notes (if any) */}

						<div className="border border-graphite rounded-xl p-4 bg-graphite">
							<p className="text-xs font-semibold tracking-wide text-secondary uppercase mb-1">
								Additional Notes
							</p>
							<textarea
								className="text-sm text-text-primary whitespace-pre-line w-full outline-0 bg-charcoal border border-graphite rounded-lg p-2 focus:ring-2 focus:ring-cyan"
								value={notes}
								onChange={(e) => {
									if (e.target.value == "") {
										setNotes(null);
									} else {
										setNotes(e.target.value);
									}
								}}
							></textarea>
						</div>

						{/* Items */}
						<div className="border border-graphite rounded-xl bg-graphite overflow-hidden">
							<div className="flex items-center justify-between px-4 py-3 border-b border-graphite bg-charcoal/50">
								<p className="text-sm font-semibold text-text-primary">
									Items in this order
								</p>
								<p className="text-xs text-secondary">
									{order.items?.length || 0} item
									{(order.items?.length || 0) !== 1 ? "s" : ""}
								</p>
							</div>

							{Array.isArray(order.items) && order.items.length > 0 ? (
								<div className="max-h-64 overflow-y-auto divide-y divide-graphite">
									{order.items.map((item, index) => {
										const lineTotal = (item.price || 0) * (item.quantity || 0);
										return (
											<div
												key={`${item.productID}-${index}`}
												className="flex items-center gap-4 px-4 py-3 hover:bg-charcoal/50 transition-colors"
											>
												{/* Thumbnail */}
												<div className="flex-shrink-0">
													<div className="w-14 h-14 rounded-lg overflow-hidden bg-charcoal flex items-center justify-center border border-graphite">
														{item.image ? (
															<img
																src={item.image}
																alt={item.name}
																className="w-full h-full object-cover"
															/>
														) : (
															<span className="text-xs text-muted">
																No image
															</span>
														)}
													</div>
												</div>

												{/* Details */}
												<div className="flex-1 min-w-0">
													<p className="text-sm font-semibold text-text-primary truncate">
														{item.name}
													</p>
													<p className="text-xs text-secondary mt-0.5">
														Product ID:{" "}
														<span className="font-medium">
															{item.productID}
														</span>
													</p>
													<p className="text-xs text-secondary mt-0.5">
														Qty:{" "}
														<span className="font-medium">{item.quantity}</span>{" "}
														&nbsp;|&nbsp; Unit Price:{" "}
														<span className="font-medium text-cyan">
															{formatCurrency(item.price)}
														</span>
													</p>
												</div>

												{/* Line total */}
												<div className="flex-shrink-0 text-right">
													<p className="text-sm font-semibold text-cyan">
														{formatCurrency(lineTotal)}
													</p>
												</div>
											</div>
										);
									})}
								</div>
							) : (
								<div className="px-4 py-6 text-center text-sm text-secondary">
									No items found for this order.
								</div>
							)}
						</div>
					</div>

					{/* Footer */}
					<div className="px-6 py-4 border-t border-graphite flex justify-end gap-2 bg-charcoal/50">
						{(order.notes != notes || order.status != status) && (
							<button
								onClick={() => {
									const token = localStorage.getItem("token");
									axios.put(
										import.meta.env.VITE_BACKEND_URL +
											`/orders/${order.orderId}`,
										{
											status: status,
											notes: notes,
										},
										{
											headers: {
												Authorization: `Bearer ${token}`,
											},
										}
									).then(() => {
                                        toast.success("Order updated successfully.");
                                        window.location.reload();
                                        setIsModalOpen(false);
                                    }).catch(() => {
                                        toast.error("Failed to update order. Please try again.");
                                    });
								}}
								className="px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-cyan text-white text-sm font-medium hover:from-cyan hover:to-accent transition-all shadow-lg"
							>
								Save Changes
							</button>
						)}

						<button
							onClick={() => setIsModalOpen(false)}
							className="px-4 py-2 rounded-lg border-2 border-graphite text-text-primary text-sm font-medium hover:bg-graphite transition"
						>
							Close
						</button>
					</div>
				</div>
			</Modal>

			<button
				className="bg-gradient-to-r from-accent to-cyan hover:from-cyan hover:to-accent px-3 py-2 rounded-lg text-white cursor-pointer text-sm font-medium shadow-lg transition-all"
				onClick={() => {
					setIsModalOpen(true);
				}}
			>
				View Info
			</button>
		</>
	);
}