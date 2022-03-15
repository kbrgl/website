import Link from "next/link";
import Visualization from "./visualization";
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

export default function Header({ leftAlign = false }) {
  return (
    <div className="bg-[#fafafacc] backdrop-blur-lg">
      <Container className={leftAlign && "mx-0"}>
        <Link href="/">
          <a className="py-5 space-y-3 md:space-x-3 md:space-y-0 flex flex-col md:flex-row md:items-center">
            <Visualization />

            <p>
              <span className="font-medium">Kabir Goel</span>
              <span className="text-accent">
                , friendly neighborhood Spider-Man.
              </span>
            </p>
          </a>
        </Link>
      </Container>
      <nav className="border-b border-b-black text-gray-500">
        <Container className={`space-x-2 pb-4 ${leftAlign && "mx-0"}`}>
          <NavbarLink internal href="/portfolio">
            Portfolio
          </NavbarLink>
          <NavbarLink internal href="/recently">
            Recently
          </NavbarLink>
          <NavbarLink href="https://twitter.com/KabirGoel">Twitter</NavbarLink>
          <NavbarLink href="https://github.com/kbrgl">GitHub</NavbarLink>
        </Container>
      </nav>
    </div>
  );
}
