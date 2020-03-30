'use strict'

/**
 * Mounts all endpoint paramaters.
 *
 * @param {String} endpoint
 * @param {String} params
 *
 * @returns {String}
 *
 */
export const mountEndpointParams = (endpoint, ...params) => {
  if (this.hasParam(endpoint)) {
    endpoint.split('/').forEach((section, index) => {
      if (this.isOptionalParam(section)) {
        if (params[index]) {
          endpoint = endpoint.replace(section, params[index]);
        } else {
          endpoint = endpoint.replace(section, '');
          endpoint = endpoint.replace(/\/+$/, '');
        }
      } else if (this.isRequiredParam(section)) {
        endpoint = endpoint.replace(section, params[index]);
      }
    });
  }

  return endpoint;
}

/**
 * Adds query strings to the given endpoint.
 *
 * @param {String} endpoint
 * @param {Object} queryStrings
 *
 * @returns {String}
 *
 */
export const addQueryString = (endpoint, queryStrings) => {
  Object.keys(queryStrings).forEach((item, index) => {
    if (index === 0) {
      endpoint += `?${item}=${queryStrings[item]}`;
    } else {
      endpoint += `&${item}=${queryStrings[item]}`;
    }
  });

  return endpoint;
}

/**
 * Verifies if exists parameter in a given endpoint.
 *
 * @param {String} endpoint
 *
 * @returns {Boolean}
 *
 */
export const hasParam = (endpoint) => {
  return endpoint.indexOf(':') >= 0;
}

/**
 * Verifies if the param is required.
 *
 * @param {String} section
 *
 * @returns {Boolean}
 *
 */
export const isRequiredParam = (section) => {
  return this.hasParam(section) && section.indexOf('?') >= 0;
}

/**
 * Verifies if the param is optional.
 *
 * @param {String} section
 *
 * @returns {Boolean}
 *
 */
export const isOptionalParam = (section) => {
  return this.hasParam(section) && section.indexOf('?') < 0;
}
