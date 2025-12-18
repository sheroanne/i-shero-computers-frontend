// import { useState } from "react";

// export default function Test() {

//     const [count, setCount] = useState(0);
//     const [status, setStatus] = useState("off");



//     return (
//         <div className="w-full h-full flex flex-col justify-center items-center">
//             <div className="w-[400px] h-[300px] shadow-2xl flex justify-center items-center">

//                 <button className="w-[100px] h-[50px] bg-red-600 text-white"
//                     onClick={() => {
//                         setCount(count - 1);
//                     }}>

//                     Decrement
//                 </button>

//                 <h1 className="w-[100px] h-[50px] text-[30px] text-center">{count}</h1>

//                 <button onClick={
//                     () => {
//                         setCount(count + 1)

//                     }
//                 } className="w-[100px] h-[50px] bg-blue-600 text-white">
//                     Increment
//                 </button>
//                 <div>
//                     <div className="w-[400px] h-[300px] shadow-2xl flex justify-center items-center">
//                         <span className=" h-[30px] text-bold">
//                             off
//                         </span>
//                         <div className="w-full h-[50px] bg-blue-900">

//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }