import React, { lazy, Suspense } from "react";

const NormalIcon = lazy(() => import("public/images/types/normal.svg"));
const FireIcon = lazy(() => import("public/images/types/fire.svg"));
const FightingIcon = lazy(() => import("public/images/types/fighting.svg"));
const WaterIcon = lazy(() => import("public/images/types/water.svg"));
const FLyingIcon = lazy(() => import("public/images/types/flying.svg"));
const GrassIcon = lazy(() => import("public/images/types/grass.svg"));
const PoisonIcon = lazy(() => import("public/images/types/poison.svg"));
const ElectricIcon = lazy(() => import("public/images/types/electric.svg"));
const GroundIcon = lazy(() => import("public/images/types/ground.svg"));
const PsychicIcon = lazy(() => import("public/images/types/psychic.svg"));
const RockIcon = lazy(() => import("public/images/types/rock.svg"));
const IceIcon = lazy(() => import("public/images/types/ice.svg"));
const BugIcon = lazy(() => import("public/images/types/bug.svg"));
const DragonIcon = lazy(() => import("public/images/types/dragon.svg"));
const GhostIcon = lazy(() => import("public/images/types/ghost.svg"));
const DarkIcon = lazy(() => import("public/images/types/dark.svg"));
const SteelIcon = lazy(() => import("public/images/types/steel.svg"));
const FairyIcon = lazy(() => import("public/images/types/fairy.svg"));

type Props = {
  type: string;
};

const TypeSvg: React.FC<Props> = ({ type }) => {
  const TypeSvgs: Record<
    POKE_TYPES,
    React.ComponentType<{ className: string }>
  > = {
    NORMAL: NormalIcon,
    FIRE: FireIcon,
    FIGHTING: FightingIcon,
    WATER: WaterIcon,
    FLYING: FLyingIcon,
    GRASS: GrassIcon,
    POISON: PoisonIcon,
    ELECTRIC: ElectricIcon,
    GROUND: GroundIcon,
    PSYCHIC: PsychicIcon,
    ROCK: RockIcon,
    ICE: IceIcon,
    BUG: BugIcon,
    DRAGON: DragonIcon,
    GHOST: GhostIcon,
    DARK: DarkIcon,
    STEEL: SteelIcon,
    FAIRY: FairyIcon,
  };

  const TypeSvg = TypeSvgs[type.toUpperCase() as POKE_TYPES];
  return (
    <Suspense>
      <TypeSvg className="h-4 w-4" />
    </Suspense>
  );
};

export { TypeSvg };
