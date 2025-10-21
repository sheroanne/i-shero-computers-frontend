import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();

    async function login() {

        console.log("Login button clicked");
        console.log("Email:", email);
        console.log("Password:", password);

        try {
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/login", {
                email: email,
                password: password
            });
            console.log(res)

            localStorage.setItem("token", res.data.token);

            if(res.data.role=="admin"){
                //window.location.href="/admin"
                navigate("/admin")
            }
            else{
                //window.location.href="/"
                navigate("/")
            }
           // alert("Login successful! Welcome :)");
           toast.success("Login successful! Welcome :)");
        } catch (err) {
            console.log("error during login");
            console.log(err);
            //alert("Login failed! Please try again :(");
            toast.error("Login failed! Please try again :(");
        }

    }

    return (
        <div className="w-full h-screen bg-[url('/bg-cover-dark.jpg')] bg-center bg-cover bg-no-repeat flex">
            <div className="w[50%] h-full flex justify-center items-center flex-col p-[50px]">
                <img
                    src="/pc-logo.png"
                    alt="logo"
                    className="w-[200px] h-[200px] mb-[20px] object-cover"
                />
                <h1 className="text-[50px] text-blue text-shadow-accent text-shadow w-2xs text-center font bold">
                    Plug In. Power Up. Play Hard.
                </h1>
                <p className="text-[30px] text-white italic">
                    Your Ultimate destination for Gaming Gear
                </p>
            </div>
            <div className="w[50%] h-full flex justify-center items-center">

                <div className="w-[450px] h-[600px] backdrop-blur lg-shadow 2xl rounded-2xl flex flex-col justify-center items-center p-[30px]">
                    <h1 className="text-[40px] font-bold mb-[20px] text-accent text-shadow-white">Login</h1>
                    <input
                        onChange={
                            (e) => {
                                setEmail(e.target.value)

                            }
                        }
                        type="email"
                        placeholder="Your email"
                        className="w-full rounded-lg border h-[50px] mb-[20px] focus:outline-none focus:ring-2 focus:ring-blue" />
                    <input
                        onChange={
                            (e) => {
                                setPassword(e.target.value)

                            }
                        }
                        type="password"
                        placeholder="Your password"
                        className="w-full rounded-lg border h-[50px] focus:outline-none focus:ring-2 focus:ring-blue" />
                    <p className="text-white not-italic w-full mb-[20px] text-right "> Forget your password?&nbsp;
                        <Link to="/register" className="text-blue italic">
                            Reset it here</Link>
                    </p>
                    <button
                        onClick={login}
                        className="w-full h-[50px] bg-accent text-white font-bold text-[20px] rounded-lg border-[2px] border-accent hover:bg-transparent hover:text-accent">Login</button>

                    <p className="text-white not-italic">Don't have an account?&nbsp;
                        <Link to="/register" className="text-blue italic">
                            Register here</Link>
                    </p>
                </div>

            </div >
        </div >
    )
}