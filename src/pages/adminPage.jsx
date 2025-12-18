import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { LuBoxes, LuClipboardList } from "react-icons/lu";
import { FiUsers, FiLogOut, FiMessageCircle } from "react-icons/fi";
import { MdOutlineRateReview } from "react-icons/md";
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
				<div className="w-[300px] bg-charcoal h-full shadow-xl border-r border-graphite flex-shrink-0">
					<div className="w-full h-[100px] flex items-center text-text-primary px-4 border-b border-graphite">
						<img src="/pc-logo.png" className="h-full" />
						<h1 className="text-2xl font-bold">Admin</h1>
					</div>
					<div className="w-full h-[calc(100%-100px)] text-text-primary text-2xl flex flex-col pl-[20px] pt-[20px] overflow-y-auto">
						<Link
							to="/admin"
							className="w-full flex items-center h-[50px] gap-[10px] hover:bg-graphite rounded-lg px-2 transition-all font-medium"
						>
							{" "}
							<LuClipboardList />
							Orders
						</Link>
						<Link
							to="/admin/products"
							className="w-full flex items-center h-[50px] gap-[10px] hover:bg-graphite rounded-lg px-2 transition-all font-medium"
						>
							{" "}
							<LuBoxes />
							Products
						</Link>
						<Link
							to="/admin/users"
							className="w-full flex items-center h-[50px] gap-[10px] hover:bg-graphite rounded-lg px-2 transition-all font-medium"
						>
							<FiUsers />
							Users
						</Link>
						<Link
							to="/admin/reviews"
							className="w-full flex items-center h-[50px] gap-[10px] hover:bg-graphite rounded-lg px-2 transition-all font-medium"
						>
							<MdOutlineRateReview />
							Reviews
						</Link>
						<Link
							to="/admin/contacts"
							className="w-full flex items-center h-[50px] gap-[10px] hover:bg-graphite rounded-lg px-2 transition-all font-medium"
						>
							<FiMessageCircle />
							Contacts
						</Link>
						<button
							onClick={handleLogout}
							className="w-full flex items-center h-[50px] gap-[10px] text-left hover:bg-graphite rounded-lg px-2 transition-all font-medium"
						>
							<FiLogOut />
							Logout
						</button>
					</div>
				</div>
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