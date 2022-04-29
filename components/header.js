import Link from "next/link";
import Container from "./container";

export function NavbarLink({ internal = false, href, children }) {
  const link = (
    <a
      href={internal ? "#" : href}
      target={!internal ? "_blank" : undefined}
      rel="noreferrer"
      className="hover:text-accent transition-colors duration-200"
    >
      {children} {!internal && "↗"}
    </a>
  );
  if (internal) {
    return <Link href={href}>{link}</Link>;
  }
  return link;
}

export default function Header() {
  return (
    <nav className="bg-[#fafafacc] backdrop-blur-lg border-b border-black py-4">
      <Container className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
        <div>
          <Link href="/">
            <a className="font-bold">Kabir Goel</a>
          </Link>
        </div>
        <div className="space-x-4 font-medium text-sm flex">
          <Link href="/portfolio">
            <a className="text-gray-500 flex items-center space-x-1">
              <span>Portfolio</span>
            </a>
          </Link>
          <Link href="/recently">
            <a className="text-gray-500 flex items-center space-x-1">
              <span>Recently</span>
            </a>
          </Link>
        </div>
      </Container>
    </nav>
  );
}
