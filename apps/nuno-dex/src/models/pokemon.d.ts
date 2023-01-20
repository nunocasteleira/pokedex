type Pokemon = {
  id: number;
  abilities: PokemonAbility[];
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  sprites: PokemonSprites;
  types: PokemonType[];
};
