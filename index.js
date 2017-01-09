/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';

var through2 = require('through2'),
    chunk = require('lodash.chunk'),
    path = require('path');

function makePage(originalFile, page, pageNumber) {
	// Apparently you have to pass true for this to deep-clone.
	// The docs are wrong. :/
	var newFile = originalFile.clone(true);
	newFile.data = newFile.data || {};
	newFile.data.posts = page;
	newFile.data.page = pageNumber;

	if (pageNumber === 1) return newFile;

	var filePath = path.parse(newFile.path);
	filePath.dir = path.join(filePath.dir, 'page', pageNumber.toString());
	newFile.path = path.format(filePath);

	return newFile;
}

module.exports = function() {
	return through2.obj(function(file, enc, callback) {
		var pageFiles = [],
		    pages = [];

		pages = chunk(file.data.posts, 5);

		pageFiles = pages.map(function(page, pageNumber) {
			return makePage(file, page, pageNumber + 1);
		});

		// Per-index page counts
		pageFiles.forEach(function(file) {
			file.data.pageCount = pageFiles.length;
			this.push(file);
		}, this);

		callback();
	});
};
