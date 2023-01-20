export class GenericService {
  static async getImage(url: string) {
    const res = await fetch(url);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  }
}
