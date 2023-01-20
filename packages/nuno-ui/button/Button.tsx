import React from "react";
import clsx from "clsx";

type Props = React.ComponentProps<"button"> & {
  as?: "button" | "span";
};

export const Button: React.FC<Props> = ({
  children,
  as: Component = "button",
  className = "",
  ...props
}) => {
  return (
    <Component
      type={Component === "button" ? "button" : undefined}
      className={clsx(
        "relative inline-flex items-center rounded-md border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-500 focus:z-20",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
