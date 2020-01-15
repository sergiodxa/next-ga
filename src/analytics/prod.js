import ReactGA from "react-ga";

const isBrowser = () => typeof window !== "undefined";

export function init(code) {
  if (isBrowser() && !window.GA_INITIALIZED && code) {
    ReactGA.initialize(code);
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
