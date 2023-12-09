import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { cors } from 'hono/cors'
import { getGames } from './services/games';
import getRocketsNews from './services/news/rockets';
import getCelticsNews from './services/news/celtics';
import { getArticleContent } from './services/news/article';

const app = new Hono()

app
  .use('*', poweredBy())
  .use('*', cors());

app
  .get('/home', async (c) => {
    // todo: display Rockets, C's and LFC gamess
    const games = await getGames();
    console.log("games done")
    // todo: get Rockets news
    // @ts-ignore
    const rockets = await getRocketsNews(c.req);
    console.log("rocket news done")
    const celtics = await getCelticsNews();
    console.log("c's news done")
    // todo: get Celtics news
    // todo: get LFC news
    // todo: get all basketball related news
    // todo: get all football related news
    return c.json({
      games,
      articles: {
        rockets,
        celtics
      }
    });
  })
  .get('/article/:provider/:link', async ctx => {
    // todo: get provider and link
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
