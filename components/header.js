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
    <div className="bg-[#fafafacc] backdrop-blur-lg border-b border-black py-4">
      <Container className="max-w-none">
        <Link href="/">
          <a className="font-bold">Kabir Goel</a>
        </Link>
      </Container>
    </div>
  );
}
