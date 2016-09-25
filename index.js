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

var through2 = require('through2');

module.exports = function() {
	return through2.obj(function(file, enc, callback) {
		var pageNumber = 1;

		while (file.data.posts.length % 10 !== file.data.posts.length) {
			var page = [];

			for (var i = 0; i < 10; i++) {
				page.push(file.data.posts.shift());
			}

			var newFile = file.clone();
			newFile.data.posts = page;
			newFile.data.page = pageNumber;
			// TODO rewrite file path

			this.push(newFile);

			pageNumber++;
		}

		callback();
	});
};
