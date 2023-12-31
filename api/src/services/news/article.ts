import { Context } from "hono";
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
  request: Context["req"];
}) {
  let article = {};
  // from wire sources such as rockets/celtics wire
  if (provider.includes("wire") === true) {
    article = await getArticleFromWire(link, request);
  } else if (/houston chronicle/i.test(provider) === true) {
    // from houston chronicle
    article = await getArticleFromChronicle(link, request);
  } else if (provider.toLowerCase().includes("onefootbal")) {
    article = await getArticleFromOnefootball(link, request);
  }

  return article;
}

/**
 * Get article body beside author details
 * 
 * @param url webpage link
 * @param req user request
 * @returns article content with extra details about author
 */
async function getArticleFromWire(url: string, req: Context["req"]) {
  const bodyScraper = await initScraper(req, url);
  const authorNameScraper = await initScraper(req, url);
  const dateScraper = await initScraper(req, url);
  const authorLinkScraper = await initScraper(req, url);
  // body
  const articleBody = bodyScraper.querySelector("[itemprop=articleBody]");
  const bodyResponse = await articleBody.getText({ spaced: "" });
  const [articleContent = "N/A"] = bodyResponse?.[bodyScraper?.selector];
  // author name
  const authorBody = authorNameScraper.querySelector("[itemprop='author'] [itemprop='name']");
  const authorResponse = await authorBody.getText({ spaced: "" });
  const [authorName = "N/A"] = authorResponse?.[authorBody?.selector];
  // date
  const dateElement = dateScraper.querySelector("[itemprop='author'] .article__author__date");
  const dateResponse = await dateElement.getText({ spaced: "" });
  const [rawDate] = dateResponse?.[dateElement?.selector];
  const date = rawDate?.substring(0, rawDate?.length - 2)?.trim();
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
async function getArticleFromChronicle(url: string, req: Context['req']) {
  const extraDataScraper = await initScraper(req, url);
  // body + author + date
  const authorBody = extraDataScraper.querySelector("[type='application/ld+json']");
  const authorResponse = await authorBody.getText({ spaced: "" });
  const [articleExtraData = "{}"] = authorResponse?.[authorBody?.selector];
  const extraData = JSON.parse(articleExtraData);
  const content = extraData?.articleBody || "N/A";
  const description = extraData?.description || null;
  const authorName = extraData?.author?.[0]?.name;
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

/**
 * Get article body beside author details from onefootbal
 * 
 * @param url webpage link
 * @param req user request
 * @returns article content with extra details about author
 */
async function getArticleFromOnefootball(url: string, req: Context["req"]) {
  const pageScraper = await initScraper(req, url);
  // body + author + date
  const pageHtml = pageScraper.querySelector("#__NEXT_DATA__[type='application/json']");
  const articleDataAsString = await pageHtml.getText({ spaced: "" });
  const [articleString = "{}"] = articleDataAsString[pageScraper.selector]
  const articleData = JSON.parse(articleString);
  const articleBody = articleData?.props?.pageProps?.containers?.[2]?.type?.grid?.items?.[0]?.components || [];
  const date = articleData?.props?.pageProps?.metadata?.streamCreatedAt * 1000;
  let content = ``;
  articleBody?.forEach(({ contentType }, index) => {
    if (contentType?.articleParagraph) {
      content += contentType?.articleParagraph?.content || '';
      content += `\n`;
    } else if (contentType?.image && index > 0) {
      content += `<img 
        src="${contentType?.image?.path}"
        alt="${contentType?.image?.alt}"
        height="${contentType?.image?.size?.height}"
        width="${contentType?.image?.size?.width}"
      />`;
    }
  });

  return {
    content: content,
    description: null,
    date,
    isHtml: true,
    author: {
      name: null,
      link: null,
      jobTitle: null
    }
  };
}