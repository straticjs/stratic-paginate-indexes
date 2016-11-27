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
    path = require('path');

function makePage(originalFile, page, pageNumber) {
	var newFile = originalFile.clone();
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
		var pageNumber = 1,
		    that = this;

		var page = [];
		file.data.posts.forEach(function(post) {
			page.push(post);

			if (page.length === 10) {
				var newFile = makePage(file, page, pageNumber);

				that.push(newFile);

				page = [];
				pageNumber++;
			}
		});

		// Handle the last page which won't have 10 posts (and so will fail the above `if` test)
		this.push(makePage(file, page, pageNumber));

		callback();
	});
};
