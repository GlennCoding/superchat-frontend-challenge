import { useState } from "react";
import { useRouter } from "next/router";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import Image from "next/image";
import { server } from "../../config/index";

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
    const apiUrl = `${server}/api/repos/create`;
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
    const newShareRepoUrl = `${server}/repos/${repoID}`;
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
        <nav className="ml-5 mt-5">
          <h1 className="text-2xl text-white">Superrepos</h1>
        </nav>
        <main className="mx-5 mt-10 flex justify-center">
          <div className="px-8 py-10 w-full md:max-w-screen-md bg-white rounded-2xl shadow-lg text-center">
            <div className="mb-8">
              <div className="mb-4">
                <Image
                  className="rounded-full"
                  src={avatarUrl}
                  height={122}
                  width={122}
                  alt={ownerName}
                />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">{repoName}</h1>
                <h2 className="text-lg">{description}</h2>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <button className="mb-2 py-2 block w-full transition-colors duration-150 bg-blue-500 hover:bg-blue-400 text-white rounded-lg focus:outline-none">
                  Select Color
                </button>
                <button className="mb-2 py-2 block w-full transition-colors duration-150 bg-blue-500 hover:bg-blue-400 text-white rounded-lg focus:outline-none">
                  Select Font
                </button>
                <button
                  className={`mb-2 py-2 block w-full transition-colors duration-150 text-white rounded-lg focus:outline-none ${
                    showStats
                      ? "bg-blue-500 hover:bg-blue-400"
                      : "bg-red-500 hover:bg-red-400"
                  }`}
                  onClick={() => setShowStats(!showStats)}
                >
                  Show Stats: {showStats ? "True" : "False"}
                </button>
                <button
                  className={`mb-2 py-2 block w-full transition-colors duration-150 text-white rounded-lg focus:outline-none ${
                    showTopContributors
                      ? "bg-blue-500 hover:bg-blue-400"
                      : "bg-red-500 hover:bg-red-400"
                  }`}
                  type="button"
                  onClick={() => setShowTopContributors(!showTopContributors)}
                >
                  Show Stats: {showTopContributors ? "True" : "False"}
                </button>
              </div>
              <button
                className="mb-2 py-2 block w-full transition-colors duration-150 bg-green-500 hover:bg-green-400 text-white rounded-lg focus:outline-none"
                onClick={handleSubmit}
              >
                Submit and Share
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }
};

export default Index;
