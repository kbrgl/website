import projects from "@/data/projects.json";

export default function Projects() {
	return (
		<>
			<h1 className="text-4xl my-12 font-title font-medium dark:text-white">
				Projects
			</h1>
			<div className="grid gap-8 max-w-md">
				{projects.map((project) => (
					<section
						key={`${project.date}-${project.name}`}
						className="space-y-0.5"
					>
						<a href={project.link}>
							<h2 className="font-semibold text-lg text-blue-800 dark:text-blue-300 hover:text-amber-500 hover:dark:text-yellow-500 transition-colors">
								{project.name}
								<span className="font-sans text-gray-400 dark:text-zinc-500 text-sm pl-2 font-normal">
									{project.date.split(" ")[2]}
								</span>
							</h2>
						</a>
						<p className="text-gray-500 dark:text-zinc-400">
							{project.description}
						</p>
					</section>
				))}
			</div>
		</>
	);
}
