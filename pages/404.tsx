import Link from "next/link";
import Container from "../components/container";
import styles from "../styles/404.module.css";

export default function NotFound() {
  return (
    <main className={styles.main}>
      <Container>
        <h1>404 Epic Fail</h1>
        <img src="https://cataas.com/c/fail" alt="" />
        <p>
          Looks like you’re lost. The gentlemanly thing would be to{" "}
          <Link href="/">
            <a>send you home</a>
          </Link>
          , but you can also refresh to see more cats. 🐱
        </p>
      </Container>
    </main>
  );
}
