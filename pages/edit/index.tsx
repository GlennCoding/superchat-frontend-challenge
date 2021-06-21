import { useState } from "react";
import { useRouter } from "next/router";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import Image from "next/image";

interface Props {
  repoData: any;
}

const Index: React.FC<Props> = ({ repoData }) => {
  const [icon, setIcon] = useState<number>(1);
  const [color, setColor] = useState<string>("#ff9500");
  const [showStats, setShowStats] = useState<boolean>(true);
  const [showTopContributors, setShowTopContributors] = useState<boolean>(true);
  const [fontStyle, setFontStyle] = useState<string>("Roboto");
  const [shareRepoUrl, setShareRepoUrl] = useState<string>("");
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

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const apiUrl = `http://localhost:3000/api/repos/create`;
    let res: AxiosResponse;
    try {
      res = await axios.post(
        apiUrl,
        {
          url: url,
          icon: icon,
          color: color,
          showStats: showStats,
          showTopContributors: showTopContributors,
          fontStyle: fontStyle,
        },
        { headers: { "Content-Type": "Application/json" } }
      );
    } catch (err) {
      return console.log("error:", err);
    }
    const repoID = res.data.repoId;
    const newShareRepoUrl = `http://superchat-frontend-challenge-six.vercel.app/repos/${repoID}`;
    setShareRepoUrl(newShareRepoUrl);
  };
  console.log(shareRepoUrl);

  if (Object.keys(repoData).length === 0) {
    return (
      <div>
        <h1>Empty Page</h1>
        <Link href="/">
          <a>Go back to homepage</a>
        </Link>
      </div>
    );
  } else {
    return (
      <>
        <div>
          <h1>{repoName}</h1>
          <h3>{description}</h3>
          <div>
            <Image src={avatarUrl} height={144} width={144} alt={ownerName} />
          </div>
        </div>
        <div>
          <button type="button">Select Icon</button>
          <button type="button">Select Color</button>
          <button type="button" onClick={() => setShowStats(!showStats)}>
            Show Stats: {showStats ? "True" : "False"}
          </button>
          <button
            type="button"
            onClick={() => setShowTopContributors(!showTopContributors)}
          >
            Show Stats: {showTopContributors ? "True" : "False"}
          </button>
          <button>Select Font</button>
          <button onClick={handleSubmit}>Submit and Share</button>
        </div>
      </>
    );
  }
};

export default Index;
