import Subscribe from "@/components/subscribe";
import { formatDate } from "@/lib/date";
import { getPostsByYear } from "@/lib/posts";

export default async function Home() {
	const postsByYear = await getPostsByYear();

	return (
		<>
			<section className="mt-24 mb-8 grid gap-2">
				<h1 className="text-4xl font-medium font-title dark:text-white max-w-xl">
					Hey, I'm Kabir! I live in San Francisco, where I engineer products at{" "}
					<a href="https://cartesia.ai">Cartesia</a>.
				</h1>
				<div className="text-gray-600 dark:text-gray-300 markdown max-w-xl">
					<p>
						I recently graduated from UC Berkeley, where I earned a degree in
						Computer Science with Honors and a minor in Public Policy.
					</p>
					<p>
						Before joining Cartesia, I was an AI/UX engineer at{" "}
						<a
							href="https://symbolic.ai"
							className="text-blue-800 dark:text-blue-300"
						>
							Symbolic
						</a>
						, where I built AI tools for journalists.
					</p>
				</div>
			</section>

			<Subscribe />
			<p className="mt-1.5 text-xs text-gray-500 dark:text-zinc-400">
				Or follow on{" "}
				<a href="https://twitter.com/KabirGoel" className="border-b">
					Twitter
				</a>
			</p>

			<div className="space-y-12 my-24">
				{postsByYear
					.slice()
					.reverse()
					.map(([year, posts]) => (
						<section key={year}>
							<h2 className="flex items-center space-x-4 mb-8">
								<span className="font-semibold">{year}</span>
								<span className="h-px bg-gradient-to-r from-transparent to-gray-200 dark:to-zinc-700 flex-1" />
							</h2>
							<div className="grid gap-6 max-w-screen-sm">
								{posts
									.slice()
									.reverse()
									.map((post) => (
										<a
											key={post.data.title}
											href={`/p/${post.slug}`}
											className="grid group gap-1"
										>
											<h3 className="leading-tight text-lg font-semibold text-blue-800 dark:text-blue-300 group-hover:text-amber-500 dark:group-hover:text-yellow-500 transition-colors">
												{post.data.title}
											</h3>
											<p className="text-gray-500 dark:text-zinc-400">
												{post.data.subtitle}
											</p>
											<p className="text-gray-500 dark:text-zinc-400 font-sans whitespace-nowrap text-sm">
												{formatDate(post.data.date)}
											</p>
										</a>
									))}
							</div>
						</section>
					))}
			</div>
		</>
	);
}
