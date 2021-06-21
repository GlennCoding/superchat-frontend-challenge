import axios, { AxiosResponse } from "axios";

export const getRepoData = async (url: string) => {
  let res: AxiosResponse;
  try {
    res = await axios.get(url);
  } catch (err) {
    console.log(err);
    return {};
  }
  const data = res.data;
  const repoData = {
    url: data.html_url,
    ownerName: data.owner.login,
    repoName: data.name,
    description: data.description,
    avatarUrl: data.owner.avatar_url,
    language: data.language,
    stars: data.stargazers_count,
    watchers: data.subscribers_count,
    forks: data.forks,
  };
  return repoData;
};

export const getRepoSettings = async (url: string) => {
  let res: AxiosResponse;
  try {
    res = await axios.get(url);
  } catch (err) {
    console.log(err);
    return {};
  }
  const settings = res.data;
  return settings;
};

export const getTopContributors = async (url: string) => {
  let res: AxiosResponse;
  try {
    res = await axios.get(url);
  } catch (err) {
    console.log(err);
    return {};
  }
  const contributors = res.data;
  console.log(contributors);
  const top10contributors = contributors
    .slice(0, 10)
    .map((contributor) => contributor.login);
  return top10contributors;
};
