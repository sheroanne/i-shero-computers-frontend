
import axios from "axios";
import { useEffect, useState } from "react";
import ViewOrderInfo from "../components/viewOrderInfo";
import Loader from "../components/loader";
import ViewOrderInfoCustomer from "../components/viewOrderInfoCustomer";

export default function OrdersPage() {
	const [orders, setOrders] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
        const token = localStorage.getItem("token");
		if (!loaded) {
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/orders", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
				.then((response) => {
					console.log(response.data);
					setOrders(response.data);
					setLoaded(true);
				});
		}
	}, [loaded]);

	return (
		<div
			className="w-full flex justify-center p-4 sm:p-6 md:p-10 relative bg-midnight"
		>
			{loaded ? (
				<>
					{/* Mobile Card Layout */}
					<div className="w-full max-w-7xl md:hidden space-y-4">
						{orders.map((order, index) => {
							return (
								<div
									key={index}
									className="bg-graphite border border-accent/20 rounded-xl p-4 shadow-lg"
								>
									<div className="flex items-center justify-between mb-3">
										<h3 className="text-lg font-bold text-text-primary">
											Order #{order.orderId}
										</h3>
										<span className={`px-3 py-1 rounded text-sm font-medium ${
											order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
											order.status === 'completed' ? 'bg-cyan/20 text-cyan' :
											order.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
											'bg-accent/20 text-accent'
										}`}>
											{order.status}
										</span>
									</div>
									<div className="space-y-2 mb-4 text-sm">
										<div>
											<p className="text-secondary">Customer Name</p>
											<p className="text-text-primary font-medium">{order.name}</p>
										</div>
										<div>
											<p className="text-secondary">Email</p>
											<p className="text-text-primary break-all">{order.email}</p>
										</div>
										<div>
											<p className="text-secondary">Date</p>
											<p className="text-text-primary">{new Date(order.date).toLocaleDateString()}</p>
										</div>
										<div>
											<p className="text-secondary">Total Amount</p>
											<p className="text-cyan font-bold text-lg">LKR. {order.total.toFixed(2)}</p>
										</div>
									</div>
									<div className="flex justify-end">
										<ViewOrderInfoCustomer order={order} />
									</div>
								</div>
							);
						})}
					</div>

					{/* Desktop Table Layout */}
					<table
						className="hidden md:table w-full max-w-7xl table-auto border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-xl bg-graphite border border-accent/20"
					>
						<thead className="sticky top-0 z-10">
							<tr className="bg-gradient-to-r from-accent/80 to-cyan/80 text-white">
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
									Order ID
								</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
									Customer email
								</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
									Customer name
								</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
									Date
								</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
									Status
								</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
									Total Amount
								</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>

						<tbody className="divide-y divide-accent/20">
							{orders.map((order, index) => {
								return (
									<tr
										key={index}
										className="odd:bg-graphite even:bg-charcoal/50 hover:bg-accent/20 transition-colors border-b border-accent/10"
									>
										<td className="px-4 py-3 text-sm font-medium text-text-primary">
											{order.orderId}
										</td>
										<td className="px-4 py-3 text-sm font-medium text-text-primary">
											{order.email}
										</td>
										<td className="px-4 py-3 text-sm font-medium text-text-primary">
											{order.name}
										</td>
										<td className="px-4 py-3 text-sm font-medium text-secondary">
											{new Date(order.date).toLocaleDateString()}
										</td>
										<td className="px-4 py-3 text-sm font-medium">
											<span className={`px-2 py-1 rounded ${
												order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
												order.status === 'completed' ? 'bg-cyan/20 text-cyan' :
												order.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
												'bg-accent/20 text-accent'
											}`}>
												{order.status}
											</span>
										</td>
										<td className="px-4 py-3 text-sm font-medium text-cyan">
											LKR. {order.total.toFixed(2)}
										</td>
										<td className="px-4 py-3 text-sm font-medium">
											<ViewOrderInfoCustomer order={order} />
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</>
			) : (
				<Loader />
			)}

		</div>
	);
}
