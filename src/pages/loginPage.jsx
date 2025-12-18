import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { GrGoogle } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/loader";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const googleLogin = useGoogleLogin({
		onSuccess: (response) => { 
			setIsLoading(true);
			axios.post(import.meta.env.VITE_BACKEND_URL + "/users/google-login", {
				token: response.access_token,
			}).then((res) => {
				localStorage.setItem("token", res.data.token);
				if (res.data.role == "admin") {
					navigate("/admin");
				} else {
					navigate("/");
				}
				toast.success("Login successful!.");
				setIsLoading(false);
			}).catch((err) => {
				console.log(err);
			});
			setIsLoading(false);
		 },
		onError: () => { toast.error("Google Login Failed"); },
		onNonOAuthError: () => { toast.error("Google Login Failed"); },
	})

	async function login() {
		console.log("Login button clicked");
		console.log("Email:", email);
		console.log("Password:", password);
		setIsLoading(true);
		try {
			const res = await axios.post(
				import.meta.env.VITE_BACKEND_URL + "/users/login",
				{
					email: email,
					password: password,
				}
			);

			console.log(res.data.token);

			localStorage.setItem("token", res.data.token);
			console.log();
			if (res.data.role == "admin") {
				//window.location.href = "/admin";
				navigate("/admin");
			} else {
				//window.location.href = "/";
				navigate("/");
			}

			//alert("Login successful! Welcome back.");

			toast.success("Login successful! Welcome back.");
			setIsLoading(false);
		} catch (err) {
			//alert("Login failed! Please check your credentials and try again.");
			toast.error("Login failed! Please check your credentials and try again.");

			console.log("Error during login:");
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

			{/* Right side - Login Form */}
			<div className="w-full lg:w-1/2 min-h-screen flex justify-center items-center p-4 sm:p-6 md:p-8 relative z-10">
				<div className="w-full max-w-md backdrop-blur-lg shadow-2xl rounded-2xl flex flex-col justify-center p-6 sm:p-8 md:p-10 bg-charcoal/95 border border-graphite/50">
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
						Welcome Back
					</h1>
					
					<div className="space-y-4 sm:space-y-5">
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
								placeholder="Enter your password"
								className="w-full h-12 sm:h-14 px-4 rounded-xl border-2 border-graphite text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan bg-midnight text-text-primary placeholder-secondary transition-all"
							/>
						</div>

						<div className="flex justify-end">
							<Link 
								to="/forgot-password" 
								className="text-sm sm:text-base text-cyan hover:text-accent transition-colors"
							>
								Forgot password?
							</Link>
						</div>

						<button
							onClick={login}
							disabled={isLoading}
							className="w-full h-12 sm:h-14 bg-gradient-to-r from-accent to-cyan text-white font-bold text-base sm:text-lg rounded-xl hover:from-cyan hover:to-accent transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? "Logging in..." : "Login"}
						</button>

						<div className="relative my-4 sm:my-6">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-graphite"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-4 bg-charcoal text-secondary">Or continue with</span>
							</div>
						</div>

						<button 
							onClick={googleLogin}
							disabled={isLoading}
							className="w-full h-12 sm:h-14 border-2 border-accent/50 text-accent font-bold text-base sm:text-lg rounded-xl hover:bg-gradient-to-r hover:from-accent hover:to-cyan hover:text-white hover:border-transparent transition-all bg-midnight/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<GrGoogle className="text-xl" />
							Google
						</button>

						<div className="text-center mt-6 sm:mt-8">
							<p className="text-sm sm:text-base text-secondary">
								Don't have an account?{" "}
								<Link to="/register" className="text-cyan font-semibold hover:text-accent transition-colors">
									Sign up
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