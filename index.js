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
const mountEndpointParams = (endpoint, ...params) => {
  if (hasParams(endpoint)) {
    endpoint.split('/').forEach((section, index) => {
      if (isOptionalParam(section)) {
        if (params[index]) {
          endpoint = endpoint.replace(section, params[index]);
        } else {
          endpoint = endpoint.replace(section, '');
          endpoint = endpoint.replace(/\/+$/, '');
        }
      } else if (isRequiredParam(section)) {
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
const addQueryString = (endpoint, queryStrings) => {
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
const hasParams = (endpoint) => {
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
const isRequiredParam = (section) => {
  return hasParams(section) && section.indexOf('?') < 0;
}

/**
 * Verifies if the param is optional.
 *
 * @param {String} section
 *
 * @returns {Boolean}
 *
 */
const isOptionalParam = (section) => {
  return hasParams(section) && section.indexOf('?') >= 0;
}

module.exports = {
  mountEndpointParams,
  addQueryString,
  hasParams,
  isRequiredParam,
  isOptionalParam,
}
