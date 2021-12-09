import Link from "next/link";
import Container from "./container";

function NavbarLink({ internal = false, href, children }) {
  const link = (
    <a
      href={internal ? "#" : href}
      className="hover:text-accent transition-colors duration-200"
    >
      {children}
    </a>
  );
  if (internal) {
    return <Link href={href}>{link}</Link>;
  }
  return link;
}

export default function Header() {
  return (
    <div className="bg-[#f4f7fa]">
      <Container>
        <Link href="/">
          <a className="flex items-center space-x-3 py-5">
            <img className="w-14 h-14 rounded-full" src="/me.jpg" alt="" />
            <p className="font-medium text-accent">Kabir Goel</p>
          </a>
        </Link>
      </Container>
      <nav className="border border-r-0 border-l-0 text-sm space-x-3 py-1 px-10 font-medium">
        <NavbarLink internal href="/portfolio">
          Portfolio
        </NavbarLink>
        <NavbarLink href="/resume.pdf">
          Resume <span className="text-gray-500">&darr;</span>
        </NavbarLink>
        <NavbarLink href="https://twitter.com/KabirGoel">Twitter</NavbarLink>
        <NavbarLink href="https://github.com/kbrgl">GitHub</NavbarLink>
      </nav>
    </div>
  );
}
