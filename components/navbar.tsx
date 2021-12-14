import Link from "next/link";
import Container from "./container";
import Visualization from "./visualization";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.name}>
        <Container>
          <Link href="/">
            <a>
              <Visualization />
              <strong>Kabir Goel</strong>, friendly neighborhood Spider-Man.
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
