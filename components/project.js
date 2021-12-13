import Link from "next/link";

export default function Project({ project }) {
  const { name, description, slug, link, image } = project;

  return (
    <Link href={link || `/p/${slug}`}>
      <a className="block">
        <div className="flex flex-col md:flex-row border-t md:border transition-shadow md:hover:shadow">
          <img
            className="self-start"
            width={175}
            src={`/projects/${image}`}
            alt=""
          />
          <p className="mt-4 md:m-4">
            <strong className="font-medium">{name}</strong>
            <span className="ml-1">{description}</span>
          </p>
        </div>
      </a>
    </Link>
  );
}
