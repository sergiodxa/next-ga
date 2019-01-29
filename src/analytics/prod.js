import ReactGA from "react-ga";

const IS_BROWSER = typeof window !== "undefined";

export function init(code) {
  if (IS_BROWSER && !window.GA_INITIALIZED && code) {
    ReactGA.initialize(code);
  }
}

export function pageview() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname+window.location.search);
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
