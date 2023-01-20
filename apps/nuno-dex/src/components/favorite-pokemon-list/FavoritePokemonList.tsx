import { LifebuoyIcon } from "@heroicons/react/24/outline";
import { usePokemonStorage } from "@/context/pokemon-storage/pokemon-storage-context";
import { useGetPokemonFromList } from "../favorites-bar/queries/use-get-pokemon-from-list";
import { PokemonCard } from "../pokemon-card";

const FavoritePokemonList: React.FC = () => {
  const { favoritePokemon } = usePokemonStorage();
  const { pokemonList, pokemonListError, pokemonListLoading } =
    useGetPokemonFromList(favoritePokemon.map((id) => String(id)));

  if (favoritePokemon.length === 0) {
    return <p>No favorite Pokémon yet!</p>;
  }

  if (pokemonListError) {
    return <p>An error has occured!</p>;
  }

  if (pokemonListLoading) {
    return <LifebuoyIcon className="h-1/2 w-1/2 animate-bounce" />;
  }

  return (
    <>
      {pokemonList?.map((pokemon) => (
        <div className="w-full">
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        </div>
      ))}
    </>
  );
};

export { FavoritePokemonList };
