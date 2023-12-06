import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { cors } from 'hono/cors'
import { getGames } from './services/games';

const app = new Hono()

app
  .use('*', poweredBy())
  .use('*', cors());

app.get('/main', async (c) => {
  // todo: display Rockets, C's and LFC gamess
  const games = await getGames();
  // todo: get all basketball related news
  // todo: get all football related news
  // todo: get Rockets news
  // todo: get Celtics news
  // todo: get LFC news
  return c.json({games})
})

export default app;
