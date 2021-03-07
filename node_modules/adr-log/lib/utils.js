'use strict';

/**
 * Module dependencies
 */
var utils = require('lazy-cache')(require);
var fn = require;
const os = require('os');
require = utils;

/**
 * Lazily required module dependencies
 */
require('gray-matter', 'matter');
require('minimist');
require('remarkable', 'Remarkable');
require = fn;

/**
 * Convert a non-heading string to a h1 string, which is later used as reference to the file where to read
 * the heading from.
 *
 * @param {String} `str` The filename of the file
 * @returns {string}
 */
utils.headify = function h(str) {
  // line ending doesn't really matter because the headings are tokenized later on.
  return `# ${str.trim() + os.EOL}`;
};

utils.determineNewline = function (content) {
  let newline;
  if (content.indexOf('\r\n') > -1) {
    console.log("Windows newline");
    newline = '\r\n';
  } else if (content.indexOf('\n') > -1) {
    console.log("Linux newline");
    newline = '\n';
  } else if (content.indexOf('\r') > -1) {
    console.log("Mac OS Classic newline");
    newline = '\r';
  } else {
    console.log("Unknown newline. Falling back to Linux newline.");
    newline = '\n';
  }
  return newline;
};

/**
 * Expose `utils` modules
 */
module.exports = utils;
