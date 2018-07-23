import Router from "next/router";
import { Component, createElement } from "react";
import * as analytics from "./analytics";

function isLocal() {
  return location.hostname === "localhost";
}

function isDev() {
  return process.env.NODE_ENV !== "production";
}
export default code => Page => {
  class WithAnalytics extends Component {
    componentDidMount() {
      const shouldTrack = isLocal() || isDev()
      if (!shouldTrack) return;
      analytics.init(code);
      analytics.pageview();

      // listen route changes
      Router.events.on("routeChangeComplete", () => {
        analytics.pageview();
      });

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
