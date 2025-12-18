import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import { FiMail, FiPhone, FiMessageCircle, FiClock } from "react-icons/fi";

export default function AdminContactsPage() {
	const [contacts, setContacts] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (!loaded) {
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/contacts/all", {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				})
				.then((response) => {
					console.log(response.data);
					setContacts(response.data);
					setLoaded(true);
				})
				.catch((error) => {
					console.error("Error fetching contacts:", error);
					setLoaded(true);
				});
		}
	}, [loaded]);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<div className="w-full flex justify-center p-4 sm:p-6 md:p-10 relative bg-midnight">
			{loaded ? (
				<div className="w-full max-w-7xl">
					{contacts.length === 0 ? (
						<div className="text-center py-20">
							<FiMessageCircle className="text-6xl text-secondary mx-auto mb-4" />
							<h2 className="text-2xl font-bold text-text-primary mb-2">
								No Contact Submissions Yet
							</h2>
							<p className="text-secondary">
								Contact form submissions will appear here.
							</p>
						</div>
					) : (
						<div className="space-y-4">
							{contacts.map((contact, index) => (
								<div
									key={index}
									className="bg-graphite border border-accent/20 rounded-xl p-6 hover:border-cyan/50 transition-all shadow-lg"
								>
									<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
										<div className="flex-1">
											<div className="flex items-center gap-3 mb-3">
												<h3 className="text-xl font-bold text-text-primary">
													{contact.name}
												</h3>
												<span className="text-sm text-secondary flex items-center gap-1">
													<FiClock className="text-cyan" />
													{formatDate(contact.createdAt)}
												</span>
											</div>
											<div className="space-y-2">
												<div className="flex items-center gap-2 text-secondary">
													<FiMail className="text-cyan" />
													<a
														href={`mailto:${contact.email}`}
														className="text-cyan hover:text-accent transition-colors"
													>
														{contact.email}
													</a>
												</div>
												{contact.phone && (
													<div className="flex items-center gap-2 text-secondary">
														<FiPhone className="text-cyan" />
														<a
															href={`tel:${contact.phone}`}
															className="text-cyan hover:text-accent transition-colors"
														>
															{contact.phone}
														</a>
													</div>
												)}
												<div className="mt-3">
													<span className="text-sm font-semibold text-cyan uppercase tracking-wider">
														Subject:
													</span>
													<p className="text-text-primary font-medium mt-1">
														{contact.subject}
													</p>
												</div>
											</div>
										</div>
									</div>
									<div className="mt-4 pt-4 border-t border-accent/20">
										<div className="flex items-start gap-2">
											<FiMessageCircle className="text-cyan mt-1 flex-shrink-0" />
											<p className="text-secondary leading-relaxed whitespace-pre-wrap">
												{contact.message}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			) : (
				<Loader />
			)}
		</div>
	);
}

