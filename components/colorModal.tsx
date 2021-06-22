import { Dispatch, SetStateAction } from "react";
import colors from "../public/colors";
import Button from "./button";
import Modal from "./modal";

interface Props {
  selectedColorIndex: number;
  setSelectedColorIndex: Dispatch<SetStateAction<number>>;
  setShowColorModal: Dispatch<SetStateAction<boolean>>;
}

const ColorModal: React.FC<Props> = ({
  selectedColorIndex,
  setSelectedColorIndex,
  setShowColorModal,
}) => {
  const handleSave = () => {
    setShowColorModal(false);
  };

  return (
    <Modal>
      <h3 className="text-lg font-semibold mb-8">Pick a color</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {colors.map((color: any, index) => {
          return (
            <div
              className={`transition-colors duration-150 h-20 rounded-lg text-6xl flex justify-center items-center shadow-md hover:bg-${
                colors[index]
              }-500 cursor-pointer ${
                index === selectedColorIndex
                  ? `bg-${colors[index]}-500`
                  : `bg-${colors[index]}-200`
              }`}
              key={index}
              onClick={() => setSelectedColorIndex(index)}
            >
              {" "}
            </div>
          );
        })}
      </div>
      <Button color="blue" onClick={handleSave}>
        Save
      </Button>
    </Modal>
  );
};

export default ColorModal;
