import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Error from "next/error";
import { useRouter } from "next/router";
import clsx from "clsx";
import {
  capitalize,
  useFormatDexNumber,
  useFormatPokemonName,
} from "common-functions";
import { Button, Pill } from "nuno-ui";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import { FavoriteIcon } from "@/components/favorite-icon";
import { PokemonFlavorGallery } from "@/components/pokemon-flavor-gallery";
import { SpriteGallery } from "@/components/sprite-gallery";
import { TypePills } from "@/components/type-pills";
import { usePokemonStorage } from "@/context/pokemon-storage/pokemon-storage-context";
import { PokemonService } from "@/services/pokemon-service";
import Layout from "./layout";

type Props = {
  count: number;
  errorCode: number | null;
  pokemon: Awaited<DetailedPokemon>;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const {
    query: { dex },
  } = context;
  const { errorCode: pokemonErrorCode, pokemon } =
    await PokemonService.getPokemon(dex as string);
  const {
    errorCode: pokemonListErrorCode,
    shortPokemon: { count },
  } = await PokemonService.getPokemonList();

  const errorCode: number | null = pokemonErrorCode || pokemonListErrorCode;

  return {
    props: {
      errorCode,
      pokemon,
      count,
    },
  };
};

function DexPage({
  count,
  errorCode,
  pokemon,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { formattedDexNumber } = useFormatDexNumber(pokemon.id);
  const { formattedPokemonName } = useFormatPokemonName(pokemon.name);
  const router = useRouter();
  const { favoritePokemon, toggleFavoritePokemon } = usePokemonStorage();

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  function hasPreviousPage() {
    return pokemon.id > 1;
  }

  function onPreviousPage() {
    hasPreviousPage() && router.push(String(pokemon.id - 1));
  }

  function hasNextPage() {
    return pokemon.id < count;
  }

  function onNextPage() {
    hasNextPage() && router.push(String(pokemon.id + 1));
  }

  return (
    <div className="max-h-full overflow-auto">
      <div className="mx-auto grid max-h-full max-w-7xl grid-cols-1 gap-y-2 overflow-auto lg:grid-cols-3">
        <section className="col-span-2 mx-auto w-full p-4 lg:col-span-3">
          <Button onClick={() => router.back()}>&larr; Back to List</Button>
        </section>
        <section className="mx-auto w-full">
          <SpriteGallery pokemon={pokemon} />
        </section>
        <section className="col-span-2 flex w-full flex-col gap-4 p-6">
          <button
            className="flex h-8 w-full justify-end px-10"
            onClick={() => toggleFavoritePokemon(pokemon.id)}
          >
            <FavoriteIcon
              className="w-8"
              favoritePokemon={favoritePokemon}
              id={pokemon.id}
            />
          </button>
          <div className="mb-2 flex flex-row items-center justify-between gap-2">
            <ArrowLeftCircleIcon
              className={clsx(
                "h-8 w-8",
                hasPreviousPage() ? "text-orange-400" : "text-orange-400/20"
              )}
              onClick={onPreviousPage}
            />
            <div className="pokedex-title-gradient flex h-full w-full flex-row items-center justify-around rounded-lg">
              <span>No. {formattedDexNumber}</span>
              <h2 className="text-slate-100">{formattedPokemonName}</h2>
            </div>
            <ArrowRightCircleIcon
              className={clsx(
                "h-8 w-8",
                hasNextPage() ? "text-slate-900" : "text-slate-900/20"
              )}
              onClick={onNextPage}
            />
          </div>

          <div className="mx-4 flex flex-col items-center justify-between px-6">
            <DexTableLine
              Left={({ className }) => <span className={className}>Type</span>}
              Right={({ className }) => (
                <ul className={className}>
                  <TypePills
                    types={pokemon.types.map((type) => type.type.name)}
                  />
                </ul>
              )}
            />

            <DexTableLine
              Left={({ className }) => (
                <span className={className}>Height</span>
              )}
              Right={({ className }) => (
                <span className={className}>{pokemon.height}</span>
              )}
            />

            <DexTableLine
              Left={({ className }) => (
                <span className={className}>Weight</span>
              )}
              Right={({ className }) => (
                <span className={className}>{pokemon.weight}</span>
              )}
            />

            <DexTableLine
              Left={({ className }) => (
                <span className={className}>Abilities</span>
              )}
              Right={({ className }) => (
                <ul className={clsx("gap-2", className)}>
                  {pokemon.abilities.map((ability) => (
                    <Pill key={ability.ability.name}>
                      {capitalize(ability.ability.name)}
                    </Pill>
                  ))}
                </ul>
              )}
            />
            <PokemonFlavorGallery species={pokemon} />
          </div>
        </section>
      </div>
    </div>
  );
}

type LineProps = {
  className: string;
};

type DexTableLineProps = {
  Left: React.ComponentType<LineProps>;
  Right: React.ComponentType<LineProps>;
};

const DexTableLine: React.FC<DexTableLineProps> = ({ Left, Right }) => (
  <div className="flex w-full flex-row">
    <Left className="w-full bg-slate-300 p-4 text-center" />
    <Right className="flex w-full flex-row p-4" />
  </div>
);

DexPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default DexPage;
