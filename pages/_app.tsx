import { useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const [repoData, setRepoData] = useState(dummyData);
  return (
    <Component {...pageProps} repoData={repoData} setRepoData={setRepoData} />
  );
}
export default MyApp;

const dummyData = {
  url: "https://github.com/vercel/next.js",
  ownerName: "vercel",
  repoName: "next.js",
  description: "The React Framework",
  avatarUrl: "https://avatars.githubusercontent.com/u/14985020?v=4",
  language: "JavaScript",
  stars: 69601,
  watchers: 1218,
  forks: 13075,
};
