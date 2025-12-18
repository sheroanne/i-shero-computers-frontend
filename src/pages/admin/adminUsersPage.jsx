import axios from "axios";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import Loader from "../../components/loader";
import { GoVerified } from "react-icons/go";

export default function AdminUsersPage() {
	const [users, setUsers] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (!loaded) {
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/users/all", {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				})
				.then((response) => {
					console.log(response.data);
					setUsers(response.data);
					setLoaded(true);
				});
		}
	}, [loaded]);

	return (
		<div
			className="w-full flex justify-center p-10 relative bg-midnight"
		>
			{loaded ? (
				<table
					className="w-full max-w-7xl table-auto border-separate border-spacing-0
        rounded-2xl overflow-hidden shadow-xl bg-graphite border border-accent/20
        "
				>
					<thead className="sticky top-0 z-10">
						<tr className="bg-gradient-to-r from-accent/80 to-cyan/80 text-white">
							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
								Image
							</th>
							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
								Email
							</th>
							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
								First Name
							</th>
							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
								Last Name
							</th>
							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
								Role
							</th>
							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
								status
							</th>
							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"></th>
						</tr>
					</thead>

					<tbody className="divide-y divide-accent/20">
						{users.map((item, index) => {
							return (
								<tr
									key={index}
									className="odd:bg-graphite even:bg-charcoal/50 hover:bg-accent/20 transition-colors border-b border-accent/10"
								>
									<td className="px-4 py-3 align-middle">
										<img
											src={item.image}
											className="w-[38px] h-[38px] rounded-lg object-cover ring-1 ring-accent/30 shadow-sm"
										/>
									</td>
									<td className="px-4 py-3 text-sm font-medium text-text-primary flex flex-row items-center gap-2">
										{item.email} {item.isEmailVerified ? <GoVerified className="text-cyan" /> : ""}
									</td>
									<td className="px-4 py-3 text-sm text-text-primary">{item.firstName}</td>
									<td className="px-4 py-3 text-sm font-semibold text-text-primary">
										{item.lastName}
									</td>
									<td className="px-4 py-3 text-sm font-semibold">
										<span className={`px-2 py-1 rounded ${
											item.role === 'admin' ? 'bg-purple/20 text-purple' : 'bg-secondary/20 text-secondary'
										}`}>
											{item.role}
										</span>
									</td>
									<td className="px-4 py-3 text-sm">
                                        <span className={`px-2 py-1 rounded ${
											item.isBlocked ? 'bg-red-500/20 text-red-400' : 'bg-cyan/20 text-cyan'
										}`}>
											{item.isBlocked ? "Blocked" : "Active"}
										</span>
                                    </td>
									<td className="px-4 py-3 text-sm">
                                        <button
                                            className={`px-3 py-1 rounded-lg transition-colors border ${
												item.isBlocked 
													? 'bg-cyan/30 text-cyan border-cyan/50 hover:bg-cyan/40' 
													: 'bg-red-500/30 text-red-400 border-red-500/50 hover:bg-red-500/40'
											}`}
                                            onClick={
                                                async ()=>{
                                                    await axios.put(import.meta.env.VITE_BACKEND_URL + `/users/toggle-block/${item.email}`,{
                                                        isBlocked: !item.isBlocked
                                                    },
                                                    {
                                                        headers: {  
                                                            Authorization: `Bearer ${localStorage.getItem("token")}`
                                                        }
                                                    });
                                                    setLoaded(false);

                                                }
                                            }   
                                        >
                                            {
                                                item.isBlocked?"Unblock User":"Block User"
                                            }
                                        </button>
                                    </td>
								</tr>
							);
						})}
					</tbody>
				</table>
			) : (
				<Loader />
			)}

			<Link
				to="/admin/add-product"
				className="fixed right-[20px] bottom-[20px] w-[56px] h-[56px]
        flex justify-center items-center text-4xl rounded-full
        bg-gradient-to-r from-accent to-cyan text-white shadow-2xl ring-2 ring-accent/30
        hover:scale-105 hover:shadow-[0_12px_24px_-6px_rgba(59,130,246,0.5)]
        active:scale-95 transition-all"
			>
				<BiPlus />
			</Link>
		</div>
	);
}