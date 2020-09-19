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
              <a>Home</a>
            </Link>
            <a href="https://www.notion.so/kabirgoel/Kabir-Goel-d168ad4ac63f4e7fad8c601f6e679331">
              Résumé
            </a>
            <a href="mailto:kabirgoel.kg@gmail.com">Email</a>
            <a href="https://github.com/kbrgl">GitHub</a>
          </div>
        </div>
      </Container>
    </div>
  );
}
