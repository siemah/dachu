import httpRequest from "../../utils/http";
import { handleAllSettledResults } from "../../utils/promises";

/**
 * Get Celtics news from many sources such as Celticswire..
 * 
 * @returns list of articles from any sources
 */
export default async function getCelticsNews() {
  const wireResponse = await Promise.allSettled([
    httpRequest({
      url: "https://celticswire.usatoday.com/wp-json/wp/v2/posts"
    }),
  ]);
  const [wireArticles] = handleAllSettledResults<any[]>(wireResponse);
  const articles = wireArticles?.map(article => ({
    id: article.id,
    date: article.date_gmt,
    link: article.link,
    title: article.title.rendered,
    image: article.jetpack_featured_media_url,
    provider: {
      name: "Celtics wire",
      image: "https://pbs.twimg.com/profile_images/910372717983125504/o-UOh3-a_400x400.jpg",
      link: "https://celticswire.usatoday.com"
    }
  }))

  return articles||[];
}