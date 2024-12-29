import NavbarLogo from "./icons/navbar-logo";
import ThemeToggle from "./theme-toggle";

export default function Navbar() {
	return (
		<nav className="flex justify-between flex-col md:flex-row md:items-center text-gray-700 dark:text-zinc-200 md:space-x-8 pb-2">
			<a
				href="/"
				className="text-black dark:text-white font-semibold flex items-center gap-1"
			>
				<NavbarLogo />
				Kabir Goel
			</a>
			<div className="flex items-center justify-between flex-1 mt-1 md:mt-0">
				<ul className="flex items-baseline space-x-4 text-sm overflow-x-auto">
					<li>
						<a
							href="/projects"
							className="hover:text-amber-500 hover:dark:text-yellow-500 transition-colors"
						>
							Projects
						</a>
					</li>
					<li>
						<a
							href="https://notes.kabirgoel.com"
							className="hover:text-amber-500 hover:dark:text-yellow-500 transition-colors"
						>
							Notes
						</a>
					</li>
				</ul>
				<ThemeToggle />
			</div>
		</nav>
	);
}
