import Router from "next/router";
import { Component, createElement } from "react";
import * as analytics from "./analytics";

function isLocal() {
  return location.hostname === "localhost";
}

function isDev() {
  return process.env.NODE_ENV !== "production";
}

// listen route changes
Router.events.on("routeChangeComplete", () => {
  if (isLocal() || isDev()) return;
  analytics.init(code);
  analytics.pageview();
});

export default code => Page => {
  class WithAnalytics extends Component {
    componentDidMount() {
      if (isLocal() || isDev()) return;
      analytics.init(code);
      analytics.pageview();
    }

    render() {
      return createElement(Page, { ...props, analytics });
    }
  }

  if (Page.getInitialProps) {
    WithAnalytics.getInitialProps = Page.getInitialProps;
  }

  return WithAnalytics;
};
