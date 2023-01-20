import * as React from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const Pill: React.FC<Props> = ({ children, className = "" }) => {
  return (
    <span
      className={`mr-2 inline-block min-w-[2rem] rounded-full border px-3 py-1 text-center text-xs shadow-md ${className}`}
    >
      {children}
    </span>
  );
};
