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
            <Link href="/notes">
              <a>Notes</a>
            </Link>
            <a href="https://www.notion.so/kabirgoel/2b3224f21629468580551a14edae4616?v=5a2db9f0bb944564ae019709de328801">
              Playlist&nbsp;&#x2197;
            </a>
            <a href="https://buttondown.email/kabir">
              Newsletter&nbsp;&#x2197;
            </a>
          </div>
        </div>
      </Container>
    </nav>
  );
}
