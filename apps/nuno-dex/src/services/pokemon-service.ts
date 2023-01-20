import { PokemonAssembler } from "@/assemblers/pokemon-assembler";
import { ValidationError } from "@/models/validation-error";

const SERVICE_URL = "api/pokemon";

export type PokemonListResponse = {
  shortPokemon: NamedAPIResourceList<ShortPokemon>;
  errorCode: number | null;
};

export type PokemonResponse = {
  pokemon: DetailedPokemon & ValidationError;
  errorCode: number | null;
};

export class PokemonService {
  static async getPokemonList(
    page = "0",
    size = "20"
  ): Promise<PokemonListResponse> {
    const { NEXT_PUBLIC_SERVER_URL } = process.env;

    const url = new URL(SERVICE_URL, NEXT_PUBLIC_SERVER_URL);
    url.searchParams.set("page", page);
    url.searchParams.set("size", size);

    const res = await fetch(url);
    const errorCode = res.ok ? null : res.status;
    return { errorCode, shortPokemon: await res.json() };
  }

  static async getPokemon(dex: string): Promise<PokemonResponse> {
    const { NEXT_PUBLIC_SERVER_URL } = process.env;

    const url = new URL(SERVICE_URL + "/" + dex, NEXT_PUBLIC_SERVER_URL);
    const res = await fetch(url);
    const errorCode = res.ok ? null : res.status;
    return { errorCode, pokemon: await res.json() };
  }

  static async getPokemonFromList(list: string[]): Promise<ShortPokemon[]> {
    const { NEXT_PUBLIC_SERVER_URL } = process.env;

    const result = list.map(async (dex) => {
      const url = new URL(SERVICE_URL + "/" + dex, NEXT_PUBLIC_SERVER_URL);
      const res = await fetch(url);
      return PokemonAssembler.fromFullPokemon(await res.json());
    });

    return Promise.all(result);
  }
}
