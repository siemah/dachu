import httpRequest from "../../utils/http";
import { initScraper, stringToUniqueNumber } from "../../utils/helpers";
import { handleAllSettledResults } from "../../utils/promises";
import { Context } from "hono";

/**
 * Get articles details from the houstonchronicle
 * @param req Received request instance
 * @returns list of articles
 */
async function getHoustonChron(req: Context["req"]) {
  const url = "https://www.houstonchronicle.com/texas-sports-nation/rockets/";
  const scraper = await initScraper(req, url);
  const scraperPreview = await initScraper(req, url);
  const linksPreview = await initScraper(req, url);
  const imagesPreview = await initScraper(req, url);
  // get featured article titles
  const headerElem = scraper.querySelector(".package .grid h2");
  const headersResponse = await headerElem.getText({ spaced: "" });
  const headers = headersResponse?.[scraper?.selector];
  // get top article preview
  const previewElem = scraperPreview.querySelector(".package .grid > :first-child div a:nth-child(n+2)");
  const previewResponse = await previewElem.getText({ spaced: "" });
  const preview = previewResponse?.[scraperPreview?.selector]?.[0];
  // get articles links
  const linksElem = linksPreview.querySelector(".package .grid h2 a");
  const links = await linksElem.getAttribute("href", false);
  // articles images
  const imagesElem = imagesPreview.querySelector(".package .grid img");
  const images = await imagesElem.getAttribute("src", false);
  const articles = headers.map((header, index) => ({
    id: stringToUniqueNumber(`hc-${index}-${links[index]}`),
    date: null,
    link: `https://www.houstonchronicle.com${links[index]}`,
    title: headers[index],
    image: images[index],
    preview: index === 0 ? preview : null,
    provider: {
      name: "Houston Chronicle",
      image: "https://pbs.twimg.com/profile_images/1578166120502140929/4wIP6Afi_400x400.jpg",
      link: "https://houstonchronicle.com"
    }
  }));

  return articles;
}

/**
 * Get Rockets news from many sources such as rocketswire, HC..
 * 
 * @returns list of articles from any sources
 */
export default async function getRocketsNews(req: Context["req"]) {
  console.log(`fetching wire...`)
  const wireResponse = await Promise.allSettled([
    httpRequest({
      url: "https://rocketswire.usatoday.com/wp-json/wp/v2/posts"
    }),
    getHoustonChron(req)
  ]);
  console.log(`wire done`)
  const [wireArticles = [], hcArticles = []] = handleAllSettledResults<any[]>(wireResponse);
  const rwArticles = wireArticles.map(article => ({
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
  }));
  const articles = [...hcArticles, ...rwArticles];

  return articles;
}