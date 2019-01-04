import { Component, createElement } from "react";
import * as prodLytics from "./analytics/prod";
import * as devLytics from "./analytics/dev";

function isLocal(host) {
  return location.hostname === host;
}

function isDev() {
  return process.env.NODE_ENV !== "production";
}

export default (
  conifgsOrTrackingId,
  Router,
  initOptions,
  fieldsObject,
  trackerNames,
  { localhost = "localhost" } = {}
) => Page => {
  class WithAnalytics extends Component {
    state = {
      analytics: undefined
    };

    componentDidMount() {
      // check if it should track
      const shouldNotTrack = isLocal(localhost) || isDev();
      // check if it should use production or dev analytics
      const analytics = shouldNotTrack ? devLytics : prodLytics;

      // init analytics
      if (initOptions) {
        analytics.init(conifgsOrTrackingId, initOptions);
      } else {
        analytics.init(conifgsOrTrackingId);
      }
      // set a group of field/value pairs on a tracker object.
      if (fieldsObject) {
        if (trackerNames && trackerNames.length) {
          // multiple trackers
          analytics.set(fieldsObject, trackerNames);
        } else {
          // default tracker
          analytics.set(fieldsObject);
        }
      }
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
