import React from "react";

interface Props {
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
  required?: boolean;
}

const Input: React.FC<Props> = ({
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  return (
    <input
      className="border py-2 px-3 block w-full text-grey-darkest rounded-lg"
      type="text"
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

export default Input;
