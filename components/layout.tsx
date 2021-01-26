import Head from "next/head";
import Navbar from "./navbar";
import Footer from "./footer";
import styles from "./layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
