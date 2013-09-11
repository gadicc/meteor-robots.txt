var pubRoot, match, stack;
var fs = Npm.require('fs'),
  path = Npm.require('path'); 

if (__meteor_bootstrap__.bundle) {
	// TODO, remove in 2014
	pubRoot = __meteor_bootstrap__.bundle.root + 'public';
} else {
	pubRoot = path.join(__meteor_bootstrap__.serverDir, '..', 'client', 'app');
//	WebApp.clientProgram.manifest = _.reject(WebApp.clientProgram.manifest, function(cp) {
//		return cp.url == '/robots.txt';
//	});
//	RoutePolicy.declare('/robots.txt', 'network');
}

// TODO, remove in 2014 
stack = __meteor_bootstrap__.app
	? __meteor_bootstrap__.app.stack
    : WebApp.connectHandlers.stack;

// splice necessary to jump ahead of original /robots.txt route
stack.splice(0, 0, {
	route: '/robots.txt',
	handle: function(req, res, next) {
		fs.readFile(pubRoot + '/robots.txt', function(err, data) {
			robotsOut(res, err, data);
		}.future());
	}
});


/*
var app = typeof WebApp != 'undefined'
    ? WebApp.connectHandlers : __meteor_bootstrap__.app;
app.use(function(req, res, next) {
	Log(3);
	console.log(req.url);
	return next();
});
*/

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
