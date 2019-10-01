import ReactGA from "react-ga";

const IS_BROWSER = typeof window !== "undefined";

export function init(code, anonymize) {
  if (IS_BROWSER && !window.GA_INITIALIZED && code) {
    ReactGA.initialize(code);
    if (anonymize) {
      ReactGA.set({ anonymizeIp: true })
    }
  }
}

export function pageview() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

export function event(category = "", action = "") {
  if (category && action) {
    ReactGA.event({ category, action });
  }
}

export function exception(description = "", fatal = false) {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
}
