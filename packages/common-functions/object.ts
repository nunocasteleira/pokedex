/* eslint-disable @typescript-eslint/no-explicit-any */
function flatten(obj: any): any {
  return Object.keys(obj || {}).reduce<any>((acc, cur) => {
    if (typeof obj[cur] === "object") {
      acc = { ...acc, ...flatten(obj[cur]) };
    } else {
      acc[cur] = obj[cur];
    }
    return acc;
  }, {});
}

export { flatten };
