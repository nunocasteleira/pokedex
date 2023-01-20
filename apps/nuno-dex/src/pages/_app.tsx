import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";
import { PokemonStorageProvider } from "@/context/pokemon-storage/pokemon-storage-context";
import "@/styles/globals.css";

// eslint-disable-next-line @typescript-eslint/ban-types -- copied from Next.js documentation
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CookiesProvider>
      <PokemonStorageProvider>
        {getLayout(<Component {...pageProps} />)}
      </PokemonStorageProvider>
    </CookiesProvider>
  );
}
