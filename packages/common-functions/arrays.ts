function toggleValueInArray<T>(arr: Array<T>, value: T): Array<T> {
  if (arr.includes(value)) {
    return [...arr.filter((v) => v !== value).sort()];
  }
  return [...[...arr, value].sort()];
}

export { toggleValueInArray };
