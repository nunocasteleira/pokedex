import React from "react";
import { PokemonCard } from "../pokemon-card";

type Props = {
  pokemon: NamedAPIResourceList<ShortPokemon>;
};

export const PokemonList: React.FC<Props> = ({ pokemon }) => {
  const { results } = pokemon;

  return (
    <>
      <div className=" h-full flex-[1_1_100%] overflow-auto">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {results.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      </div>
    </>
  );
};
