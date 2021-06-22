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
          className="flex-grow border py-2 px-3 text-grey-darkest rounded-lg mr-4 focus:outline-none focus:ring focus:border-blue-100"
          type="text"
          readOnly
          value={url}
        />
        <button
          className="flex items-center py-2 px-3 transition-colors duration-150 bg-green-500 hover:bg-green-400 text-white rounded-lg focus:outline-none shadow-md"
          onClick={() => copy(url)}
        >
          <div className="mr-3">Copy</div>
          <FaClipboard className="object-center" />
        </button>
      </div>
    </div>
  );
};

export default ShareRepoLink;
