import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { server } from "../../config/index";
import icons from "../../public/icons";
import colors from "../../public/colors";
import Layout from "../../components/layout";
import Button from "../../components/button";
import IconModal from "../../components/iconModal";
import ColorModal from "../../components/colorModal";
import ShareRepoLink from "../../components/shareRepoLink";
import RepoSettings from "../../components/repoSettings";
import BackgroundColor from "../../components/backgroundColor";

interface Props {
  repoData: any;
}

const Index: React.FC<Props> = ({ repoData }) => {
  const [showStats, setShowStats] = useState<boolean>(true);
  const [showTopContributors, setShowTopContributors] = useState<boolean>(true);
  const [shareRepoUrl, setShareRepoUrl] = useState<string>("");
  const [selectedIconIndex, setSelectedIconIndex] = useState<number>(0);
  const [showIconModal, setShowIconModal] = useState<boolean>(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(1);
  const [showColorModal, setShowColorModal] = useState<boolean>(false);
  const { url, repoName, description } = repoData;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const apiUrl = `${server}/api/repos/create`;
    let res: AxiosResponse;
    try {
      res = await axios.post(
        apiUrl,
        {
          url: url,
          icon: selectedIconIndex,
          color: selectedColorIndex,
          showStats: showStats,
          showTopContributors: showTopContributors,
          fontStyle: "sans",
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

  if (Object.keys(repoData).length === 0) {
    return (
      <Layout>
        <h1 className="text-lg font-semibold">Session Ended</h1>
        <Link href="/">
          <a className="text-blue-500">Go back to homepage</a>
        </Link>
      </Layout>
    );
  } else {
    return (
      <>
        <BackgroundColor color={colors[selectedColorIndex]} />
        {showIconModal && (
          <IconModal
            selectedIconIndex={selectedIconIndex}
            setSelectedIconIndex={setSelectedIconIndex}
            setShowIconModal={setShowIconModal}
          />
        )}
        {showColorModal && (
          <ColorModal
            selectedColorIndex={selectedColorIndex}
            setSelectedColorIndex={setSelectedColorIndex}
            setShowColorModal={setShowColorModal}
          />
        )}
        <Layout>
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <div
                className="w-min p-6 rounded-full cursor-pointer text-center shadow-lg text-6xl"
                onClick={() => !shareRepoUrl && setShowIconModal(true)}
              >
                {icons[selectedIconIndex]}
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{repoName}</h1>
              <h2 className="text-lg">{description}</h2>
            </div>
          </div>

          {!shareRepoUrl ? (
            <>
              <RepoSettings
                setShowColorModal={setShowColorModal}
                showStats={showStats}
                setShowStats={setShowStats}
                showTopContributors={showTopContributors}
                setShowTopContributors={setShowTopContributors}
              />
              <Button color="green" onClick={handleSubmit}>
                Submit and Share
              </Button>
            </>
          ) : (
            <div>
              <ShareRepoLink
                url={shareRepoUrl}
                selectedColorIndex={selectedColorIndex}
              />
              <p>
                Come and{" "}
                <a
                  href={shareRepoUrl}
                  className={`text-${colors[selectedColorIndex]}-500`}
                >
                  take a look 👀
                </a>
              </p>
            </div>
          )}
        </Layout>
      </>
    );
  }
};

export default Index;
