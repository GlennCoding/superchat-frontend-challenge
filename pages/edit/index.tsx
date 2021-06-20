import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

interface Props {
  repoData: any;
}

const Index: React.FC<Props> = ({ repoData }) => {
  const [showStats, setShowStats] = useState(true);
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

  const handleSubmit = () => {};

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
        <div>
          <h1>{repoName}</h1>
          <p>{description}</p>
          <div>
            <Image src={avatarUrl} height={144} width={144} alt={ownerName} />
          </div>
        </div>
        <form>
          <label htmlFor="pickIcon">Pick Icon</label>
          <input type="text" name="pickIcon" id="pickIcon" />
          <br />
          <label htmlFor="color">Pick Color</label>
          <input type="color" name="color" id="color" />
          <br />
          <label htmlFor="showStats">Show Stats</label>
          <input type="checkbox" name="showStats" id="showStats" />
          <br />
          <label htmlFor="showLanguage">Show Language</label>
          <input type="checkbox" name="showLanguage" id="showLanguage" />
          <br />
          <label htmlFor="showTopContributors">Show op Contributors</label>
          <input
            type="checkbox"
            name="showTopContributors"
            id="showTopContributors"
          />
          <br />
          <label htmlFor="fontStyle">Pick Font-Style</label>
          <input type="text" name="fontStyle" id="fontStyle" />
          <br />
          <button type="submit">Submit and Share</button>
        </form>
      </>
    );
  }
};

export default Index;
