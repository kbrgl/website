import Link from "next/link";
import Container from "./container";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <Container>
        <div className={styles.links}>
          <div>
            <Link href="/">
              <a className={styles.name}>Kabir Goel</a>
            </Link>
          </div>
          <div>
            <a href="https://kabirgoel.substack.com">Newsletter</a>
            <a href="mailto:kabirgoel.kg@gmail.com">Email</a>
            <a href="https://github.com/kbrgl">GitHub</a>
          </div>
        </div>
      </Container>
    </div>
  );
}
