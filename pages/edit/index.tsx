import Image from "next/image";

interface Props {
  repoData: any;
}

const Index: React.FC<Props> = ({ repoData }) => {
  const {
    url,
    ownerName,
    repoName,
    description,
    avatarUrl,
    language,
    stars,
    watchers,
    forks,
  } = repoData;
  return (
    <div>
      <h1>{repoName}</h1>
      <p>{description}</p>
      <div>
        <Image src={avatarUrl} height={144} width={144} alt={ownerName} />
      </div>
    </div>
  );
};

export default Index;
