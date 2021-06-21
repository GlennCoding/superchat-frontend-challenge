import React from "react";

interface Props {
  children: React.ReactNode;
  color: string;
  type?: "button" | "reset" | "submit";
}

const Button: React.FC<Props> = ({ children, color, type = "button" }) => {
  return (
    <button
      className={`mt-6 py-2 block w-full transition-colors duration-150 bg-${color}-500 hover:bg-${color}-400 text-white rounded-lg focus:outline-none`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
