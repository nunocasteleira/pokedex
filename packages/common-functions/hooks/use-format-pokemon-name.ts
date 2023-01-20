import { capitalize } from "../string";

function useFormatPokemonName(name: string | undefined) {
  const formattedPokemonName = name ? capitalize(name) : "";
  return { formattedPokemonName };
}

export { useFormatPokemonName };
