import { Link } from "react-router-dom";


export default function Header(){
    return(
        <header className="w-full h-[100px] bg-accent flex">
            <img src="pc-logo.png" className="w-[50px] h-[50px] mr-3 mt-3" alt="logo" />
            <div className="w-full h-full flex text-xl text-primary justify-center items-center gap-[30px]">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </div>
            {/* <UserData/> */}
        </header>
    )
}