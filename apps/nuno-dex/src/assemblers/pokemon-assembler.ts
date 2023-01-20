export class PokemonAssembler {
  static fromFullPokemon(pokemon: Pokemon): ShortPokemon {
    return {
      id: pokemon.id,
      name: pokemon.name,
      default_sprite: pokemon.sprites.front_default,
      types: pokemon.types.map((type) => type.type.name),
    };
  }
}
