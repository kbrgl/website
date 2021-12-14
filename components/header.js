import Link from "next/link";
import Visualization from "./visualization";
import Container from "./container";

function NavbarLink({ internal = false, href, children }) {
  const link = (
    <a
      href={internal ? "#" : href}
      target={!internal && "_blank"}
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
    <div className="bg-gray-50">
      <Container>
        <Link href="/">
          <a className="block py-5 space-y-3">
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
      <nav className="border border-r-0 border-l-0 text-sm text-gray-500">
        <Container className="space-x-4 py-1">
          <NavbarLink internal href="/portfolio">
            Portfolio
          </NavbarLink>
          <NavbarLink href="https://twitter.com/KabirGoel">Twitter</NavbarLink>
          <NavbarLink href="https://github.com/kbrgl">GitHub</NavbarLink>
        </Container>
      </nav>
    </div>
  );
}
