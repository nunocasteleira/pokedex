import { toggleValueInArray } from "common-functions";
import { PokemonStorageState } from "./pokemon-storage-state";

type PokemonStorageDispatch = (action: PokemonStorageAction) => void;

const PokemonStorageActionKind = {
  clearFavoritePokemon: "clearFavoritePokemon",
  initPokemonStorage: "initPokemonStorage",
  setFavoritesModal: "setFavoritesModal",
  toggleFavoritePokemon: "toggleFavoritePokemon",
} as const;

type ClearFavoritePokemonAction = {
  type: typeof PokemonStorageActionKind.clearFavoritePokemon;
};

type InitPokemonStorageAction = {
  type: typeof PokemonStorageActionKind.initPokemonStorage;
  payload: PokemonStorageState;
};

type SetFavoritesModalAction = {
  type: typeof PokemonStorageActionKind.setFavoritesModal;
  payload: boolean;
};

type TogglePokemonAction = {
  type: typeof PokemonStorageActionKind.toggleFavoritePokemon;
  payload: number;
};

type PokemonStorageAction =
  | ClearFavoritePokemonAction
  | InitPokemonStorageAction
  | SetFavoritesModalAction
  | TogglePokemonAction;

type PokemonStorageReducer = {
  (
    state: PokemonStorageState,
    action: PokemonStorageAction
  ): PokemonStorageState;
};
const pokemonStorageReducer: PokemonStorageReducer = (state, action) => {
  switch (action.type) {
    case PokemonStorageActionKind.clearFavoritePokemon: {
      return { ...state, favoritePokemonId: [], isFavoritesModalOpen: false };
    }
    case PokemonStorageActionKind.initPokemonStorage: {
      return { ...action.payload };
    }
    case PokemonStorageActionKind.setFavoritesModal: {
      return { ...state, isFavoritesModalOpen: action.payload };
    }
    case PokemonStorageActionKind.toggleFavoritePokemon: {
      const updatedFavoritePokemon = toggleValueInArray(
        state.favoritePokemonId,
        action.payload
      );
      return { ...state, favoritePokemonId: updatedFavoritePokemon };
    }
    default: {
      const { type } = action;
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

type PokemonStorageReducerFn<T> = {
  (payload: T, dispatch: PokemonStorageDispatch): void;
};

const clearFavoritePokemon: PokemonStorageReducerFn<null> = (
  _payload,
  dispatch
) => {
  return dispatch({
    type: PokemonStorageActionKind.clearFavoritePokemon,
  });
};

const toggleFavoritePokemon: PokemonStorageReducerFn<number> = (
  payload,
  dispatch
) => {
  return dispatch({
    type: PokemonStorageActionKind.toggleFavoritePokemon,
    payload,
  });
};

const setFavoritesModal: PokemonStorageReducerFn<boolean> = (
  payload,
  dispatch
) => {
  return dispatch({
    type: PokemonStorageActionKind.setFavoritesModal,
    payload,
  });
};

const helperFunctions = (dispatch: PokemonStorageDispatch) => {
  return {
    clearFavoritePokemon: () => clearFavoritePokemon(null, dispatch),
    toggleFavoritePokemon: (id: number) => toggleFavoritePokemon(id, dispatch),
    setFavoritesModal: (isOpen: boolean) => setFavoritesModal(isOpen, dispatch),
  };
};

export type { PokemonStorageAction, PokemonStorageDispatch };
export { pokemonStorageReducer, PokemonStorageActionKind, helperFunctions };
