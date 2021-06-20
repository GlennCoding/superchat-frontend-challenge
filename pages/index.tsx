import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios, { AxiosResponse } from "axios";
import KVdb from "kvdb.io";

export default function Home() {
  const [user, setUser] = useState<string>("");
  const [repo, setRepo] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let res: AxiosResponse;
    try {
      res = await axios.get(`https://api.github.com/repos/${user}/${repo}`);
    } catch (err) {
      return setError(true);
    }
    console.log(res.data);
  };
  console.log("error: ", error);
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
