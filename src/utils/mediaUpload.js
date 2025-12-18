import { createClient } from "@supabase/supabase-js";

const url = "https://gtspnhugwkdjsxpvvafq.supabase.co";
const key =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0c3BuaHVnd2tkanN4cHZ2YWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMTA0MjEsImV4cCI6MjA3NzU4NjQyMX0.wP4ppiL0XYn7ARQfxnTx54bjs3BO_7uFfjHQmeHi8RM";

const supabase = createClient(url, key);

export default function uploadFile(file) {
	return new Promise((resolve, reject) => {
		const timeStamp = Date.now();
		const fileName = timeStamp + "_" + file.name;
		supabase.storage.from("images").upload(fileName, file, {
			cacheControl: "3600",
			upsert: false,
		}).then(
            ()=>{
                const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
                resolve(publicUrl);
            }
        ).catch((error)=>{
            reject(error);
        })
	});
}