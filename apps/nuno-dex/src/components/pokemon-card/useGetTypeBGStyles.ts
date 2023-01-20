function useGetTypeBGStyles(types: string[]) {
  const firstType = types[0] ?? "";
  const secondType = types[1] ?? firstType;

  const fromClassNames: Record<POKE_TYPES, string> = {
    NORMAL: "from-stone-300",
    FIRE: "from-orange-400",
    FIGHTING: "from-red-600",
    WATER: "from-blue-300",
    FLYING: "from-purple-300",
    GRASS: "from-green-400",
    POISON: "from-fuchsia-700",
    ELECTRIC: "from-yellow-200",
    GROUND: "from-orange-200",
    PSYCHIC: "from-rose-400",
    ROCK: "from-yellow-600",
    ICE: "from-sky-100",
    BUG: "from-lime-500",
    DRAGON: "from-indigo-500",
    GHOST: "from-violet-700",
    DARK: "from-yellow-800",
    STEEL: "from-slate-300",
    FAIRY: "from-rose-200",
  };
  const toClassNames: Record<POKE_TYPES, string> = {
    NORMAL: "to-stone-400",
    FIRE: "to-orange-500",
    FIGHTING: "to-bred-700",
    WATER: "to-blue-400",
    FLYING: "to-purple-400",
    GRASS: "to-green-500",
    POISON: "to-fuchsia-800",
    ELECTRIC: "to-yellow-300",
    GROUND: "to-orange-300",
    PSYCHIC: "to-brose-500",
    ROCK: "to-yellow-700",
    ICE: "to-sky-200",
    BUG: "to-lime-600",
    DRAGON: "to-indigo-600",
    GHOST: "to-violet-800",
    DARK: "to-yellow-900",
    STEEL: "to-slate-400",
    FAIRY: "to-rose-300",
  };

  const bgClassName = types
    ? "bg-gradient-to-br " +
      fromClassNames[firstType.toUpperCase() as POKE_TYPES] +
      " " +
      toClassNames[secondType.toUpperCase() as POKE_TYPES]
    : "";
  return { bgClassName };
}

export { useGetTypeBGStyles };
