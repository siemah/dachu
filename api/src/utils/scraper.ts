const cleanText = s => s.trim().replace(/\s\s+/g, ' ')

class Scraper {
  rewriter = null;
  url = null;
  response: Response = null;
  selector: string = null;
  attr = null;

  constructor() {
    this.rewriter = new HTMLRewriter()
    return this
  }

  async fetch(url, options?: RequestInit<RequestInitCfProperties>) {
    url = decodeURIComponent(url);
    this.url = url;
    this.response = await fetch(url, {
      cf: {
        cacheTtl: 60000
      },
      ...(options || {})
    })

    const server = this.response.headers.get('server')
    const isThisWorkerErrorNotErrorWithinScrapedSite = (
      [530, 503, 502, 403, 400].includes(this.response.status) &&
      (server === 'cloudflare' || !server /* Workers preview editor */)
    )

    if (isThisWorkerErrorNotErrorWithinScrapedSite) {
      throw new Error(`Status ${this.response.status} requesting ${url}`)
    }

    return this
  }

  querySelector(selector) {
    this.selector = selector
    return this;
  }

  async getText({ spaced }) {
    const matches = {}
    const selectors = new Set(this.selector.split(',').map(s => s.trim()))

    selectors.forEach((selector) => {
      matches[selector] = []

      let nextText = ''

      this.rewriter.on(selector, {
        element(element) {
          matches[selector].push(true)
          nextText = ''
        },

        text(text) {
          nextText += text.text

          if (text.lastInTextNode) {
            if (spaced) nextText += ' '
            matches[selector].push(nextText)
            nextText = ''
          }
        }
      })
    })
    // const _response = this.response;
    const transformed = this.rewriter.transform(this.response)

    await transformed.arrayBuffer()

    selectors.forEach((selector) => {
      const nodeCompleteTexts = []

      let nextText = ''

      matches[selector].forEach(text => {
        if (text === true) {
          if (nextText.trim() !== '') {
            nodeCompleteTexts.push(cleanText(nextText))
            nextText = ''
          }
        } else {
          nextText += text
        }
      })

      const lastText = cleanText(nextText)
      if (lastText !== '') nodeCompleteTexts.push(lastText)
      matches[selector] = nodeCompleteTexts
    })

    // @ts-ignore
    return selectors.length === 1 ? matches[selectors[0]] : matches
  }

  async getAttribute(attribute, isSingle = true) {
    class AttributeScraper {
      value = [];
      attr = null;

      constructor(attr) {
        this.attr = attr
      }

      element(element: Element) {
        if (this.value.length && isSingle) return;

        this.value.push(element.getAttribute(this.attr))
      }
    }

    const scraper = new AttributeScraper(attribute)

    await new HTMLRewriter().on(this.selector, scraper).transform(this.response).arrayBuffer()

    return isSingle
      ? scraper.value?.[0] || ""
      : scraper.value;
  }
}

export default Scraper;