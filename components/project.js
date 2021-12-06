import Link from "next/link";

export default function Project({ project }) {
  const { name, description, slug, link, image } = project;

  return (
    <Link href={link || `/p/${slug}`}>
      <a className="block">
        <div className="flex border-t border-t-accent">
          <img
            className="self-start mr-3"
            src={`/projects/${image}`}
            alt=""
            width={175}
          />
          <p className="my-3">
            <strong className="font-medium">{name}</strong>
            <span className="ml-1">{description}</span>
          </p>
        </div>
      </a>
    </Link>
  );
}
