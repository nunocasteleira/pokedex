import React, { useState } from "react";
import { capitalize } from "common-functions";
import { Pagination, Pill } from "nuno-ui";

type Props = {
  species: PokemonSpecies;
};

const PokemonFlavorGallery: React.FC<Props> = ({ species }) => {
  const { flavor_text_entries } = species;
  const [flavorText, setFlavorText] = useState(0);

  return (
    <div className="flex w-full flex-col items-center justify-center bg-slate-300">
      <PokemonFlavor flavorText={flavor_text_entries[flavorText]} />
      <Pagination
        count={flavor_text_entries.length}
        size={1}
        currentPage={flavorText + 1}
        first={1}
        last={flavor_text_entries.length}
        onPage={(page: number) => {
          setFlavorText(page);
        }}
        onPreviousPage={() =>
          flavorText > 0 && setFlavorText((prev) => prev - 1)
        }
        onNextPage={() =>
          flavorText < flavor_text_entries.length - 1 &&
          setFlavorText((prev) => prev + 1)
        }
      />
    </div>
  );
};

const PokemonFlavor: React.FC<{ flavorText: FlavorText }> = ({
  flavorText,
}) => {
  return (
    <div className="flex max-w-lg flex-col gap-2 bg-slate-300 p-4 leading-6">
      <p>{flavorText.flavor_text}</p>
      <span>
        Language:{" "}
        <Pill className="ml-2 bg-slate-100">
          {flavorText.language.name.toUpperCase()}
        </Pill>
      </span>
      <span>
        Version:
        <Pill className="ml-2 bg-slate-100">
          {capitalize(flavorText.version.name)}
        </Pill>
      </span>
    </div>
  );
};

export { PokemonFlavorGallery };
