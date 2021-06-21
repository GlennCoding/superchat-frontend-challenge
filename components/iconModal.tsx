import { Dispatch, SetStateAction } from "react";
import icons from "../public/icons";
import Button from "./button";
import Modal from "./modal";

interface Props {
  selectedIconIndex: number;
  setSelectedIconIndex: Dispatch<SetStateAction<number>>;
  setShowIconModal: Dispatch<SetStateAction<boolean>>;
}

const IconModal: React.FC<Props> = ({
  selectedIconIndex,
  setSelectedIconIndex,
  setShowIconModal,
}) => {
  const handleSave = () => {
    setShowIconModal(false);
  };

  return (
    <Modal>
      <h3 className="text-lg font-semibold mb-8">Pick an icon</h3>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {icons.map((icon: any, index) => {
          //icons[iconKey] -> child
          return (
            <div
              className={`bg-red-200 transition-colors duration-150 h-20 rounded-lg text-6xl flex justify-center items-center shadow-md hover:bg-red-300 cursor-pointer ${
                index === selectedIconIndex && "bg-pink-500"
              }`}
              key={index}
              onClick={() => setSelectedIconIndex(index)}
            >
              {icon}
            </div>
          );
        })}
      </div>
      <button
        className="mb-2 py-2 block w-full transition-colors duration-150 bg-blue-500 hover:bg-blue-400 text-white rounded-lg focus:outline-none"
        onClick={() => setShowIconModal(false)}
      >
        Save
      </button>
      <Button color="blue" onClick={handleSave}>
        Save
      </Button>
    </Modal>
  );
};

export default IconModal;
