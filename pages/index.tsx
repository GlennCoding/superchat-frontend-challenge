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
    <div>
      <Head>
        <title>Superrepos</title>
        <meta
          name="description"
          content="My submission for the superchat-frontend-challenge"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="ml-5 mt-5">
        <h1 className="text-2xl text-white">Superrepos</h1>
      </nav>
      <main className="mx-5 mt-10 flex justify-center">
        <div className="px-8 py-10 w-full md:max-w-screen-md bg-white rounded-2xl shadow-lg">
          <h2 className="text-xl text-center font-semibold mb-4">
            Create a superrepo
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-2">
              <label htmlFor="user">User</label>
              <input
                className="border py-2 px-3 text-grey-darkest rounded-lg"
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                name="user"
                id="user"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="repo">Repository</label>
              <input
                className="border py-2 px-3 text-grey-darkest rounded-lg"
                type="text"
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
                name="repo"
                id="repo"
              />
            </div>
            <button
              className="mt-6 py-2 block w-full transition-colors duration-150 bg-green-500 hover:bg-green-400 text-white rounded-lg"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
