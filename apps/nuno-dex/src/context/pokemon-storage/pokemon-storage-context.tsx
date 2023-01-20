import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useCookies } from "react-cookie";
import { cookieConfig } from "@/config/cookie-config";
import {
  helperFunctions,
  PokemonStorageActionKind,
  PokemonStorageDispatch,
  pokemonStorageReducer,
} from "./pokemon-storage-reducer";
import {
  initialPokemonStorageState,
  PokemonStorageState,
} from "./pokemon-storage-state";

type Props = { children: React.ReactNode };

type PokemonStorageContextType = {
  state: PokemonStorageState;
  dispatch: PokemonStorageDispatch;
};

const PokemonStorageContext = createContext<PokemonStorageContextType>({
  state: initialPokemonStorageState,
  dispatch: () => undefined,
});

const LOCAL_POKEMON_STORAGE = "pokemonStorage";

function PokemonStorageProvider({ children }: Props) {
  const [cookies, setCookies] = useCookies([LOCAL_POKEMON_STORAGE]);
  const [state, dispatch] = useReducer(
    pokemonStorageReducer,
    initialPokemonStorageState
  );

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  useEffect(() => {
    if (cookies[LOCAL_POKEMON_STORAGE]) {
      dispatch({
        type: PokemonStorageActionKind.initPokemonStorage,
        payload: cookies.pokemonStorage ?? initialPokemonStorageState,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- should only run on first load
  }, []);

  useEffect(() => {
    if (state !== initialPokemonStorageState) {
      setCookies(LOCAL_POKEMON_STORAGE, state, cookieConfig);
    }
  }, [setCookies, state]);

  return (
    <PokemonStorageContext.Provider value={value}>
      {children}
    </PokemonStorageContext.Provider>
  );
}

function usePokemonStorage() {
  const context = useContext(PokemonStorageContext);

  if (context === undefined) {
    throw new Error(
      "usePokemonStorage must be used within a PokemonStorageProvider"
    );
  }

  const { state, dispatch } = context;
  const { favoritePokemonId, isFavoritesModalOpen } = state;

  const returnedState = {
    favoritePokemon: favoritePokemonId,
    isFavoritesModalOpen,
  };

  return { ...returnedState, ...helperFunctions(dispatch) };
}

PokemonStorageContext.displayName = "PokemonStorageContext";

export { PokemonStorageProvider, usePokemonStorage };
