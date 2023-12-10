import httpRequest from "../helpers/http";

export function getArticle(url: string) {
  return async () => {
    const res = await httpRequest({
      url
    });

    return res;
  }
}