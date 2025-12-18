import { createClient } from "@supabase/supabase-js";

// Updated Supabase project URL and API key
const url = "https://fsbhfodmydfggsgvtopy.supabase.co";
const key =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzYmhmb2RteWRmZ2dzZ3Z0b3B5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1OTAzMTQsImV4cCI6MjA3ODE2NjMxNH0.q_zhiEzaC_aXvM6p0SF1crzu_yKUUfHDclRdsxcEgJo";

const supabase = createClient(url, key);

export default function uploadFile(file) {
	return new Promise((resolve, reject) => {
		const timeStamp = Date.now();
		const fileName = timeStamp + "_" + file.name;
		
		supabase.storage
			.from("images")
			.upload(fileName, file, {
				cacheControl: "3600",
				upsert: false,
			})
			.then((response) => {
				// Check if upload was successful
				if (response.error) {
					console.error("Upload error:", response.error);
					reject(response.error);
					return;
				}
				
				// Get public URL after successful upload
				const { data } = supabase.storage
					.from("images")
					.getPublicUrl(fileName);
				
				if (data && data.publicUrl) {
					resolve(data.publicUrl);
				} else {
					reject(new Error("Failed to get public URL"));
				}
			})
			.catch((error) => {
				console.error("Upload catch error:", error);
				reject(error);
			});
	});
}