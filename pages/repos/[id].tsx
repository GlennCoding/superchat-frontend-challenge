import { GetServerSideProps } from "next";
import { server } from "../../config/index";
import icons from "../../constants/icons";
import colors from "../../constants/colors";
import ShareRepoLink from "../../components/shareRepoLink";
import Layout from "../../components/layout";
import Button from "../../components/button";
import StatsItem from "../../components/statsItem";
import Icon from "../../components/icon";
import BackgroundColor from "../../components/backgroundColor";
import {
  getRepoData,
  getRepoSettings,
  getTopContributors,
} from "../../lib/repos";

interface Props {
  settings: any;
  data: any;
  contributors: string[];
  currentUrl: string;
}

const Repo: React.FC<Props> = ({
  settings: { url, color, icon, showStats, showTopContributors },
  data: { repoName, ownerName, description, watchers, stars, forks },
  contributors,
  currentUrl,
}) => {
  const currentColor = colors[color];
  return (
    <>
      <BackgroundColor color={currentColor} />
      <Layout>
        <div className="text-center">
          <div className="mb-8">
            <Icon>{icons[icon]}</Icon>
            <div className="mb-8">
              <h1 className={`text-4xl font-bold text-${currentColor}-500`}>
                {repoName}
              </h1>
              <h2 className="text-lg">by {ownerName}</h2>
            </div>
            {showStats && (
              <div className="flex flex-wrap flex-col sm:flex-row sm:justify-evenly mb-4">
                <StatsItem color="green" url={`${url}/subscription`}>
                  👀 Watchers | {watchers}
                </StatsItem>
                <StatsItem color="yellow" url={url}>
                  ⭐️ Stars | {stars}
                </StatsItem>
                <StatsItem color="purple" url={`${url}/fork`}>
                  🍴 Forks | {forks}
                </StatsItem>
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
              <a href={url}>
                <Button color={currentColor}>Open on GitHub</Button>
              </a>
            </div>
            <ShareRepoLink url={currentUrl} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Repo;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id;
  const currentUrl = `${server}/repos/${id}`;
  let data;
  let contributors;
  const url = `${server}/api/repos/${id}`;
  const settings = await getRepoSettings(url);
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
      currentUrl,
      fallback: false,
    },
  };
};
