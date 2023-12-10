import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { cors } from 'hono/cors'
import { getGames } from './services/games';
import { getArticleContent } from './services/news/article';
import { getNews } from './services/news';
import { handleAllSettledResults } from './utils/promises';

const app = new Hono()

app
  .use('*', poweredBy())
  .use('*', cors());

app
  .get('/home', async (c) => {
    // const games = await getGames();
    // const articles = await getNews(c.req);
    const response = await Promise.allSettled([
      getGames(),
      getNews(c.req)
    ])
    const [games, articles] = handleAllSettledResults(response);
    // todo: get all basketball related news
    // todo: get all football related news
    return c.json({
      games,
      articles
    });
  })
  .get('/article/:provider/:link', async ctx => {
    const provider = ctx.req.param("provider");
    const link = ctx.req.param("link");
    const article = await getArticleContent({
      provider,
      link,
      // @ts-ignore
      request: ctx.req
    });
    
    return ctx.json(article);
  })

export default app;
