import { useEffect, useState } from "react";
import httpRequest from "../helpers/http";
import globalLinks from "../config/links";
import useAbortController from "./use-abort-controller";

export function useArticle({ link, provider }: { link: string, provider: string }) {
  const {newAbortSignal, cancelPreviousRequest} = useAbortController();
  const [article, setArticle] = useState({
    loading: true,
    data: null
  });

  useEffect(() => {
    async function load() {
      const articleLink = encodeURIComponent(`${link}`);
      const article = await httpRequest({
        url: `${globalLinks.article}/${provider}/${articleLink}`,
        requestConfig: {
          signal: newAbortSignal()
        }
      });
      setArticle({
        data: article,
        loading: false
      });
    }
    load();

    return () => {
      cancelPreviousRequest();
    }
  }, []);

  return [article] as const;
}