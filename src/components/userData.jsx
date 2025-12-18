import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserData(){
    const [user, setUser] = useState(null);
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token != null){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/users/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response)=>{
                setUser(response.data);
            }).catch(()=>{
                setUser(null);
            })
        }
    },[])
    const [selectedOption, setSelectedOption] = useState("user");

    return (
        <>
            {
                user?
                <div className="w-[150px] flex flex-row">
                    <img src={user.image} referrerPolicy="no-referrer" className="w-[50px] rounded-full h-[50px]"/>
                    <select className="bg-transparent outline-none ml-2 mt- text-white" value={selectedOption}
                     onChange={
                        (e)=>{
                            
                            if(e.target.value == "logout"){
                                localStorage.removeItem("token");
                                window.location.href = "/login";
                            }else if(e.target.value == "my-orders"){
                                window.location.href = "/orders";
                            }
                            setSelectedOption("user")
                        }
                    }>
                        <option className="bg-accent" value={"user"}>{user.firstName}</option>
                        <option className="bg-accent" value={"logout"}>Logout</option>
                        <option className="bg-accent" value={"my-orders"}>My Orders</option>
                    </select>
                </div>:
                <div className="flex flex-row items-center gap-2 sm:gap-3">
                    <Link 
                        to="/login" 
                        className="px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-accent to-cyan text-white font-semibold rounded-lg hover:from-cyan hover:to-accent transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
                    >
                        Login
                    </Link>
                    <Link 
                        to="/register" 
                        className="px-4 py-2 sm:px-5 sm:py-2.5 border-2 border-accent/50 text-accent font-semibold rounded-lg hover:bg-gradient-to-r hover:from-accent hover:to-cyan hover:text-white hover:border-transparent transition-all text-sm sm:text-base"
                    >
                        Register
                    </Link>
                </div>
            }
        </>
    )


}