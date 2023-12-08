import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { cors } from 'hono/cors'
import { getGames } from './services/games';
import getRocketsNews from './services/news/rockets';
import getCelticsNews from './services/news/celtics';

const app = new Hono()

app
  .use('*', poweredBy())
  .use('*', cors());

app.get('/home', async (c) => {
  // todo: display Rockets, C's and LFC gamess
  const games = await getGames();
  // todo: get Rockets news
  const rockets = await getRocketsNews();
  const celtics = await getCelticsNews();
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

export default app;
