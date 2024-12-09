export default function Subscribe() {
	return (
		<form
			action="https://buttondown.email/api/emails/embed-subscribe/kabir"
			method="POST"
			className="sm:flex-row sm:space-x-2 sm:space-y-0 flex flex-col items-stretch space-y-2 max-w-md text-sm"
		>
			<label htmlFor="email" className="w-full">
				<input
					id="email"
					type="email"
					name="email"
					placeholder="Your email address"
					className="rounded-none border py-1 px-2 w-full bg-white dark:bg-zinc-800 placeholder:text-gray-500 dark:placeholder:text-zinc-400 shadow-inner"
				/>
			</label>
			<button
				type="submit"
				value="Subscribe"
				className="py-1 px-5 border font-semibold bg-white dark:bg-zinc-800"
			>
				Subscribe
			</button>
		</form>
	);
}
