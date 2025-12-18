import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/loader";
import { useNavigate, Link } from "react-router-dom";

export default function ForgetPasswordPage() {
	const [otpSent, setOtpSent] = useState(false);
	const [loading, setLoading] = useState(false);
	const [otp, setOtp] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	async function resetPassword() {
		if (newPassword !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}
		setLoading(true);
		try {
			await axios.post(
				import.meta.env.VITE_BACKEND_URL + "/users/validate-otp",
				{
					email: email,
					otp: otp,
					newPassword: newPassword,
				}
			);
			toast.success("Password reset successful");
			setLoading(false);
			navigate("/login");
		} catch (err) {
			console.log(err);
			toast.error("Error resetting password. Try again later");
			setLoading(false);
		}
	}

	async function sendOtp() {
		setLoading(true);
		try {
			await axios.get(
				import.meta.env.VITE_BACKEND_URL + "/users/send-otp/" + email
			);
			toast.success("OTP sent to your email");
			setLoading(false);
			setOtpSent(true);
		} catch (err) {
			console.log(err);
			toast.error("Error sending OTP Try again later");
			setLoading(false);
		}
	}

	return (
		<div className="w-full min-h-screen bg-[url('/bg-cover.jpg')] bg-center bg-cover bg-no-repeat bg-fixed relative flex flex-col justify-center items-center p-4 sm:p-6">
			{/* Background overlay */}
			<div className="absolute inset-0 bg-midnight/80 z-0"></div>
			
			{loading && <Loader />}
			
			{otpSent ? (
				<div className="w-full max-w-md backdrop-blur-lg shadow-2xl rounded-2xl flex flex-col p-6 sm:p-8 md:p-10 bg-charcoal/95 border border-graphite/50 relative z-10">
					<div className="text-center mb-6">
						<h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
							Reset Password
						</h2>
						<p className="text-sm sm:text-base text-secondary">
							Enter the OTP sent to your email and create a new password
						</p>
					</div>
					
					<div className="space-y-4 sm:space-y-5">
						<div>
							<label htmlFor="otp" className="block text-sm font-semibold text-text-primary mb-2">
								OTP Code
							</label>
							<input
								id="otp"
								type="text"
								placeholder="Enter 6-digit OTP"
								className="w-full h-12 sm:h-14 px-4 rounded-xl border-2 border-graphite text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan bg-midnight text-text-primary placeholder-secondary transition-all"
								onChange={(e) => setOtp(e.target.value)}
								maxLength={6}
							/>
						</div>
						
						<div>
							<label htmlFor="newPassword" className="block text-sm font-semibold text-text-primary mb-2">
								New Password
							</label>
							<input
								id="newPassword"
								type="password"
								placeholder="Enter new password"
								className="w-full h-12 sm:h-14 px-4 rounded-xl border-2 border-graphite text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan bg-midnight text-text-primary placeholder-secondary transition-all"
								onChange={(e) => setNewPassword(e.target.value)}
							/>
						</div>
						
						<div>
							<label htmlFor="confirmNewPassword" className="block text-sm font-semibold text-text-primary mb-2">
								Confirm New Password
							</label>
							<input
								id="confirmNewPassword"
								type="password"
								placeholder="Confirm new password"
								className="w-full h-12 sm:h-14 px-4 rounded-xl border-2 border-graphite text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan bg-midnight text-text-primary placeholder-secondary transition-all"
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</div>
						
						<button
							onClick={resetPassword}
							disabled={loading}
							className="w-full h-12 sm:h-14 bg-gradient-to-r from-accent to-cyan text-white font-bold text-base sm:text-lg rounded-xl hover:from-cyan hover:to-accent transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{loading ? "Resetting..." : "Reset Password"}
						</button>
						
						<button
							onClick={() => {
								setOtpSent(false);
								setOtp("");
								setNewPassword("");
								setConfirmPassword("");
							}}
							className="w-full text-sm text-secondary hover:text-cyan transition-colors"
						>
							Back to email entry
						</button>
					</div>
				</div>
			) : (
				<div className="w-full max-w-md backdrop-blur-lg shadow-2xl rounded-2xl flex flex-col p-6 sm:p-8 md:p-10 bg-charcoal/95 border border-graphite/50 relative z-10">
					<div className="text-center mb-6">
						<h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
							Forgot Password?
						</h2>
						<p className="text-sm sm:text-base text-secondary">
							No worries! Enter your email address and we'll send you an OTP to reset your password.
						</p>
					</div>
					
					<div className="space-y-5">
						<div>
							<label htmlFor="email" className="block text-sm font-semibold text-text-primary mb-2">
								Email Address
							</label>
							<input
								id="email"
								type="email"
								placeholder="Enter your email"
								className="w-full h-12 sm:h-14 px-4 rounded-xl border-2 border-graphite text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-cyan focus:border-cyan bg-midnight text-text-primary placeholder-secondary transition-all"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						
						<button
							onClick={sendOtp}
							disabled={loading}
							className="w-full h-12 sm:h-14 bg-gradient-to-r from-accent to-cyan text-white font-bold text-base sm:text-lg rounded-xl hover:from-cyan hover:to-accent transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{loading ? "Sending..." : "Send OTP"}
						</button>
						
						<div className="text-center">
							<Link
								to="/login"
								className="text-sm text-secondary hover:text-cyan transition-colors"
							>
								Back to login
							</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}