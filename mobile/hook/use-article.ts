import globalLinks from "../config/links";
import { useQuery } from "react-query";
import { getArticle } from "../services/article";

export function useArticle({ link, provider }: { link: string, provider: string }) {
  const articleLink = encodeURIComponent(`${link}`);
  const query = useQuery({
    queryKey: `${globalLinks.article}/${provider}/${articleLink}`,
    queryFn: getArticle(`${globalLinks.article}/${provider}/${articleLink}`)
  });
  return [
    {
      loading: query.isFetching,
      data: query.data
    }
  ] as const;
}