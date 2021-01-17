import Container from "./container";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <p>
          “Man who make mistake in elevator, wrong on many levels.”—Confucius
        </p>
      </Container>
    </footer>
  );
}
