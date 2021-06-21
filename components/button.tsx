import React from "react";

interface Props {
  children: React.ReactNode;
  color: string;
  type?: "button" | "reset" | "submit";
  onClick: () => void;
}

const Button: React.FC<Props> = ({
  children,
  color,
  type = "button",
  onClick,
}) => {
  return (
    <button
      className={`mt-6 py-2 block w-full transition-colors duration-150 bg-${color}-500 hover:bg-${color}-400 text-white rounded-lg focus:outline-none`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
