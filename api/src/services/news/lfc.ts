import { Context } from "hono";
import httpRequest from "../../utils/http";
import { handleAllSettledResults } from "../../utils/promises";

/**
 * Get Celtics news from many sources such as Celticswire..
 * 
 * @returns list of articles from any sources
 */
export default async function getLfcNews(req: Context["req"]) {
  const responses = await Promise.allSettled([
    httpRequest({
      url: "https://api.onefootball.com/web-experience/en/team/liverpool-18/news",
      requestConfig: {
        headers: req.headers
      }
    }),
  ]);
  const [{ containers: oneFootArticles = [] }] = handleAllSettledResults(responses);
  const onefootHeadlines = oneFootArticles[3]?.fullWidth?.component?.gallery?.teasers;
  const onefootNews = oneFootArticles[5]?.fullWidth?.component?.gallery?.teasers;
  const onefootArticles = [...onefootHeadlines, ...onefootNews];
  let articles = [];
  onefootArticles?.forEach(article => {
    articles.push({
      id: article?.id,
      title: article?.title,
      preview: article?.preview,
      date: article?.publishTimestamp,
      link: `https://onefootball.com${article?.link}`,
      image: article?.imageObject?.path,
      provider: {
        origin: article?.publisherName,
        name: "Onefootball",
        image: article?.publisherImageObject?.path,
        link: null
      }
    })
  })

  return articles || [];
}