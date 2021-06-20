import { useRouter } from "next/router";

interface Props {}

const Repo: React.FC<Props> = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>Repo Page, id: {id}</div>;
};

export default Repo;
