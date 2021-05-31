import Link from "next/link";
import Container from "./container";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Container>
        <div className={styles.links}>
          <div className={styles.name}>
            <Link href="/">
              <a>Kabir Goel</a>
            </Link>
          </div>
          <div className={styles.list}>
            <Link href="/about">
              <a>About</a>
            </Link>
            <Link href="/portfolio">
              <a>Portfolio</a>
            </Link>
            <Link href="/garden">
              <a>Garden</a>
            </Link>
            <a href="https://buttondown.email/kabir">
              Newsletter&nbsp;&#x2197;
            </a>
          </div>
        </div>
      </Container>
    </nav>
  );
}
