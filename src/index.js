import React, { Component, createElement } from "react";

import * as analytics from "./analytics";

function isLocal() {
  return location.hostname === "localhost";
}

export default code => Page => {
  class WithAnalytics extends Component {
    componentDidMount() {
      if (isLocal()) return;
      analytics.init(code, isProd);
      analytics.pageview();
    }

    render() {
      return createElement(Page, this.props);
    }
  }

  if (Page.getInitialProps) {
    WithAnalytics.getInitialProps = Page.getInitialProps;
  }

  return WithAnalytics;
};
