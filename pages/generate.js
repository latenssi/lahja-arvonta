import Head from "next/head";

import Footer from "../components/Footer";
import Generate from "../components/Generate";

import styles from "../styles/base.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Arvonta | Generate</title>
      </Head>

      <main className={styles.main}>
        <Generate />
      </main>

      <Footer />
    </div>
  );
}
