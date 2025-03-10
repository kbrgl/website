import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Cells from "@/components/cells";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Kabir Goel",
	description: "The website and blog of Kabir Goel.",
	openGraph: {
		title: "Kabir Goel",
		description: "The website and blog of Kabir Goel.",
		url: "https://kabirgoel.com",
		siteName: "Kabir Goel",
		type: "website",
		images: [
			{
				url: "https://kabirgoel.com/preview.png",
				width: 1200,
				height: 630,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Kabir Goel",
		description: "The website and blog of Kabir Goel.",
		images: [
			{
				url: "https://kabirgoel.com/preview.png",
				width: 1200,
				height: 630,
			},
		],
	},
	alternates: {
		canonical: "https://kabirgoel.com",
		types: {
			"application/atom+xml": "https://kabirgoel.com/feed.xml",
			"application/json": "https://kabirgoel.com/feed.json",
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />

				<link rel="stylesheet" href="/prism-theme.css" />
				<link rel="stylesheet" href="https://use.typekit.net/fdo8xxu.css" />
				<link rel="stylesheet" href="/app.css" />
			</head>
			<body
				className="bg-white text-gray-900 dark:bg-zinc-900 dark:text-white"
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					disableTransitionOnChange
				>
					<Cells />
					<div className="max-w-(--breakpoint-md) mx-auto py-12 px-4">
						<Navbar />
						<main>{children}</main>
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
