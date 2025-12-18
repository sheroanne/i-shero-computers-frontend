import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/loader";

export default function RegisterPage() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading , setIsLoading] = useState(false);

	const navigate = useNavigate();

	async function register() {


        if(firstName.trim()== ""){
            toast.error("First name is required");
            return;
        }
        if(lastName.trim()== ""){
            toast.error("Last name is required");
            return;
        }
        if(email.trim()== ""){
            toast.error("Email is required");
            return;
        }
        if(password.trim()== ""){
            toast.error("Password is required");
            return;
        }   
        if(password !== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }

        if(password != confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        setIsLoading(true);
		try {
			await axios.post(
				import.meta.env.VITE_BACKEND_URL + "/users/",
				{
					email: email.trim(),
					password: password.trim(),
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
				}
			);
			console.log();
            navigate("/login");
			//alert("Login successful! Welcome back.");

			toast.success("Registration successful! Welcome to I computers.");
            setIsLoading(false);
		} catch (err) {
			//alert("Login failed! Please check your credentials and try again.");
			toast.error("Registration failed! Please check your data and try again.");
			console.log(err);
            setIsLoading(false);
		}
	}

	return (
		<div className="w-full min-h-screen bg-[url('/bg-cover.jpg')] bg-center bg-cover bg-no-repeat bg-fixed relative flex flex-col lg:flex-row">
			{/* Background overlay */}
			<div className="absolute inset-0 bg-midnight/80 z-0"></div>
			
			{/* Left side - Branding (hidden on mobile, shown on desktop) */}
			<div className="hidden lg:flex lg:w-1/2 h-screen justify-center items-center flex-col p-8 relative z-10">
				<div className="max-w-md text-center space-y-6">
					<img
						src="/pc-logo.png"
						alt="logo"
						className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-4 object-cover drop-shadow-2xl"
					/>
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cyan font-black leading-tight">
						Power Up Your Digital Life
					</h1>
					<p className="text-lg sm:text-xl md:text-2xl text-secondary italic mt-4">
						Premium PCs, Laptops & Accessories
					</p>
				</div>
			</div>

			{/* Right side - Register Form */}
			<div className="w-full lg:w-1/2 min-h-screen flex justify-center items-center p-4 sm:p-6 md:p-8 relative z-10 py-8">
				<div className="w-full max-w-md backdrop-blur-lg shadow-2xl rounded-2xl flex flex-col p-6 sm:p-8 md:p-10 bg-charcoal/95 border border-graphite/50 my-auto">
					{/* Mobile logo */}
					<div className="lg:hidden text-center mb-6">
						<img
							src="/pc-logo.png"
							alt="logo"
							className="w-20 h-20 mx-auto mb-4 object-cover"
						/>
						<h1 className="text-2xl sm:text-3xl text-cyan font-black mb-2">
							Power Up Your Digital Life
						</h1>
						<p className="text-sm sm:text-base text-secondary italic">
							Premium PCs, Laptops & Accessories
						</p>
					</div>

					<h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-text-primary text-center lg:text-left">
						Create Account
					</h1>
					
					<div className="space-y-4 sm:space-y-5">
						<div className="grid grid-cols-2 gap-3 sm:gap-4">
							<div>
								<label htmlFor="firstName" className="block text-sm font-semibold text-text-primary mb-2">
									First Name
								</label>
								<input
									id="firstName"
									onChange={(e) => {
										setFirstName(e.target.value);
									}}
									type="text"
									placeholder="First name"
									className="w-full h-12 sm:h-14 px-4 rounded-xl border-2 border-graphite text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan bg-midnight text-text-primary placeholder-secondary transition-all"
								/>
							</div>
							<div>
								<label htmlFor="lastName" className="block text-sm font-semibold text-text-primary mb-2">
									Last Name
								</label>
								<input
									id="lastName"
									onChange={(e) => {  
										setLastName(e.target.value);
									}}
									type="text"
									placeholder="Last name"
									className="w-full h-12 sm:h-14 px-4 rounded-xl border-2 border-graphite text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan bg-midnight text-text-primary placeholder-secondary transition-all"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="email" className="block text-sm font-semibold text-text-primary mb-2">
								Email
							</label>
							<input
								id="email"
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								type="email"
								placeholder="Enter your email"
								className="w-full h-12 sm:h-14 px-4 rounded-xl border-2 border-graphite text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan bg-midnight text-text-primary placeholder-secondary transition-all"
							/>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-semibold text-text-primary mb-2">
								Password
							</label>
							<input
								id="password"
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								type="password"
								placeholder="Create a password"
								className="w-full h-12 sm:h-14 px-4 rounded-xl border-2 border-graphite text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan bg-midnight text-text-primary placeholder-secondary transition-all"
							/>
						</div>

						<div>
							<label htmlFor="confirmPassword" className="block text-sm font-semibold text-text-primary mb-2">
								Confirm Password
							</label>
							<input
								id="confirmPassword"
								onChange={(e) => {
									setConfirmPassword(e.target.value);
								}}
								type="password"
								placeholder="Confirm your password"
								className="w-full h-12 sm:h-14 px-4 rounded-xl border-2 border-graphite text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan bg-midnight text-text-primary placeholder-secondary transition-all"
							/>
						</div>

						<button
							onClick={register}
							disabled={isLoading}
							className="w-full h-12 sm:h-14 bg-gradient-to-r from-accent to-cyan text-white font-bold text-base sm:text-lg rounded-xl hover:from-cyan hover:to-accent transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
						>
							{isLoading ? "Creating account..." : "Create Account"}
						</button>

						<div className="text-center mt-6 sm:mt-8">
							<p className="text-sm sm:text-base text-secondary">
								Already have an account?{" "}
								<Link to="/login" className="text-cyan font-semibold hover:text-accent transition-colors">
									Sign in
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
            {isLoading && <Loader />}
		</div>
	);
}