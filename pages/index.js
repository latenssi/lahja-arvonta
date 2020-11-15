import Head from "next/head";

import Footer from "../components/Footer";
import Display from "../components/Display";

import styles from "../styles/base.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Arvonta</title>
      </Head>

      <main className={styles.main}>
        <Display />
      </main>

      <Footer />
    </div>
  );
}
