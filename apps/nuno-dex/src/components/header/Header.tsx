import React from "react";
import Link from "next/link";
import PokeBall from "public/images/PokeBall.svg";
import { FavoriteAvatars } from "../favorite-avatars";

const Header: React.FC = () => {
  return (
    <header className="w-full flex-none bg-red-600">
      <nav className="h-30 mx-auto flex max-w-7xl flex-wrap items-center justify-between p-6">
        <Link href={"/"} className="flex-no-shrink mr-6 flex items-center text-white">
            <PokeBall className="mr-2 h-8 w-8" alt="Nuno&rsquo;s Pokédex" />
            <span className="text-xl font-semibold tracking-tight">
              Nuno&rsquo;s Pokédex
            </span>
        </Link>

        <FavoriteAvatars />
      </nav>
    </header>
  );
};

export { Header };
