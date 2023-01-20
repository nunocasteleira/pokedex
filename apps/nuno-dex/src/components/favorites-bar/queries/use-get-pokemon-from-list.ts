import useSWR from "swr";
import { PokemonService } from "@/services/pokemon-service";

export function useGetPokemonFromList(id: string[]) {
  const { data, error, isLoading } = useSWR(id, () =>
    PokemonService.getPokemonFromList(id)
  );

  return {
    pokemonList: data,
    pokemonListError: error,
    pokemonListLoading: isLoading,
  };
}
