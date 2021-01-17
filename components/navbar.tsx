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
            <a href="mailto:kabirgoel.kg@gmail.com">Email</a>
            <Link href="/writing">
              <a>Writing</a>
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  );
}
