import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import axios, { AxiosResponse } from "axios";
import { server } from "../../config/index";
import Image from "next/image";
import {
  getRepoData,
  getRepoSettings,
  getTopContributors,
} from "../../lib/repos";

interface Props {
  settings: any;
  data: any;
  contributors: string[];
}

const Repo: React.FC<Props> = ({ settings, data, contributors }) => {
  // Change Type
  const [repoSettings, setRepoSettings] = useState<any>(settings);
  const [repoData, setRepoData] = useState<any>(data);
  const [loading, setLoading] = useState<boolean>(true);

  console.log(repoSettings);
  console.log(repoData);

  const { url, color, fontStyle, icon, showStats, showTopContributors } =
    repoSettings;
  const {
    avatarUrl,
    repoName,
    ownerName,
    description,
    language,
    watchers,
    stars,
    forks,
  } = repoData;

  console.log(contributors);

  return (
    <>
      <nav className="ml-5 mt-5">
        <p className="text-2xl text-white">Superrepos</p>
      </nav>
      <main className="mx-5 mt-10 flex justify-center">
        <div className="px-8 py-10 w-full md:max-w-screen-md bg-white rounded-2xl shadow-lg text-center">
          <div className="mb-8">
            <div className="mb-4">
              {/* <Image
                  className="rounded-full"
                  src={}
                  height={122}
                  width={122}
                  alt={}
                /> */}
            </div>
            <div className="mb-8">
              <h1 className="text-2xl font-semibold">{repoName}</h1>
              <h2 className="text-lg">by {ownerName}</h2>
            </div>
            {showStats && (
              <div className="flex flex-wrap justify-center flex-row justify-evenly ">
                <div className="w-40 py-2 bg-green-300 rounded-md mb-4 shadow-md">
                  👀 Watchers | {watchers}
                </div>
                <div className="w-40 py-2 bg-yellow-300 rounded-md mb-4 shadow-md">
                  ⭐️ Stars | {stars}
                </div>
                <div className="w-40 py-2 bg-blue-300 rounded-md mb-4 shadow-md">
                  🍴 Forks | {forks}
                </div>
              </div>
            )}
            <div className="mb-4">
              <h3 className="font-bold">Description</h3>
              <p>{description}</p>
            </div>
            {showTopContributors && (
              <div className="mb-4">
                <h3 className="font-bold">Top Contributors</h3>
                <p>{contributors.join(", ")}</p>
              </div>
            )}
            <div className="mt-12">
              <a
                className="mb-2 py-2 block w-full transition-colors duration-150 bg-blue-500 hover:bg-blue-400 text-white rounded-lg focus:outline-none cursor-pointer"
                href={url}
              >
                Open on GitHub
              </a>
              <button className="mb-2 py-2 block w-full transition-colors duration-150 bg-blue-500 hover:bg-blue-400 text-white rounded-lg focus:outline-none">
                Share
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Repo;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params.id;
  let settings: {};
  let data: {};
  let contributors: {};
  const url = `${server}/api/repos/${id}`;
  settings = await getRepoSettings(url);
  if (Object.keys(settings).length !== 0) {
    const repoUrl = settings.url.split("/").slice(1).slice(-2);
    data = await getRepoData(
      `https://api.github.com/repos/${repoUrl[0]}/${repoUrl[1]}`
    );
    contributors = await getTopContributors(
      `https://api.github.com/repos/${repoUrl[0]}/${repoUrl[1]}/contributors`
    );
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      settings,
      data,
      contributors,
      fallback: false,
    },
  };
};
