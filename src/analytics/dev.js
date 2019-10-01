import debug from "debug";

const log = debug("analytics");

export function init(code, anonymize) {
  log(`Analytics init triggered for ${code}`);
  if (anonymize) {
    log(`Analytics set to anonymize IPs`);
  }
}

export function pageview() {
  log(`Pageview triggered for ${window.location.pathname}`);
}

export function event(category = "", action = "") {
  log(
    `Event for category ${category} and action ${action} triggered`
  );
}

export function exception(description = "", fatal = false) {
  log(
    `${
      fatal ? "Fatal exception" : "Exception"
    } with description ${description}`
  );
}
