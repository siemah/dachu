import { initScraper } from "../../utils/helpers";
import httpRequest from "../../utils/http";

/**
 * Get/extract article content by provider
 * 
 * @param provider name of the provider
 * @param link url to the article an api or a web page
 */
export async function getArticleContent({
  provider,
  link,
  request
}: {
  provider: string,
  link: string;
  request: Request;
}) {
  let article = {};
  // from wire sources such as rockets/celtics wire
  if (provider.includes("wire") === true) {
    article = await getArticleFromWire(link, request);
  } else if (/houston chronicle/i.test(provider) === true) {
    // from houston chronicle
    article = await getArticleFromChronicle(link, request);
  }
  // todo: from chronicle
  // todo: from onfootball
  return article;
}

/**
 * Get article body beside author details
 * 
 * @param url webpage link
 * @param req user request
 * @returns article content with extra details about author
 */
async function getArticleFromWire(url: string, req: Request) {
  const bodyScraper = await initScraper(req, url);
  const extraDataScraper = await initScraper(req, url);
  const authorLinkScraper = await initScraper(req, url);
  // body
  const articleBody = bodyScraper.querySelector("[itemprop=articleBody]");
  const bodyResponse = await articleBody.getText({ spaced: "" });
  const [articleContent = "N/A"] = bodyResponse?.[bodyScraper?.selector];
  // author + date
  const authorBody = extraDataScraper.querySelector("[type='application/ld+json']");
  const authorResponse = await authorBody.getText({ spaced: "" });
  const [articleExtraData = "{}"] = authorResponse?.[authorBody?.selector];
  const extraData = JSON.parse(articleExtraData);
  const authorName = extraData?.author?.name || "N/A";
  const date = extraData?.datePublished || null;
  // author link
  const authorLinkBody = authorLinkScraper.querySelector("[itemprop=author] a");
  const authorLink = await authorLinkBody.getAttribute("href");

  return {
    content: articleContent,
    date,
    author: {
      name: authorName,
      link: authorLink,
      jobTitle: null
    }
  };
}

/**
 * Get article body beside author details from houston chronicle
 * 
 * @param url webpage link
 * @param req user request
 * @returns article content with extra details about author
 */
async function getArticleFromChronicle(url: string, req: Request) {
  const extraDataScraper = await initScraper(req, url);
  // body + author + date
  const authorBody = extraDataScraper.querySelector("[type='application/ld+json']");
  const authorResponse = await authorBody.getText({ spaced: "" });
  const [articleExtraData = "{}"] = authorResponse?.[authorBody?.selector];
  const extraData = JSON.parse(articleExtraData);
  const content = extraData?.articleBody || "N/A";
  const description = extraData?.description || null;
  const authorName = extraData?.author?.[0]?.name || "N/A";
  const authorLink = extraData?.author?.[0]?.url || null;
  const authorJobTitle = extraData?.author?.[0]?.jobTitle || null;
  const date = extraData?.datePublished || null;

  return {
    content: content,
    description,
    date,
    author: {
      name: authorName,
      link: authorLink,
      jobTitle: authorJobTitle
    }
  };
}