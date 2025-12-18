import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductPage from "./productPage";
import ProductOverview from "./productOverview";
import CartPage from "./cart";
import CheckoutPage from "./checkOut";
import OrdersPage from "./ordersPage";
import Home from "./admin/homeContent";
import AboutPage from "./aboutPage";
import ContactPage from "./contactPage";

export default function HomePage(){
    return(
        <div className="w-full min-h-screen flex flex-col bg-transparent">
            <Header/>
            <div className="flex-1 w-full bg-transparent">
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/overview/:productID" element={<ProductOverview/>} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/*" element={<h1>Page not found</h1>} />
                </Routes>
            </div>
            <Footer/>
        </div>
    )
}