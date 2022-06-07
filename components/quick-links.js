import {
  CollectionIcon,
  GlobeAltIcon,
  SparklesIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

export function QuickLinks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
      <Link href="/portfolio">
        <a className="p-4 bg-[#f2f5fa] text-[#1e5097] rounded-xl">
          <div className="flex space-x-1">
            <p className="mb-1">
              <CollectionIcon className="h-6 w-6" />
            </p>
            <p className="mb-1 md:mb-3 font-medium">Portfolio</p>
          </div>
          <p className="font-normal text-zinc-600 text-sm">
            My projects, including products and open-source code.
          </p>
        </a>
      </Link>
      <Link href="/recently">
        <a className="p-4 bg-[#f2f7f1] text-[#116719] rounded-xl">
          <div className="flex space-x-1">
            <p className="mb-1">
              <SparklesIcon className="h-6 w-6" />
            </p>
            <p className="mb-1 md:mb-3 font-medium">Recently</p>
          </div>
          <p className="font-normal text-zinc-600 text-sm">
            The things I’ve been up to, from projects to clubs to classes.
          </p>
        </a>
      </Link>
      <div className="p-4 bg-amber-50 text-amber-700 rounded-xl">
        <div className="flex space-x-1">
          <p className="mb-1 font-medium">
            <GlobeAltIcon className="h-6 w-6" />
          </p>
          <p className="mb-1 md:mb-3 font-medium">On the Web</p>
        </div>
        <div className="text-zinc-600 text-sm">
          <p>
            Find me on{" "}
            <Link href="https://twitter.com/KabirGoel">
              <a className="link">Twitter</a>
            </Link>
            ,{" "}
            <Link href="https://read.cv/kabirgoel">
              <a className="link">read.cv</a>
            </Link>
            , and{" "}
            <Link href="https://github.com/kbrgl">
              <a className="link">GitHub</a>
            </Link>
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500 md:col-span-3">
        See what I’m{" "}
        <Link href="/spotify">
          <a className="link">listening to</a>
        </Link>{" "}
        &rarr;
      </p>
    </div>
  );
}
