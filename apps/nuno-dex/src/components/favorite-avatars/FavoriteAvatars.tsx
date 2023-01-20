import React from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { usePokemonStorage } from "@/context/pokemon-storage/pokemon-storage-context";
import { useGetPokemonFromList } from "../favorites-bar/queries/use-get-pokemon-from-list";
import { PokemonSprite } from "../pokemon-sprite";

const FavoriteAvatars: React.FC = () => {
  const { favoritePokemon, setFavoritesModal } = usePokemonStorage();
  const favoritePokemonList = favoritePokemon.map((id) => String(id));

  const { pokemonList, pokemonListError, pokemonListLoading } =
    useGetPokemonFromList(favoritePokemonList);

  const onClick = () => setFavoritesModal(true);

  if (favoritePokemon.length === 0) {
    return (
      <button
        className="overflow group relative flex -space-x-8 hover:-space-x-4 focus:outline-none [&>*]:transition-[margin]"
        onClick={onClick}
      >
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-rose-600/70 ring-2 ring-red-800 group-focus:ring-slate-200 group-focus:ring-offset-2 group-focus:ring-offset-red-700">
          <HeartIcon className="h-8 w-8" />
        </div>
      </button>
    );
  }

  if (pokemonListError || pokemonListLoading || !pokemonList) {
    return null;
  }

  return (
    <button
      className="overflow group relative flex -space-x-8 hover:-space-x-4 focus:outline-none [&>*]:transition-[margin]"
      onClick={onClick}
    >
      {[...pokemonList.sort().slice(0, 3).reverse()].map((pokemon) => (
        <div className="relative h-12 w-12 rounded-full bg-red-100 ring-2 ring-red-800 group-focus:ring-slate-200 group-focus:ring-offset-2 group-focus:ring-offset-red-700">
          <PokemonSprite
            pokemonName={pokemon.name}
            spriteUrl={pokemon.default_sprite}
          />
        </div>
      ))}
    </button>
  );
};

export { FavoriteAvatars };
