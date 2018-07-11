# next-ga

Next.js High Order Component to integrate Google Analytics on every page change.

## Usage

Install it

```bash
yarn add next-ga
```

Import it inside your `pages/_app.js`;

```js
import withGA from "next-ga";
```

Wrap your [custom App container](https://nextjs.org/docs#custom-%3Capp%3E) with it

```js
// pass your GA code as first argument
export default withGA("UA-xxxxxxxxx-1", { isApp: true })(MyApp);
```

That's it, now when the user access a page it will log a pageview to Google Analytics, each page change after that will also trigger a pageview on GA. The second argument is used to tell next-ga you are wrapping your `_app` instead of each page individually (defaults to `true`), in that case it will run on `componentDidUpdate` too.

> **Note**: This module detects if it's running in localhost and do nothing there to avoid polluting your analytics with local data.
