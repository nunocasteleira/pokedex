type PokemonStorageState = {
  favoritePokemonId: Array<number>;
  isFavoritesModalOpen: boolean;
};

const initialPokemonStorageState: PokemonStorageState = {
  favoritePokemonId: [],
  isFavoritesModalOpen: false,
};

export type { PokemonStorageState };
export { initialPokemonStorageState };
