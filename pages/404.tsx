import Layout from "../components/layout";
import Container from "../components/container";
import styles from "../styles/404.module.css";

export default function NotFound() {
  return (
    <Layout>
      <Container>
        <div className={styles.main}>
          <h1>404</h1>
          <h1>Not Found</h1>
        </div>
      </Container>
    </Layout>
  );
}
