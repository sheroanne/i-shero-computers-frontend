import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import ProductCard from "../components/productCard";

export default function ProductPage() {
	const [products, setProducts] = useState([]);
	const [loaded, setLoaded] = useState(false);

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
	}, []);

	return (
		<div className="w-full min-h-[calc(100vh-100px)] bg-transparent">
			{!loaded ? (
				<Loader />
			) : (
				<div className="w-full flex justify-center p-2 sm:p-4 flex-row flex-wrap  ">
					<div className="w-full h-auto sm:h-[100px] sticky top-0 bg-charcoal flex justify-center items-center mb-4 shadow-lg z-10 border-b border-graphite p-4 sm:p-0">
						<input
							type="text"
							placeholder="Search products..."
							className="w-full sm:w-3/4 md:w-1/2 px-4 py-3 border-2 border-graphite rounded-lg outline-none focus:ring-2 focus:ring-cyan focus:border-cyan bg-midnight text-text-primary placeholder-secondary transition-all"							
							onChange={async (e) => {

								if (e.target.value == "") {
                                    setLoaded(false);
									await axios
										.get(import.meta.env.VITE_BACKEND_URL + "/products")
										.then((response) => {
											console.log(response.data);
											setProducts(response.data);
											setLoaded(true);
										});
                                    setLoaded(true);
								}else{
                                    await axios
                                        .get(
                                            import.meta.env.VITE_BACKEND_URL +
                                                "/products/search/" +
                                                e.target.value
                                        )
                                        .then((response) => {
                                            console.log(response.data);
                                            setProducts(response.data);
                                        });
                                    setLoaded(true);
                                }
							}}
						/>
					</div>

					{products.map((item) => {
						return <ProductCard key={item.productID} product={item} />;
					})}
				</div>
			)}
		</div>
	);
}