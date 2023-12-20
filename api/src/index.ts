import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { cors } from 'hono/cors'
import { getGames } from './services/games';
import { getArticleContent } from './services/news/article';
import { getNews } from './services/news';
import { handleAllSettledResults } from './utils/promises';
import { getPrayerTimes } from './services/prayer';

const app = new Hono()

app
  .use('*', poweredBy())
  .use('*', cors());

app
  .get('/home', async (c) => {
    const response = await Promise.allSettled([
      getNews(c.req)
    ])
    const [articles] = handleAllSettledResults(response);
    // todo: get all basketball related news
    // todo: get all football related news
    return c.json({
      articles
    });
  })
  .get('/games', async (c) => {
    const response = await Promise.allSettled([
      getGames(),
    ])
    const [games] = handleAllSettledResults(response);
    return c.json(games);
  })
  .get('/article/:provider/:link', async ctx => {
    const provider = ctx.req.param("provider");
    const link = ctx.req.param("link");
    const article = await getArticleContent({
      provider,
      link,
      request: ctx.req
    });

    return ctx.json(article);
  })
  .get('/prayer', async ctx => {
    const latitude = ctx.req.query("latitude");
    const longitude = ctx.req.query("longitude");
    const prayerTimes = await getPrayerTimes({
      longitude,
      latitude
    });

    return ctx.json(prayerTimes);
  })

export default app;
