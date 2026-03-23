import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";

import "@src/styles/global.css";

import { AppProvider } from "@src/contexts";
import { Header } from "@src/widgets";
import { Footer } from "@src/widgets";
import { ReactNode } from 'react';

const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-space",
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-jetbrains",
});

export const metadata: Metadata = {
	title: "Christopher Rieffel — RiCo | Dev · Cyber · AI",
	description:
		"Portfolio of Christopher Rieffel (RiCo) — Developer, Cybersecurity & AI enthusiast based in Grand-Est, France.",
	keywords: [
		"developer",
		"cybersecurity",
		"AI",
		"portfolio",
		"OSINT",
		"full-stack",
	],
	authors: [{ name: "Christopher Rieffel" }],
	openGraph: {
		title: "Christopher Rieffel — RiCo",
		description: "Developer · Cybersecurity · AI",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<html
			lang="en"
			data-theme="dark"
			data-profile="hybrid"
			className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full`}
			suppressHydrationWarning
		>
			<body className="min-h-full flex flex-col bg-bg text-text-primary">
				<AppProvider>
					<Header />
					<main className="flex-1 pt-(--header-height)">{children}</main>
					<Footer />
				</AppProvider>
			</body>
		</html>
	);
}
