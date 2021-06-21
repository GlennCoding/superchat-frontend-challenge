import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios, { AxiosResponse } from "axios";
import { server } from "../../config/index";

interface Props {}

const Repo: React.FC<Props> = () => {
  // Change Type
  const [repoData, setRepoData] = useState<any>({});

  const router = useRouter();
  const { id } = router.query;

  const componentDidMount = async () => {
    const url = `${server}/api/repos/${id}`;
    let res: AxiosResponse;
    try {
      res = await axios.get(url);
    } catch (err) {
      return console.log(err);
    }
    setRepoData(res.data);
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
    return <div>Repo Page, id: {id}</div>;
  }
};

export default Repo;
