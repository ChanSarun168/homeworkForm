import React, { ReactNode } from "react";

interface InputProps {
  type: string;
  placeholder?: string;
  name: string;
  id: string;
  className?: string;
  onchange?: () => void;
  value ?: string
}
const InputForm : React.FC<InputProps> = ({
  type,
  placeholder,
  name,
  id,
  className,
  onchange,
  value
}) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        className={className}
        onChange={onchange}
        value={value}
      />
    </div>
  );
};

export {InputForm};
