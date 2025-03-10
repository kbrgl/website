"use client";

export default function Footer() {
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<footer className="mt-16 pt-4 flex flex-col gap-4 text-sm">
			<div className="h-px bg-linear-to-r from-transparent to-transparent via-gray-200 dark:via-zinc-700" />
			<div className="flex justify-between items-center text-gray-500 dark:text-zinc-400">
				<a href="https://twitter.com/KabirGoel">© Kabir Goel</a>
				<div className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
					<a href="https://github.com/kbrgl">GitHub</a>
					<a href="https://twitter.com/KabirGoel">Twitter</a>
				</div>
			</div>
			<button
				type="button"
				onClick={scrollToTop}
				className="text-gray-700 dark:text-zinc-200 bg-gray-200 dark:bg-zinc-800 p-4 rounded-xl font-semibold"
			>
				&nbsp;Back to top ↑
			</button>
		</footer>
	);
}
