import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function Home() {
  const [user, setUser] = useState("");
  const [repo, setRepo] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3000/api/repos/${user}/${repo}`
      );
      const data = await res.json();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Superrepos</title>
        <meta
          name="description"
          content="My submission for the superchat-frontend-challenge"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form onSubmit={handleSubmit}>
          <label>
            User
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </label>
          <label>
            Repository
            <input
              type="text"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}
