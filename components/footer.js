import Link from "next/link";
import Container from "./container";

export default function Footer() {
  return (
    <footer className="py-16">
      <Container>
        <p className="mb-3 text-gray-600">
          “Man who make mistake in elevator, wrong on many levels.”—Confucius
        </p>
        <div className="flex space-x-2 text-sm font-medium">
          <a href="https://twitter.com/KabirGoel">Twitter</a>
          <a href="https://buttondown.email/kabir">Newsletter</a>
          <Link href="/colophon">
            <a>Colophon</a>
          </Link>
        </div>
      </Container>
    </footer>
  );
}
