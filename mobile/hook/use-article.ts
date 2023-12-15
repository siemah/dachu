import globalLinks from "../config/links";
import { useQuery } from "react-query";
import { getArticle } from "../services/article";
import { Article } from "../types/data";

type UseArticle = {
  link: string;
  provider: string;
  fromBookmark?: Article | null;
};

export function useArticle({ link, provider, fromBookmark }: UseArticle) {
  const articleLink = encodeURIComponent(`${link}`);
  const query = useQuery({
    queryKey: `${globalLinks.article}/${provider}/${articleLink}`,
    queryFn: getArticle(`${globalLinks.article}/${provider}/${articleLink}`),
    enabled: fromBookmark === null ? true : false,
  });

  return [
    {
      loading: query.isFetching,
      data: fromBookmark || query.data
    },
    query
  ] as const;
}