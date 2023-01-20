import React from "react";
import { Dialog } from "@headlessui/react";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePokemonStorage } from "@/context/pokemon-storage/pokemon-storage-context";
import { FavoritePokemonList } from "../favorite-pokemon-list/FavoritePokemonList";

const FavoritesBar: React.FC = () => {
  const { isFavoritesModalOpen, setFavoritesModal, clearFavoritePokemon } =
    usePokemonStorage();

  const closeModal = () => setFavoritesModal(false);

  return (
    <Dialog
      as="aside"
      open={isFavoritesModalOpen}
      onClose={closeModal}
      className="relative z-50"
    >
      <Dialog.Backdrop
        className="fixed inset-0 bg-black/30"
        aria-hidden="true"
      />
      <div className="fixed inset-y-0 right-0 w-screen sm:w-96">
        <Dialog.Panel className="flex h-screen w-screen flex-col rounded bg-red-800 p-6 text-slate-100 sm:max-w-sm">
          <div className="flex flex-row items-center justify-between pt-8">
            <Dialog.Title
              as="h3"
              className="text-xl font-semibold tracking-tight"
            >
              Favorite Pokémon
            </Dialog.Title>
            <button onClick={closeModal} className="h-8 w-8">
              <XMarkIcon />
            </button>
          </div>
          <div className="flex h-full flex-col gap-2 overflow-auto p-2">
            <FavoritePokemonList />
          </div>
          <div className="flex w-full flex-row justify-end py-4">
            <button onClick={clearFavoritePokemon} className="h-8 w-8">
              <TrashIcon />
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export { FavoritesBar };
