var fs = Npm.require('fs');
var root = __meteor_bootstrap__.bundle.root;

// splice necessary to jump ahead of original /robots.txt route
__meteor_bootstrap__.app.stack.splice(0, 0, {
	route: '/robots.txt',
	handle: function(req, res, next) {
		fs.readFile(root + '/static/robots.txt', function(err, data) {
			robotsOut(res, err, data);
		}.future());
	}
});

robots = {
	lines: []
};

console.log(__meteor_bootstrap__.bundle.root);
function robotsOut(res, err, data) {
	res.writeHead(200, {'Content-Type': 'text/plain'});

	// Generally: if the file exists, serve it.
	if (!err)
		res.write(data + '\n');

	// Iterate through all our other added lines
	for (var i=0; i < robots.lines.length; i++)
		res.write(robots.lines[i] + '\n');

	res.end();
}

robots.addLine = function(line) {
	this.lines.push(line);
};
