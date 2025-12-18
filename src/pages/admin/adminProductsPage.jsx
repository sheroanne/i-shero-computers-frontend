import axios from "axios";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import ProductDeleteButton from "../../components/productDeleteButton";

export default function AdminProductsPage() {
	const [products, setProducts] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (!loaded) {
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/products")
				.then((response) => {
					console.log(response.data);
					setProducts(response.data);
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
						{products.map((item, index) => {
							return (
								<div
									key={index}
									className="bg-graphite border border-accent/20 rounded-xl p-4 shadow-lg"
								>
									<div className="flex items-start gap-4 mb-4">
										<img
											src={item.images[0]}
											className="w-20 h-20 rounded-lg object-cover ring-1 ring-accent/30 shadow-sm flex-shrink-0"
										/>
										<div className="flex-1 min-w-0">
											<h3 className="text-lg font-bold text-text-primary mb-1 break-words">
												{item.name}
											</h3>
											<p className="text-sm text-secondary">ID: {item.productID}</p>
										</div>
									</div>
									<div className="grid grid-cols-2 gap-3 mb-4 text-sm">
										<div>
											<p className="text-secondary mb-1">Price</p>
											<p className="text-cyan font-semibold">LKR. {item.price}</p>
										</div>
										<div>
											<p className="text-secondary mb-1">Labelled Price</p>
											<p className="text-muted line-through decoration-2">LKR. {item.labelledPrice}</p>
										</div>
										<div>
											<p className="text-secondary mb-1">Category</p>
											<p className="text-text-primary">{item.category}</p>
										</div>
										<div>
											<p className="text-secondary mb-1">Brand</p>
											<p className="text-text-primary">{item.brand}</p>
										</div>
										<div>
											<p className="text-secondary mb-1">Model</p>
											<p className="text-text-primary">{item.model}</p>
										</div>
										<div>
											<p className="text-secondary mb-1">Stock</p>
											<p className="text-text-primary font-medium">{item.stock}</p>
										</div>
									</div>
									<div className="flex items-center justify-between mb-4">
										<span className={`px-3 py-1 rounded text-sm font-medium ${item.isAvailable ? 'bg-cyan/20 text-cyan' : 'bg-muted/20 text-muted'}`}>
											{item.isAvailable ? "Available" : "Unavailable"}
										</span>
										<div className="flex items-center gap-2">
											<button
												onClick={() => {
													navigate("/admin/update-product", { state: item });
												}}
												className="px-3 py-1.5 rounded-md text-sm bg-accent/30 text-white hover:bg-accent/50 transition border border-accent/50"
											>
												Edit
											</button>
											<ProductDeleteButton
												productId={item.productID}
												reload={() => {
													setLoaded(false);
												}}
											/>
										</div>
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
									Image
								</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
									Product ID
								</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
									Name
								</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
									Price
								</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
									Labelled Price
								</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
									Category
								</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
									Brand
								</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
									Model
								</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
									Stock
								</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
									Availability
								</th>
								<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>

						<tbody className="divide-y divide-accent/20">
							{products.map((item, index) => {
								return (
									<tr
										key={index}
										className="odd:bg-graphite even:bg-charcoal/50 hover:bg-accent/20 transition-colors border-b border-accent/10"
									>
										<td className="px-4 py-3 align-middle">
											<img
												src={item.images[0]}
												className="w-[38px] h-[38px] rounded-lg object-cover ring-1 ring-accent/30 shadow-sm"
											/>
										</td>
										<td className="px-4 py-3 text-sm font-medium text-text-primary">
											{item.productID}
										</td>
										<td className="px-4 py-3 text-sm text-text-primary">{item.name}</td>
										<td className="px-4 py-3 text-sm font-semibold text-cyan">
											{item.price}
										</td>
										<td className="px-4 py-3 text-sm line-through decoration-muted decoration-2 text-muted">
											{item.labelledPrice}
										</td>
										<td className="px-4 py-3 text-sm text-secondary">{item.category}</td>
										<td className="px-4 py-3 text-sm text-secondary">{item.brand}</td>
										<td className="px-4 py-3 text-sm text-secondary">{item.model}</td>
										<td className="px-4 py-3 text-sm font-medium text-text-primary">
											{item.stock}
										</td>
										<td className="px-4 py-3 text-sm font-medium text-center">
											<span className={`px-2 py-1 rounded ${item.isAvailable ? 'bg-cyan/20 text-cyan' : 'bg-muted/20 text-muted'}`}>
												{item.isAvailable ? "Available" : "Unavailable"}
											</span>
										</td>
										<td className="px-4 py-3 text-sm">
											<div className="inline-flex items-center gap-2">
												<button
													onClick={() => {
														navigate("/admin/update-product", { state: item });
													}}
													className="px-3 py-2 rounded-md w-[70px] text-center bg-accent/30 text-white hover:bg-accent/50 transition border border-accent/50"
												>
													Edit
												</button>
												<ProductDeleteButton
													productId={item.productID}
													reload={() => {
														setLoaded(false);
													}}
												/>
											</div>
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

			<Link
				to="/admin/add-product"
				className="fixed right-[20px] bottom-[20px] w-[56px] h-[56px]
        flex justify-center items-center text-4xl rounded-full
        bg-gradient-to-r from-accent to-cyan text-white shadow-2xl ring-2 ring-accent/30
        hover:scale-105 hover:shadow-[0_12px_24px_-6px_rgba(59,130,246,0.5)]
        active:scale-95 transition-all"
			>
				<BiPlus />
			</Link>
		</div>
	);
}