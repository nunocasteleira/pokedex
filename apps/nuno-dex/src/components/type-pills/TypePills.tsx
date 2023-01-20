import React from "react";
import clsx from "clsx";
import { capitalize } from "common-functions";
import { Pill } from "nuno-ui";
import { TypeSvg } from "./TypeSvg";
import { useGetTypeStyles } from "./useGetTypeStyles";

type Props = {
  types: ShortPokemon["types"];
};

const TypePills: React.FC<Props> = ({ types }) => (
  <>
    {types.map((type) => (
      <TypePill key={type} type={type} />
    ))}
  </>
);

const TypePill = ({ type }: { type: string }) => {
  const { typeClassName } = useGetTypeStyles(type);

  return Boolean(type) ? (
    <Pill
      className={clsx(
        "inline-flex items-center justify-between gap-1 border-transparent",
        typeClassName
      )}
    >
      <TypeSvg type={type} />
      {capitalize(type)}
    </Pill>
  ) : null;
};

export { TypePills };
