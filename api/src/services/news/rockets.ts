import httpRequest from "../../utils/http";
import { handleAllSettledResults } from "../../utils/promises";

/**
 * Get Rockets news from many sources such as rocketswire..
 * 
 * @returns list of articles from any sources
 */
export default async function getRocketsNews() {
  const wireResponse = await Promise.allSettled([
    httpRequest({
      url: "https://rocketswire.usatoday.com/wp-json/wp/v2/posts"
    }),
  ]);
  const [wireArticles] = handleAllSettledResults<any[]>(wireResponse);
  const articles = wireArticles.map(article => ({
    id: article.id,
    date: article.date_gmt,
    link: article.link,
    title: article.title.rendered,
    image: article.jetpack_featured_media_url,
    provider: {
      name: "Rockets wire",
      image: "https://pbs.twimg.com/profile_images/910372928382029824/bJpUPj1l_400x400.jpg",
      link: "https://rocketswire.usatoday.com"
    }
  }))

  return articles;
}