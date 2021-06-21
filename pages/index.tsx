import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { getRepoData } from "../lib/repos";
import Layout from "../components/layout";
import Button from "../components/button";
import Input from "../components/input";

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
    const repoData = await getRepoData(url);
    if (Object.keys(repoData).length !== 0) {
      setRepoData(repoData);
    } else {
      return setError(true);
    }
    router.push("./create");
  };
  return (
    <Layout>
      <h2 className="text-xl text-center font-semibold mb-4">
        Create a superrepo
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>
            User
            <Input value={user} onChange={(e) => setUser(e.target.value)} />
          </label>
        </div>
        <div className="mb-8">
          <label>
            Repo
            <Input value={repo} onChange={(e) => setRepo(e.target.value)} />
          </label>
        </div>
        <Button color="green" type="submit">
          Submit
        </Button>
      </form>
    </Layout>
  );
};

export default Home;
