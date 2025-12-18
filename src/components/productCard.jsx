import { Link } from "react-router-dom";

export default function ProductCard(props) {

    const product = props.product;
    

	return (
		<Link to={"/overview/" + product.productID} className="w-full sm:w-[280px] md:w-[300px] h-[400px] m-2 sm:m-4 shadow-2xl cursor-pointer relative hover:[&_.buttons]:opacity-100 hover:[&_.primary-image]:opacity-0 rounded-xl overflow-hidden bg-graphite hover:shadow-accent/20 transition-all duration-300 border border-graphite/50">

			<div className="w-full h-[250px] relative">
				<img
					src={product.images[1]}
					className="w-full h-full absolute bg-graphite object-cover"/>
				<img
					src={product.images[0]}
					className="w-full h-full absolute bg-graphite primary-image transition-opacity duration-500 object-cover"/>
			</div>
			
			<div className="w-full h-[150px] p-4 flex flex-col justify-between bg-graphite">
				<h1 className="text-center text-lg font-semibold text-text-primary">{product.name}</h1>
				<div className="w-full flex flex-col items-center">
					{
						product.labelledPrice > product.price &&
						<h2 className="text-muted line-through decoration-2 mr-2 text-sm">
							LKR. {product.labelledPrice.toFixed(2)}
						</h2>
					}
					<h2 className="bg-gradient-to-r from-accent to-cyan bg-clip-text text-transparent font-bold text-2xl">
						LKR. {product.price.toFixed(2)}
					</h2>

				</div>
			</div>

			<div className="w-full h-[150px] bottom-0 opacity-0 absolute buttons bg-charcoal/95 backdrop-blur-sm flex flex-row gap-4 justify-center items-center transition-opacity duration-300 border-t border-graphite">
				<button className="border-2 border-accent text-text-primary hover:bg-gradient-to-r hover:from-accent hover:to-cyan hover:text-white transition-all duration-150 h-[50px] w-[150px] flex justify-center items-center rounded-lg font-semibold shadow-lg">View Details</button>
			</div>
			
		</Link>
	);

}