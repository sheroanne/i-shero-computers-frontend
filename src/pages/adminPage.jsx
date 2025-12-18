import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { LuBoxes, LuClipboardList } from "react-icons/lu";
import { FiUsers, FiLogOut, FiMessageCircle } from "react-icons/fi";
import { MdOutlineRateReview } from "react-icons/md";
import { LuListCollapse } from "react-icons/lu";
import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductPage from "./admin/adminAddProductPage";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/loader";
import AdminUsersPage from "./admin/adminUsersPage";
import AdminReviewsPage from "./admin/adminReviewsPage";
import AdminContactsPage from "./admin/adminContactsPage";
import toast from "react-hot-toast";
export default function AdminPage() {
    const [user, setUser] = useState(null);
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token == null){
            window.location.href = "/";
            return;
        }
        axios.get(import.meta.env.VITE_BACKEND_URL + "/users/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response)=>{
            if(response.data.role == "admin"){
                setUser(response.data);
            }else{
                window.location.href = "/";
            }
        }).catch(()=>{
            window.location.href = "/login";
        })
    },[])

    function handleLogout() {
        localStorage.removeItem("token");
        toast.success("Logged out successfully");
        navigate("/login");
    }
	return (
		<div className="w-full h-screen flex bg-midnight fixed inset-0">
            {user ?
			<>
				{/* Mobile Menu Button */}
				<button
					onClick={() => setSideBarOpen(true)}
					className="lg:hidden fixed top-4 left-4 z-50 w-12 h-12 bg-charcoal border border-graphite rounded-lg flex items-center justify-center text-text-primary hover:bg-graphite transition-all shadow-lg"
				>
					<LuListCollapse className="text-2xl" />
				</button>

				{/* Sidebar - Hidden on mobile, shown on desktop */}
				<div className={`${sideBarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static w-[280px] sm:w-[300px] bg-charcoal h-full shadow-xl border-r border-graphite flex-shrink-0 z-40 transition-transform duration-300`}>
					<div className="w-full h-[100px] flex items-center justify-between text-text-primary px-4 border-b border-graphite">
						<div className="flex items-center gap-2">
							<img src="/pc-logo.png" className="h-full max-h-[80px]" alt="logo" />
							<h1 className="text-xl sm:text-2xl font-bold">Admin</h1>
						</div>
						<button
							onClick={() => setSideBarOpen(false)}
							className="lg:hidden text-text-primary hover:text-cyan transition-colors"
						>
							<LuListCollapse className="text-2xl rotate-180" />
						</button>
					</div>
					<div className="w-full h-[calc(100%-100px)] text-text-primary text-lg sm:text-xl lg:text-2xl flex flex-col pl-4 sm:pl-5 lg:pl-[20px] pt-4 sm:pt-5 lg:pt-[20px] overflow-y-auto">
						<Link
							to="/admin"
							onClick={() => setSideBarOpen(false)}
							className="w-full flex items-center h-[50px] gap-[10px] hover:bg-graphite rounded-lg px-2 transition-all font-medium"
						>
							<LuClipboardList />
							Orders
						</Link>
						<Link
							to="/admin/products"
							onClick={() => setSideBarOpen(false)}
							className="w-full flex items-center h-[50px] gap-[10px] hover:bg-graphite rounded-lg px-2 transition-all font-medium"
						>
							<LuBoxes />
							Products
						</Link>
						<Link
							to="/admin/users"
							onClick={() => setSideBarOpen(false)}
							className="w-full flex items-center h-[50px] gap-[10px] hover:bg-graphite rounded-lg px-2 transition-all font-medium"
						>
							<FiUsers />
							Users
						</Link>
						<Link
							to="/admin/reviews"
							onClick={() => setSideBarOpen(false)}
							className="w-full flex items-center h-[50px] gap-[10px] hover:bg-graphite rounded-lg px-2 transition-all font-medium"
						>
							<MdOutlineRateReview />
							Reviews
						</Link>
						<Link
							to="/admin/contacts"
							onClick={() => setSideBarOpen(false)}
							className="w-full flex items-center h-[50px] gap-[10px] hover:bg-graphite rounded-lg px-2 transition-all font-medium"
						>
							<FiMessageCircle />
							Contacts
						</Link>
						<button
							onClick={() => {
								handleLogout();
								setSideBarOpen(false);
							}}
							className="w-full flex items-center h-[50px] gap-[10px] text-left hover:bg-graphite rounded-lg px-2 transition-all font-medium mt-auto mb-4"
						>
							<FiLogOut />
							Logout
						</button>
					</div>
				</div>

				{/* Overlay for mobile */}
				{sideBarOpen && (
					<div
						className="lg:hidden fixed inset-0 bg-black/70 z-30"
						onClick={() => setSideBarOpen(false)}
					/>
				)}

				<div className="flex-1 h-full bg-midnight overflow-y-auto">
					<Routes>
						<Route path="/" element={<AdminOrdersPage />} />
						<Route path="/products" element={<AdminProductsPage />} />
						<Route path="/add-product" element={<AdminAddProductPage />} />
						<Route
							path="/update-product"
							element={<AdminUpdateProductPage />}
						/>
						<Route path="/users" element={<AdminUsersPage />} />
						<Route path="/reviews" element={<AdminReviewsPage />} />
						<Route path="/contacts" element={<AdminContactsPage />} />
					</Routes>
				</div>
			</>:
            <Loader />
}
		</div>
	);
}