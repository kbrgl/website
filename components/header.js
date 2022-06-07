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
    <nav className="border-b py-6">
      <Container className="text-sm">
        <Link href="/">
          <a className="flex justify-between items-center">
            <div>
              <p className="font-medium font-title text-lg">Kabir Goel</p>
              <p className="text-gray-500 inline-flex items-center">
                Product designer &amp; engineer&nbsp;·&nbsp;Berkeley,&nbsp;CA
              </p>
              <p className="text-gray-500 font-medium inline-flex items-center"></p>
            </div>
            <img className="h-24 w-24 pl-1 rounded-full" src="/me.jpg" alt="" />
          </a>
        </Link>
      </Container>
    </nav>
  );
}
