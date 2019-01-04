import ReactGA from "react-ga";

const IS_BROWSER = typeof window !== "undefined";

export function init(configsOrTrackingId, initOptions) {
  if (IS_BROWSER && !window.GA_INITIALIZED && configsOrTrackingId) {
    if (initOptions) {
      ReactGA.initialize(configsOrTrackingId, initOptions);
    } else {
      ReactGA.initialize(configsOrTrackingId);
    }
  }
}

export function set(fieldsObject, trackerNames) {
  if (trackerNames) {
    ReactGA.set(fieldsObject, trackerNames);
  } else {
    ReactGA.set(fieldsObject);
  }
}

export function pageview() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

export function event(options) {
  if (options.category && options.action) {
    ReactGA.event(options);
  }
}

export function exception(description = "", fatal = false) {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
}
