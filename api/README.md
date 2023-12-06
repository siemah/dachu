# Roadmap

- use this [link](https://onefootball.com/_next/data/b32256f6afd2/en/team/liverpool-18/news.json?team-id=liverpool-18&entity-page=news) props containers index number 3(starting from 0) to extract LFC latest articles
- use this [link](https://onefootball.com/_next/data/b32256f6afd2/en/news/ian-wright-cannot-believe-ridiculous-decision-that-was-made-during-liverpools-epic-victory-over-fulham-38676207.json?news-slug=ian-wright-cannot-believe-ridiculous-decision-that-was-made-during-liverpools-epic-victory-over-fulham-38676207) containers then item with index 2 components then contentType with $case prop = articleParagraph to get article content

## Features

- Minimal
- TypeScript
- Wrangler to develop and deploy.
- [Jest](https://jestjs.io/ja/) for testing.

## Usage

Initialize

```
npx create-cloudflare my-app https://github.com/honojs/hono-minimal
```

Install

```
yarn install
```

Develop

```
yarn dev
```

Test

```
yarn test
```

Deploy

```
yarn deploy
```

## Examples

See: <https://github.com/honojs/examples>

## For more information

See: <https://honojs.dev>

## Author

Yusuke Wada <https://github.com/yusukebe>

## License

MIT
