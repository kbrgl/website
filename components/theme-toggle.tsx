"use client";

import { useTheme } from "next-themes";
import Moon from "./icons/moon";
import Sun from "./icons/sun";
import System from "./icons/system";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme, themes } = useTheme();

	const switchTheme = () => {
		if (!theme) {
			setTheme("light");
			return;
		}
		const currentIndex = themes.indexOf(theme);
		const nextIndex = (currentIndex + 1) % themes.length;
		const newTheme = themes[nextIndex];
		setTheme(newTheme);
	};

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<button
			type="button"
			onClick={switchTheme}
			className="group hover:bg-gray-200 hover:dark:bg-zinc-700 rounded-full p-2 transition-colors flex items-center"
		>
			{theme === "light" ? <Sun /> : theme === "dark" ? <Moon /> : <System />}
		</button>
	);
}
