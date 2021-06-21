import { GetServerSideProps } from "next";
import { server } from "../../config/index";
import icons from "../../public/icons";
import colors from "../../public/colors";
import ShareRepoLink from "../../components/shareRepoLink";
import Layout from "../../components/layout";
import Button from "../../components/button";
import StatsItem from "../../components/statsItem";
import Icon from "../../components/icon";
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
  const { url, color, icon, showStats, showTopContributors } = settings;
  const { repoName, ownerName, description, watchers, stars, forks } = data;

  console.log(description);

  return (
    <div className={`fixed bg-${colors[color]}-500 inset-0 w-full h-full`}>
      <Layout>
        <div className="text-center">
          <div className="mb-8">
            <Icon>{icons[icon]}</Icon>
            <div className="mb-8">
              <h1 className="text-2xl font-semibold">{repoName}</h1>
              <h2 className="text-lg">by {ownerName}</h2>
            </div>
            {showStats && (
              <div className="flex flex-wrap justify-center flex-row justify-evenly mb-4">
                <StatsItem color="green">👀 Watchers | {watchers}</StatsItem>
                <StatsItem color="yellow">⭐️ Stars | {stars}</StatsItem>
                <StatsItem color="purple">🍴 Forks | {forks}</StatsItem>
              </div>
            )}
            <div className="mb-4">
              <h3 className="font-bold text-lg">Description</h3>
              <p>{!description ? "No Description" : description}</p>
            </div>
            {showTopContributors && contributors.length > 1 && (
              <div className="mb-4">
                <h3 className="font-bold text-lg">Top Contributors</h3>
                <p>{contributors.join(", ")}</p>
              </div>
            )}
          </div>
          <div className="mt-12">
            <div className="mb-4">
              <Button color={colors[color]}>
                <a href={url}>Open on GitHub</a>
              </Button>
            </div>
            <ShareRepoLink url={url} />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Repo;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id;
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
