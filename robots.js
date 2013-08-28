var root, match, stack;
var fs = Npm.require('fs');

if (__meteor_bootstrap__.bundle) {
	// TODO, remove in 2014
	root = __meteor_bootstrap__.bundle.root;
} else {
	// TODO, see how Meteor does this in 0.6.5+
	match = /^(.*)\/\.meteor\/.*/.exec(__meteor_bootstrap__.serverDir);
	root = match[1];
}

// TODO, remove in 2014
stack = __meteor_bootstrap__.app ? __meteor_bootstrap__.app.stack
      : WebApp.connectHandlers.stack;

// splice necessary to jump ahead of original /robots.txt route
stack.splice(0, 0, {
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
