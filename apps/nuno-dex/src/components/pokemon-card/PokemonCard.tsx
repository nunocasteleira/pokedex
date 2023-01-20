import React, { ReactEventHandler } from "react";
import Link from "next/link";
import clsx from "clsx";
import { useFormatDexNumber, useFormatPokemonName } from "common-functions";
import { usePokemonStorage } from "@/context/pokemon-storage/pokemon-storage-context";
import { FavoriteIcon } from "../favorite-icon";
import { PokemonSprite } from "../pokemon-sprite";
import { TypePills } from "../type-pills";
import { useGetTypeBGStyles } from "./useGetTypeBGStyles";

type Props = {
  pokemon: ShortPokemon;
};

const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  const { favoritePokemon, toggleFavoritePokemon } = usePokemonStorage();

  const { formattedDexNumber } = useFormatDexNumber(pokemon.id);
  const { formattedPokemonName } = useFormatPokemonName(pokemon.name);
  const { bgClassName } = useGetTypeBGStyles(pokemon.types);

  const handleFavorite: ReactEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    toggleFavoritePokemon(pokemon.id);
  };

  return (
    <Link href={"/pokemon/" + String(pokemon.id)}>
      <article
        className={clsx(
          "group m-2 cursor-pointer rounded-lg p-4 shadow-lg",
          bgClassName
        )}
      >
        <section className="mb-4 flex flex-row items-baseline justify-between">
          <h3 className="text-2xl font-semibold text-slate-100/95">
            {formattedPokemonName}
          </h3>
          <span className="text-slate-100/70">{formattedDexNumber}</span>
        </section>
        <section className="mb-4">
          <TypePills types={pokemon.types} />
        </section>
        <section className="flex w-full flex-row items-baseline justify-between">
          <button onClick={handleFavorite} className="h-8 w-8">
            <FavoriteIcon favoritePokemon={favoritePokemon} id={pokemon.id} />
          </button>
          <div className="relative h-20 w-20 transition-all duration-300 group-hover:scale-125">
            <PokemonSprite
              pokemonName={pokemon.name}
              spriteUrl={pokemon.default_sprite}
            />
          </div>
        </section>
      </article>
    </Link>
  );
};

export { PokemonCard };
