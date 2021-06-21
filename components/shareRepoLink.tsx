import { FaClipboard } from "react-icons/fa";
import copy from "copy-to-clipboard";
import colors from "../public/colors";

interface Props {
  url: string;
  selectedColorIndex?: number;
}

const ShareRepoLink: React.FC<Props> = ({ url, selectedColorIndex = 2 }) => {
  return (
    <div>
      <div className="flex mb-4">
        <input
          className="flex-grow border py-2 px-3 text-grey-darkest rounded-lg mr-4"
          type="text"
          value={url}
        />
        <button
          className="flex items-center py-2 px-3 transition-colors duration-150 bg-green-500 hover:bg-green-400 text-white rounded-lg focus:outline-none"
          onClick={() => copy(url)}
        >
          <div className="mr-3">Copy</div>
          <FaClipboard className="object-center" />
        </button>
      </div>
      <p>
        Come and{" "}
        <a href={url} className={`text-${colors[selectedColorIndex]}-500`}>
          take a look 👀
        </a>
      </p>
    </div>
  );
};

export default ShareRepoLink;
