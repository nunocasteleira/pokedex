import { NextApiRequest, NextApiResponse } from "next";
import { validateQueryParams } from "@/middleware/validate-query-params";
import { dexQuerySchema } from "@/schemas/api/dex-query";

const BASE_URL = "https://pokeapi.co/api/v2";
const SERVICE_URL = "/pokemon";
const SPECIES_URL = "/pokemon-species";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const parsed = dexQuerySchema.parse(req.query);
  const { dex } = parsed;

  let pokemon: Awaited<ReturnType<typeof getPokemon>>;
  let species: Awaited<ReturnType<typeof getPokemonSpecies>>;

  try {
    pokemon = await getPokemon(dex);
    species = await getPokemonSpecies(dex);
  } catch (error) {
    return res.status(404).json({ error });
  }

  res.status(200).json({ ...pokemon, ...species });
};

async function getPokemon(dex: string): Promise<Pokemon> {
  const url = new URL(BASE_URL + SERVICE_URL + "/" + dex);
  const res = await fetch(url);
  return res.json();
}

async function getPokemonSpecies(dex: string): Promise<PokemonSpecies> {
  const url = new URL(BASE_URL + SPECIES_URL + "/" + dex);
  const res = await fetch(url);
  return res.json();
}

export default validateQueryParams<DetailedPokemon>(dexQuerySchema, handler);
