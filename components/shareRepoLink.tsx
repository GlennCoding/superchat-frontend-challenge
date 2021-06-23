import { FaClipboard } from "react-icons/fa";
import copy from "copy-to-clipboard";
import colors from "../public/colors";

interface Props {
  url: string;
}

const ShareRepoLink: React.FC<Props> = ({ url }) => {
  return (
    <div>
      <div className="flex mb-4">
        <input
          className="border py-2 px-3 text-grey-darkest rounded-lg mr-4 focus:outline-none focus:ring focus:border-blue-100 w-full"
          type="text"
          readOnly
          value={url}
        />
        <button
          className="flex items-center py-2 px-3 transition-colors duration-150 bg-green-500 hover:bg-green-400 text-white rounded-lg focus:outline-none shadow-md w-min"
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
