import { useState } from "react";
import "../styles/index.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const [repoData, setRepoData] = useState({});
  return (
    <Component {...pageProps} repoData={repoData} setRepoData={setRepoData} />
  );
}
export default MyApp;
