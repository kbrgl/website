import Head from "next/head";
import Navbar from "../components/navbar";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Kabir Goel</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/vyk7kso.css" />
      </Head>

      <Navbar />
      <main>{children}</main>
    </div>
  );
}
