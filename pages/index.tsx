import { useState } from "react";
import router, { useRouter } from "next/router";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import Head from "next/head";
import { getRepoData } from "../lib/repos";
import { route } from "next/dist/next-server/server/router";

interface Props {
  setRepoData: any;
}

const Home: React.FC<Props> = ({ setRepoData }) => {
  const [user, setUser] = useState<string>("");
  const [repo, setRepo] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const url = `https://api.github.com/repos/${user}/${repo}`;
    let res: AxiosResponse;
    try {
      res = await axios.get(url);
    } catch (err) {
      return setError(true);
    }
    const repoData = getRepoData(res.data);
    setRepoData(repoData);
    router.push("./edit");
  };
  return (
    <div className="container">
      <Head>
        <title>Superrepos</title>
        <meta
          name="description"
          content="My submission for the superchat-frontend-challenge"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="m-2">
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
};

export default Home;
