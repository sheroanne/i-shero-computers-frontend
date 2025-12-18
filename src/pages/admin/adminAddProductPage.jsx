
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineProduct } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../../utils/mediaUpload";

export default function AdminAddProductPage() {
	const [productID, setProductID] = useState("");
	const [name, setName] = useState("");
	const [altNames, setAltNames] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	const [labelledPrice, setLabelledPrice] = useState(0);
	const [files, setFiles] = useState([]);
	const [category, setCategory] = useState("");
	const [brand, setBrand] = useState("");
	const [model, setModel] = useState("");
	const [stock, setStock] = useState(0);
	const [isAvailable, setIsAvailable] = useState(false);
    const navigate = useNavigate()

    async function addProduct(){

        const token = localStorage.getItem("token");
        if(token == null){
            toast.error("You must be logged in as admin to add products.");
            navigate("/login");
            return;
        }
		console.log(files);

		const imagePromises = []

	
		//10
		for(let i=0; i<files.length; i++){

			const promise = uploadFile(files[i])
			imagePromises.push(promise);

		}

		let images = [];
		if (imagePromises.length > 0) {
			try {
				images = await Promise.all(imagePromises);
				// Filter out any failed uploads
				images = images.filter(img => img !== null && img !== undefined);
			} catch (err) {
				toast.error("Error uploading images. Please check Supabase storage policies and try again.");
				console.log("Error uploading images:");
				console.log(err);
				return; // Don't proceed if images fail to upload
			}
		}

        if(productID=="" ||name=="" || description=="" || category=="" || brand=="" || model==""){
            toast.error("Please fill in all required fields.");
            return;
        }

        try{
            const altNamesInArray = altNames.split(",")
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/products/", {
                productID : productID,
                name : name,
                altNames : altNamesInArray,
                description : description,
                price : price,
                labelledPrice : labelledPrice,
                images : images,
                category : category,
                brand : brand,
                model : model,
                stock : stock,
                isAvailable : isAvailable,
            }, {
                headers :{
                    Authorization : "Bearer "+token
                }
            })
            toast.success("Product added successfully!");
            navigate("/admin/products");

        }catch(err){
            toast.error("Error adding product. Please try again.");
            console.log("Error adding product:");
            console.log(err);
        }
    }

	return (
		<div className="w-full flex justify-center p-4 sm:p-6 md:p-8 lg:p-10 min-h-full">
			<div className="w-full max-w-4xl bg-graphite rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl border border-accent/20">
                <h1 className="w-full text-2xl sm:text-3xl font-bold text-text-primary mb-6 sm:mb-8 flex items-center gap-2">
					<AiOutlineProduct className="text-cyan" /> 
					Add New Product
				</h1>
				<div className="w-full bg-charcoal/50 p-4 sm:p-6 md:p-8 flex flex-row flex-wrap justify-between gap-4 sm:gap-6 rounded-xl shadow-xl border border-graphite">
                    
					<div className="w-full sm:w-[48%]">
						<label className="block text-sm font-semibold text-text-primary mb-2">Product ID *</label>
						<input
							type="text"
							value={productID}
							onChange={(e) => {
								setProductID(e.target.value);
							}}
							className="w-full h-12 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan border-2 border-graphite bg-midnight text-text-primary placeholder-secondary transition-all"
							placeholder="Enter unique product ID"
						/>
						<p className="text-xs text-secondary mt-1">
							Provide a unique product ID
						</p>
					</div>
					<div className="w-full sm:w-[48%]">
						<label className="block text-sm font-semibold text-text-primary mb-2">Name *</label>
						<input
							type="text"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
							className="w-full h-12 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan border-2 border-graphite bg-midnight text-text-primary placeholder-secondary transition-all"
							placeholder="Enter product name"
						/>
					</div>
					<div className="w-full">
						<label className="block text-sm font-semibold text-text-primary mb-2">Alternative Names</label>
						<input
							type="text"
							value={altNames}
							onChange={(e) => {
								setAltNames(e.target.value);
							}}
							className="w-full h-12 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan border-2 border-graphite bg-midnight text-text-primary placeholder-secondary transition-all"
							placeholder="Separate multiple names with commas"
						/>
						<p className="text-xs text-secondary mt-1">
							Separate multiple names with commas
						</p>
					</div>
					<div className="w-full">
						<label className="block text-sm font-semibold text-text-primary mb-2">Description *</label>
						<textarea
							value={description}
							onChange={(e) => {
								setDescription(e.target.value);
							}}
							rows="4"
							className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan border-2 border-graphite bg-midnight text-text-primary placeholder-secondary transition-all resize-none"
							placeholder="Enter product description"
						/>
					</div>
					<div className="w-full sm:w-[48%]">
						<label className="block text-sm font-semibold text-text-primary mb-2">Price *</label>
						<input
							type="number"
							value={price}
							onChange={(e) => {
								setPrice(e.target.value);
							}}
							className="w-full h-12 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan border-2 border-graphite bg-midnight text-text-primary placeholder-secondary transition-all"
							placeholder="0.00"
							min="0"
							step="0.01"
						/>
					</div>
					<div className="w-full sm:w-[48%]">
						<label className="block text-sm font-semibold text-text-primary mb-2">Labelled Price</label>
						<input
							type="number"
							value={labelledPrice}
							onChange={(e) => {
								setLabelledPrice(e.target.value);
							}}
							className="w-full h-12 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan border-2 border-graphite bg-midnight text-text-primary placeholder-secondary transition-all"
							placeholder="0.00"
							min="0"
							step="0.01"
						/>
					</div>

					<div className="w-full">
						<label className="block text-sm font-semibold text-text-primary mb-2">Images</label>
						<input
							type="file"
							multiple={true}
							accept="image/*"
							onChange={(e) => {
								setFiles(e.target.files);
							}}
							className="w-full h-12 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan border-2 border-graphite bg-midnight text-text-primary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent/20 file:text-cyan hover:file:bg-accent/30 transition-all cursor-pointer"
						/>
					</div>
					<div className="w-full sm:w-[32%]">
						<label className="block text-sm font-semibold text-text-primary mb-2">Category *</label>
						<select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-12 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan border-2 border-graphite bg-midnight text-text-primary transition-all cursor-pointer">
							<option value="CPU">CPU</option>
							<option value="Graphic Cards">Graphic Cards</option>
                            <option value="Motherboards">Motherboards</option>
                            <option value="Power Supplies">Power Supplies</option>
                            <option value="RAM">RAM</option>
                            <option value="Storage Devices">Storage Devices</option>
                            <option value="Cooling Solutions">Cooling Solutions</option>
                            <option value="Computer Cases">Computer Cases</option>
                            <option value="Mouse and Keyboards">Mouse and Keyboards</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Monitors">Monitors</option>
                            <option value="Computers">Computers</option>
                            <option value="Laptops">Laptops</option>
                            <option value="Cables">Cables</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                    <div className="w-full sm:w-[32%]">
                        <label className="block text-sm font-semibold text-text-primary mb-2">Brand *</label>
                        <input
                            type="text"
                            value={brand}
                            onChange={(e) => {
                                setBrand(e.target.value);
                            }}
                            className="w-full h-12 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan border-2 border-graphite bg-midnight text-text-primary placeholder-secondary transition-all"
                           	placeholder="Enter brand name"
                        />
                    </div>
                    <div className="w-full sm:w-[32%]">
                        <label className="block text-sm font-semibold text-text-primary mb-2">Model *</label>
                        <input
                            type="text"
                            value={model}
                            onChange={(e) => {
                                setModel(e.target.value);
                            }}
                            className="w-full h-12 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan border-2 border-graphite bg-midnight text-text-primary placeholder-secondary transition-all"
                           	placeholder="Enter model name"
                        />
                    </div>
                    <div className="w-full sm:w-[48%]">
                        <label className="block text-sm font-semibold text-text-primary mb-2">Stock</label>
                        <input
                            type="number"
                            value={stock}   
                            onChange={(e) => {
                                setStock(e.target.value);
                            }}
                            className="w-full h-12 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan border-2 border-graphite bg-midnight text-text-primary placeholder-secondary transition-all"
                           	placeholder="0"
                           	min="0"
                        />
                    </div>
                    <div className="w-full sm:w-[48%]">
                        <label className="block text-sm font-semibold text-text-primary mb-2">Available</label>
                        <select value={isAvailable} onChange={(e) => setIsAvailable(e.target.value === "true")} className="w-full h-12 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan border-2 border-graphite bg-midnight text-text-primary transition-all cursor-pointer">
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                    <div className="w-full flex flex-col sm:flex-row gap-4 mt-6">
                        <Link 
                            to="/admin/products" 
                            className="flex-1 h-12 sm:h-14 bg-graphite text-text-primary font-bold rounded-xl flex justify-center items-center hover:bg-graphite/80 border-2 border-graphite transition-all"
                        >
                            Cancel
                        </Link>
                        <button 
                            onClick={addProduct} 
                            className="flex-1 h-12 sm:h-14 bg-gradient-to-r from-accent to-cyan text-white font-bold rounded-xl hover:from-cyan hover:to-accent transition-all shadow-lg hover:shadow-xl"
                        >
                            Add Product
                        </button>
                    </div>

                    
				</div>
			</div>
		</div>
	);
}
