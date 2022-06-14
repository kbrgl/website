import Link from "next/link";

export default function Post({ post }) {
  return (
    <Link href={`/p/${post.slug}`} key={post.slug}>
      <a
        className="block p-5 bg-gray-50 hover:text-white hover:bg-accent transition-colors rounded-xl group"
        key={post.slug}
      >
        <p className="text-lg font-medium mb-1">
          {post.title}&nbsp;
          <span className="group-hover:ml-2 transition-[margin]">&rarr;</span>
        </p>
        <p className="text-gray-500 group-hover:text-white transition-colors pb-2">
          {post.subtitle}
        </p>
        <p className="text-sm text-gray-500 group-hover:text-white transition-colors">
          {post.date}
        </p>
      </a>
    </Link>
  );
}
