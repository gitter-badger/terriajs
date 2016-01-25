"use strict";

/** A lookup map for displayable mime types */
var DISPLAYABLE_MIME_TYPES = ['image/jpeg', 'image/gif', 'image/png', 'image/svg+xml', 'image/bmp', 'image/x-bmp']
    .reduce(function(acc, mimeType) {
        acc[mimeType] = true;
        return acc;
    }, {});
var IMAGE_URL_REGEX = /[.\/](png|jpg|jpeg|gif)/i;

/**
 * A simple object that represents a legend for a map layer.
 *
 * @param url The URL of the legend
 * @param mimeType The mime type of the legend - this will be used by the UI to determine how the legend should be shown
 *      (usually an img tag or a link)
 * @constructor
 */
var LegendUrl = function(url, mimeType) {
    this.url = url;
    this.mimeType = mimeType;
};

/**
 * Determines whether this url links to an image by inspecting the mime type, or if none is specified, the file
 * extension.
 *
 * @returns {boolean}
 */
LegendUrl.prototype.isImage = function() {
    if (this.mimeType) {
        return !!DISPLAYABLE_MIME_TYPES[this.mimeType];
    }

    return !!this.url.match(IMAGE_URL_REGEX);
};

/** Simple check for whether the url is valid - currently valid is simply defined and length > 0. */
LegendUrl.prototype.isValid = function() {
    return this.url && this.url.length;
};

module.exports = LegendUrl;