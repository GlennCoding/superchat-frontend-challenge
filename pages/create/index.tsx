import { useState } from "react";
import { useRouter } from "next/router";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import Image from "next/image";
import { server } from "../../config/index";
import icons from "../../public/icons";
import colors from "../../public/colors";

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 w-full h-full grid place-items-center bg-gray-200 bg-opacity-50">
      <div className="px-8 py-10 w-full md:max-w-screen-sm bg-white rounded-2xl shadow-lg text-center h-auto">
        {children}
      </div>
    </div>
  );
};

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
      <div
        className={`fixed bg-${colors[selectedColorIndex]}-500 inset-0 w-full h-full`}
      >
        {showIconModal && (
          <Modal>
            <h3 className="text-lg font-semibold mb-8">Pick an icon</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {icons.map((icon: any, index) => {
                //icons[iconKey] -> child
                return (
                  <div
                    className={`bg-red-200 transition-colors duration-150 h-20 rounded-lg text-6xl flex justify-center items-center shadow-md hover:bg-red-300 cursor-pointer ${
                      index === selectedIconIndex && "bg-pink-500"
                    }`}
                    key={index}
                    onClick={() => setSelectedIconIndex(index)}
                  >
                    {icon}
                  </div>
                );
              })}
            </div>
            <button
              className="mb-2 py-2 block w-full transition-colors duration-150 bg-blue-500 hover:bg-blue-400 text-white rounded-lg focus:outline-none"
              onClick={() => setShowIconModal(false)}
            >
              Save
            </button>
          </Modal>
        )}
        {showColorModal && (
          <Modal>
            <h3 className="text-lg font-semibold mb-8">Pick a color</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {colors.map((color: any, index) => {
                return (
                  <div
                    className={`transition-colors duration-150 h-20 rounded-lg text-6xl flex justify-center items-center shadow-md hover:bg-${
                      colors[index]
                    }-500 cursor-pointer ${
                      index === selectedColorIndex
                        ? `bg-${colors[index]}-500`
                        : `bg-${colors[index]}-200`
                    }`}
                    key={index}
                    onClick={() => setSelectedColorIndex(index)}
                  >
                    {" "}
                  </div>
                );
              })}
            </div>
            <button
              className="mb-2 py-2 block w-full transition-colors duration-150 bg-blue-500 hover:bg-blue-400 text-white rounded-lg focus:outline-none"
              onClick={() => setShowColorModal(false)}
            >
              Save
            </button>
          </Modal>
        )}
        <nav className="ml-5 mt-5">
          <p className="text-2xl text-white">Superrepos</p>
        </nav>
        <main className="mx-5 mt-10 flex justify-center">
          <div className="px-8 py-10 w-full md:max-w-screen-sm bg-white rounded-2xl shadow-lg text-center">
            <div className="mb-8">
              <div className="flex justify-center">
                <div
                  className="mb-4 w-min p-6 rounded-full cursor-pointer text-center shadow-lg text-6xl"
                  onClick={() => setShowIconModal(true)}
                >
                  {icons[selectedIconIndex]}
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-semibold">{repoName}</h1>
                <h2 className="text-lg">{description}</h2>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <button
                  className="mb-2 py-2 block w-full transition-colors duration-150 bg-blue-500 hover:bg-blue-400 text-white rounded-lg focus:outline-none"
                  onClick={() => setShowColorModal(true)}
                >
                  Select Color
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
                  Show Top Contributors:{" "}
                  {showTopContributors ? "True" : "False"}
                </button>
              </div>
              {shareRepoUrl ? (
                <div className="flex">
                  <input
                    className="flex-grow"
                    type="text"
                    value={shareRepoUrl}
                  />
                  <button>Copy</button>
                </div>
              ) : (
                <button
                  className="mb-2 py-2 block w-full transition-colors duration-150 bg-green-500 hover:bg-green-400 text-white rounded-lg focus:outline-none"
                  onClick={handleSubmit}
                >
                  Submit and Share
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }
};

export default Index;
