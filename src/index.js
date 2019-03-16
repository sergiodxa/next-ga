import { Component, createElement } from "react";
import * as prodLytics from "./analytics/prod";
import * as devLytics from "./analytics/dev";

function isLocal(host) {
  return location.hostname === host;
}

function isDev() {
  return process.env.NODE_ENV !== "production";
}

const dntEnabled = (window) => {
  if (
    window.doNotTrack ||
    navigator.doNotTrack ||
    navigator.msDoNotTrack ||
    "msTrackingProtectionEnabled" in window.external
  ) {
    if (
      window.doNotTrack === "1" ||
      navigator.doNotTrack === "yes" ||
      navigator.doNotTrack === "1" ||
      navigator.msDoNotTrack === "1" ||
      window.external.msTrackingProtectionEnabled()
    ) {
      return true;
    }
  }
}

export default (code, Router, { localhost = "localhost", respectDNT = false } = {}) => Page => {
  class WithAnalytics extends Component {
    state = {
      analytics: undefined
    };

    componentDidMount() {
      // check if it should track
      const shouldNotTrack = (respectDNT && dntEnabled(window)) || isLocal(localhost) || isDev();
      // check if it should use production or dev analytics
      const analytics = shouldNotTrack ? devLytics : prodLytics;

      // init analytics
      analytics.init(code);
      // log page
      analytics.pageview();

      // save possible previously defined callback
      const previousCallback = Router.onRouteChangeComplete;
      Router.onRouteChangeComplete = () => {
        // call previously defined callback if is a function
        if (typeof previousCallback === "function") {
          previousCallback();
        }
        // log page
        analytics.pageview();
      };

      this.setState({
        analytics
      });
    }

    render() {
      return createElement(Page, {
        ...this.props,
        analytics: this.state.analytics
      });
    }
  }

  if (Page.getInitialProps) {
    WithAnalytics.getInitialProps = Page.getInitialProps;
  }

  return WithAnalytics;
};
