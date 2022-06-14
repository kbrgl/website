import Link from "next/link";

export default function Project({ project }) {
  const { name, description, slug, link, image } = project;

  return (
    <Link href={link || `/p/${slug}`}>
      <a className="flex bg-gray-50 overflow-hidden rounded-xl group hover:bg-cyan-500 transition-colors hover:text-white min-h-[150px]">
        <img
          className="absolute w-36 object-cover rounded-xl group-hover:rotate-0 rotate-2 md:self-center shadow-sm border-2 border-gray-200 group-hover:border-cyan-600 origin-top-right transition-transform -translate-y-1 translate-x-4 md:translate-y-0 md:-translate-x-4"
          src={`/projects/${image}`}
          alt=""
        />
        <div className="p-5 text-md mt-28 md:mt-0 md:ml-32">
          <p className="font-medium">
            {name}&nbsp;
            <span className="group-hover:ml-2 transition-[margin]">&rarr;</span>
          </p>
          <p className="text-gray-500 group-hover:text-white transition-colors">
            {description}
          </p>
        </div>
      </a>
    </Link>
  );
}
