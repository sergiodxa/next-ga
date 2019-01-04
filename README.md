# next-ga

Next.js High Order Component to integrate Google Analytics on every page change.

## Usage

Install it

```bash
yarn add next-ga
```

Import it inside your `pages/_app.js`;

```js
import Router from "next/router";
import withGA from "next-ga";
```

Available arguments:
|Value|Notes|
|------|-----|
|configsOrTrackingId| `String`. Required. GA Tracking ID like `UA-000000-01` or `Array` of multiple trackers `Objects` passed to [`ReactGa.initialize()`](https://github.com/react-ga/react-ga#reactgainitializegatrackingid-options) method as the first argument.|
|Router| `Object`. Required. next Router.|
|initOptions| `Object`. Optional. configurations passed to [`ReactGa.initialize()`](https://github.com/react-ga/react-ga#reactgainitializegatrackingid-options) method as the second argument.|
|fieldsObject| `Object`. Optional. [configurable field names (excluding GA create only fields)](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference). It will be passed as the first argument to [`ReactGa.set()`](https://github.com/react-ga/react-ga#reactgasetfieldsobject)|
|trackerNames| `Array`. Optional. A list of extra trackers to run the command on. it will be passed as the second argument to [`ReactGa.set()`](https://github.com/react-ga/react-ga#reactgasetfieldsobject)|


Wrap your [custom App container](https://nextjs.org/docs#custom-%3Capp%3E) with it

```js
// the only two required arguments is the configsOrTrackingId and Router
export default withGA("UA-xxxxxxxxx-1", Router)(MyApp);
// examples
export default withGA(
  "UA-xxxxxxxxx-1", // trackingId
  Router, // next Router
  null, // optional initOptions
  { userId: 123, cd1: "online" } //fieldObjects
)(MyApp);

export default withGA(
  "UA-xxxxxxxxx-1", // trackingId
  Router, // next Router
  // initOptions
  {
    debug: true,
    titleCase: false,
    gaOptions: {
      userId: 123
    }
  }
)(MyApp);

export default withGA(
  // multiple trackers
  [
    {
      trackingId: "UA-000000-01",
      gaOptions: {
        name: "tracker1",
        userId: 123
      }
    },
    {
      trackingId: "UA-000000-02",
      gaOptions: { name: "tracker2" }
    }
  ],
  Router, // next Router
  { debug: true, alwaysSendToDefaultTracker: false }, // initOptions
  { userId: 123, cd1: "online" }, // fieldsObject
  ["tracker2"] // trackersNames
)(MyApp);
```

That's it, now when the user access a page it will log a pageview to Google Analytics, each page change after that will also trigger a pageview on Google Analytics.

> **Note**: This module detects if it's running in localhost and do nothing there to avoid polluting your analytics with local data.
