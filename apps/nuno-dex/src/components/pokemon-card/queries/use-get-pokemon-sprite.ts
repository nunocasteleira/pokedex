import useSWR from "swr";
import { GenericService } from "@/services/generic-service";

export function useGetPokemonSprite(url: string) {
  const { data, error, isLoading } = useSWR(url, () =>
    GenericService.getImage(url)
  );

  return {
    sprite: data,
    spriteError: error,
    spriteLoading: isLoading,
  };
}
