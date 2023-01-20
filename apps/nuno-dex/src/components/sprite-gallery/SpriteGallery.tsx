import React, { useState } from "react";
import { flatten } from "common-functions";
import { Pagination } from "nuno-ui";
import { PokemonSprite } from "../pokemon-sprite";

type Props = {
  pokemon: Pokemon;
};

const SpriteGallery: React.FC<Props> = ({ pokemon }) => {
  const { sprites } = pokemon;
  const flattenedSprites = Object.values(flatten(sprites));
  const [spriteNumber, setSpriteNumber] = useState(0);

  return (
    <>
      <div className="relative mx-auto h-64 w-64">
        <PokemonSprite
          pokemonName={pokemon.name}
          spriteUrl={flattenedSprites[spriteNumber] as string}
          lighten
        />
      </div>
      <Pagination
        count={flattenedSprites.length}
        size={1}
        first={1}
        last={flattenedSprites.length}
        currentPage={spriteNumber + 1}
        onNextPage={() =>
          spriteNumber < flattenedSprites.length - 1 &&
          setSpriteNumber((prev) => prev + 1)
        }
        onPage={(page) => setSpriteNumber(page)}
        onPreviousPage={() =>
          spriteNumber > 0 && setSpriteNumber((prev) => prev - 1)
        }
      />
    </>
  );
};

export { SpriteGallery };
