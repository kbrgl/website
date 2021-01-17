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
            <a href="https://www.notion.so/kabirgoel/2b3224f21629468580551a14edae4616?v=5a2db9f0bb944564ae019709de328801">
              Playlist
            </a>
            <a href="https://kabirgoel.substack.com">Newsletter</a>
          </div>
        </div>
      </Container>
    </nav>
  );
}
