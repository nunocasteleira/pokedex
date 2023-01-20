type NamedAPIResourceList<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
};
