import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import AdminPage from "./pages/adminPage";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ForgetPasswordPage from "./pages/forgetPasswordPage";

//475942806132-vupbd8t35n3fqrh98rjormcdfvrcso5o.apps.googleusercontent.com

function App() {
	return (
		<GoogleOAuthProvider clientId="475942806132-vupbd8t35n3fqrh98rjormcdfvrcso5o.apps.googleusercontent.com">
			<BrowserRouter>
				<Toaster position="top-right" />
				<div 
					className="w-full min-h-screen text-text-primary relative"
					style={{
						backgroundImage: 'url(/background.png)',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						backgroundAttachment: 'fixed'
					}}
				>
					<div className="absolute inset-0 bg-midnight/40 z-0"></div>
					<div className="relative z-10 w-full min-h-screen">
						<Routes path="/">
						<Route path="/*" element={<HomePage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/admin/*" element={<AdminPage />} />
						<Route path="/forgot-password" element={<ForgetPasswordPage />} />
						</Routes>
					</div>
				</div>
			</BrowserRouter>
		</GoogleOAuthProvider>
	);
}

export default App;