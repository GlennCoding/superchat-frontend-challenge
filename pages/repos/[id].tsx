import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios, { AxiosResponse } from "axios";

interface Props {}

const Repo: React.FC<Props> = () => {
  // Change Type
  const [repoData, setRepoData] = useState<any>({});

  const router = useRouter();
  const { id } = router.query;

  const componentDidMount = async () => {
    const url = `http://localhost:3000/api/repos/${id}`;
    let res: AxiosResponse;
    try {
      res = await axios.get(url);
      setRepoData(res);
    } catch (err) {
      console.log(err);
    }
    console.log(repoData);
  };

  useEffect(() => {
    componentDidMount();
  }, [id]);
  console.log(repoData);
  if (Object.keys(repoData).length === 0) {
    return (
      <div>
        <h1>Not Found</h1>
      </div>
    );
  } else {
    return (
      <div>
        Repo Page, id: {id} {repoData.url}
      </div>
    );
  }
};

export default Repo;
