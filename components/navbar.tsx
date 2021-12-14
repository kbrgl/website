import Link from "next/link";
import Container from "./container";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.name}>
        <Container>
          <Link href="/">
            <a>
              <strong>Kabir Goel</strong>, friendly neighborhood Spiderman.
            </a>
          </Link>
        </Container>
      </div>
      <div className={styles.bordered}>
        <Container>
          <div className={styles.list}>
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
        </Container>
      </div>
    </nav>
  );
}
