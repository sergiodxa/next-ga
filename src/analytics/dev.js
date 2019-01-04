import debug from "debug";

const log = debug("analytics");

export function init(configsOrTrackingId, initOptions) {
  if (initOptions) {
    log(
      `Analytics init triggered for ${configsOrTrackingId} with the following options ${initOptions}`
    );
  } else {
    log(`Analytics init triggered for ${configsOrTrackingId}`);
  }
}

export function set(fieldsObject, trackerNames) {
  if (trackerNames) {
    log(
      `Set triggered with the following fieldsObject ${fieldsObject} for those trackers ${trackerNames}`
    );
  } else {
    log(`Set triggered with the following fieldsObject ${fieldsObject}`);
  }
}

export function pageview() {
  log(`Pageview triggered for ${window.location.pathname}`);
}

export function event(options) {
  log(
    `Event for category ${options.category} and action ${
      options.action
    } triggered`
  );
}

export function exception(description = "", fatal = false) {
  log(
    `${fatal ? "Fatal exception" : "Exception"} with description ${description}`
  );
}
