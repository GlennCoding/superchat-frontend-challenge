import { Dispatch, SetStateAction } from "react";
import Button from "./button";

interface Props {
  setShowColorModal: Dispatch<SetStateAction<boolean>>;
  showStats: boolean;
  setShowStats: Dispatch<SetStateAction<boolean>>;
  showTopContributors: boolean;
  setShowTopContributors: Dispatch<SetStateAction<boolean>>;
}

const RepoSettings: React.FC<Props> = ({
  setShowColorModal,
  showStats,
  setShowStats,
  showTopContributors,
  setShowTopContributors,
}) => {
  return (
    <div className="mb-4">
      <div className="mb-2">
        <Button color="pink" onClick={() => setShowColorModal(true)}>
          Select Color
        </Button>
      </div>
      <div className="mb-2">
        <Button
          color={showStats ? "pink" : "purple"}
          onClick={() => setShowStats(!showStats)}
        >
          Show Stats: {showStats ? "True" : "False"}
        </Button>
      </div>
      <div className="mb-8">
        <Button
          color={showTopContributors ? "pink" : "purple"}
          onClick={() => setShowTopContributors(!showTopContributors)}
        >
          Show Top Contributors: {showTopContributors ? "True" : "False"}
        </Button>
      </div>
    </div>
  );
};

export default RepoSettings;
