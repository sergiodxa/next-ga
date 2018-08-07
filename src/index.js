import { Component, createElement } from "react";
import * as analytics from "./analytics";

function isLocal() {
  return location.hostname === "localhost";
}

function isDev() {
  return process.env.NODE_ENV !== "production";
}
export default (code, { router }) => Page => {
  class WithAnalytics extends Component {
    componentDidMount() {
      const shouldTrack = isLocal() || isDev()
      if (shouldTrack) return;
      analytics.init(code);
      analytics.pageview();

      // listen route changes
      if (router && router.events && typeof router.events.on === "function") {
        router.events.on("routeChangeComplete", () => {
          analytics.pageview();
        });
      }
    }

    render() {
      return createElement(Page, { ...this.props, analytics });
    }
  }

  if (Page.getInitialProps) {
    WithAnalytics.getInitialProps = Page.getInitialProps;
  }

  return WithAnalytics;
};
