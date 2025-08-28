import ToDoList from "@/components/ToDoList";
import Head from "next/head";

import { Poppins, Montserrat } from "next/font/google";
import { useEffect } from "react";

const montserrat = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin"],
	weight: ["variable"],
});

const poppins = Poppins({
	variable: "--font-poppins",
	subsets: ["latin"],
	weight: ["100", "500", "800"],
});

export default function Home() {
	return (
		<>
			<Head>
				<title>List-It</title>
			</Head>
			<div className={`${poppins.className} flex flex-col gap-6 p-8`}>
				<h1 className="text-4xl">List-It</h1>
				<div>
					<ToDoList />
				</div>
			</div>
		</>
	);
}
