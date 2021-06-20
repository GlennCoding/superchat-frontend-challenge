export const getRepoData = (data: any) => {
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
