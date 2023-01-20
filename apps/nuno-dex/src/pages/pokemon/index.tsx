import React, { useEffect } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Error from "next/error";
import { useRouter } from "next/router";
import { Pagination } from "nuno-ui";
import { PokemonCard } from "@/components/pokemon-card";
import { listQuerySchema } from "@/schemas/api/list-query";
import { PokemonService } from "@/services/pokemon-service";
import Layout from "./layout";

export const DEFAULT_PARAMETERS = {
  defaultPage: 1,
  defaultSize: 20,
};

export function navigateToPageWithSize(page: number, size: number) {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("size", String(size));

  return `?${params.toString()}`;
}

type Props = {
  errorCode: number | null;
  page: number;
  pokemonList?: Awaited<NamedAPIResourceList<ShortPokemon>>;
  size: number;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const parsed = listQuerySchema.safeParse(context.query);
  if (!parsed.success) {
    return {
      props: {
        errorCode: 400,
        page: 0,
        size: 0,
      },
    };
  }

  const { page, size } = parsed.data;
  const { errorCode, shortPokemon: pokemonList } =
    await PokemonService.getPokemonList(page, size);

  return {
    props: {
      errorCode,
      page: +page,
      pokemonList,
      size: +size,
    },
  };
};

function Home({
  errorCode,
  page,
  pokemonList,
  size,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const {
    query: { page: routerPage, size: routerSize },
  } = router;
  useEffect(() => {
    // Always do navigations after the first render
    !Boolean(routerPage) &&
      router.push(
        "pokemon" +
          navigateToPageWithSize(
            DEFAULT_PARAMETERS.defaultPage,
            DEFAULT_PARAMETERS.defaultSize
          )
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  if (!pokemonList) {
    return <p>No results!</p>;
  }

  function onPage(newPage: number) {
    pokemonList?.next &&
      router.push(
        navigateToPageWithSize(newPage + 1, Number(routerSize) ?? size ?? 20)
      );
  }

  function onNextPage() {
    pokemonList?.next &&
      router.push(
        navigateToPageWithSize(page + 1, Number(routerSize) ?? size ?? 20)
      );
  }

  function onPreviousPage() {
    pokemonList?.previous &&
      router.push(
        navigateToPageWithSize(page - 1, Number(routerSize) ?? size ?? 20)
      );
  }

  function getFirst() {
    return pokemonList ? (page - 1) * pokemonList.results.length + 1 : 0;
  }

  function getLast() {
    return pokemonList ? page * pokemonList.results.length : 0;
  }

  return (
    <section className="flex max-h-full w-full flex-col">
      <div className="h-full flex-[1_1_100%] overflow-auto">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-2 sm:px-4 md:grid-cols-3 lg:grid-cols-4">
          {pokemonList.results.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      </div>
      <Pagination
        count={pokemonList.count}
        size={size}
        first={getFirst()}
        last={getLast()}
        currentPage={page}
        onNextPage={onNextPage}
        onPage={onPage}
        onPreviousPage={onPreviousPage}
        className="mx-auto w-full max-w-7xl flex-none bg-slate-50"
      />
    </section>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
