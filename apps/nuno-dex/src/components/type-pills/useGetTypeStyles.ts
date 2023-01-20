function useGetTypeStyles(type: string) {
  const TypeClassNames: Record<POKE_TYPES, string> = {
    NORMAL: "bg-stone-400 text-white",
    FIRE: "bg-orange-500 text-white",
    FIGHTING: "bg-red-700 text-white",
    WATER: "bg-blue-400 text-white",
    FLYING: "bg-purple-400 text-white",
    GRASS: "bg-green-500 text-white",
    POISON: "bg-fuchsia-800 text-white",
    ELECTRIC: "bg-yellow-300 text-white",
    GROUND: "bg-orange-300 text-white",
    PSYCHIC: "bg-rose-500 text-white",
    ROCK: "bg-yellow-700 text-white",
    ICE: "bg-sky-200 text-white",
    BUG: "bg-lime-600 text-white",
    DRAGON: "bg-indigo-600 text-white",
    GHOST: "bg-violet-800 text-white",
    DARK: "bg-yellow-900 text-white",
    STEEL: "bg-slate-400 text-white",
    FAIRY: "bg-rose-200 text-white",
  };

  const typeClassName = TypeClassNames[type.toUpperCase() as POKE_TYPES] ?? "";
  return { typeClassName };
}

export { useGetTypeStyles };
