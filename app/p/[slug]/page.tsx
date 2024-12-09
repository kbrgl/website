import Subscribe from "@/components/subscribe";
import { formatDate } from "@/lib/date";
import { getPost, getPosts } from "@/lib/posts";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
	return getPosts();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const post = await getPost(slug);

	return {
		title: `${post.data.title} · Kabir Goel`,
		description: post.data.subtitle,
	};
}

export default async function Post({
	params,
}: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	let post;
	try {
		post = await getPost(slug);
	} catch (error) {
		notFound();
	}

	const {
		data: { title, subtitle },
		content,
		date,
	} = post;

	return (
		<>
			<p className="text-xs mt-4 text-gray-400 dark:text-zinc-500">
				{formatDate(date)}
			</p>
			<article>
				<h1 className="text-4xl mt-12 font-title font-medium whitespace-pre-line">
					{title}
				</h1>
				<h2 className="text-lg mt-2 text-gray-600 dark:text-zinc-300">
					{subtitle}
				</h2>
				<div
					className="mt-12 markdown"
					dangerouslySetInnerHTML={{ __html: content }}
				/>
			</article>
			<div className="mt-12 dark:bg-zinc-900">
				<div className="h-px mb-16 bg-gradient-to-r from-transparent to-transparent via-gray-200 dark:via-zinc-700" />
				<p className="mb-1.5 text-sm font-semibold">
					Get more like this in your inbox
				</p>
				<Subscribe />
			</div>
		</>
	);
}
