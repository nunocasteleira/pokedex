import clsx from "clsx";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";

type Props = {
  className?: string;
  favoritePokemon: number[];
  id: number;
};

const FavoriteIcon: React.FC<Props> = ({ className, favoritePokemon, id }) => {
  const Component = favoritePokemon.includes(id)
    ? SolidHeartIcon
    : OutlineHeartIcon;

  return <Component className={clsx("h-full w-full text-rose-600/70", className)} />;
};

export { FavoriteIcon };
