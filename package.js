Package.describe({
    summary: "Serves a robot.txt which can be modified programatically"
});

Package.on_use(function (api) {
	// TODO, support 0.6.4 and below until 2014
	try {
	    api.use('webapp', 'server');
	}
	catch (error) {
	    if (error.code != 'ENOENT')
	        throw(error);
	}	

	api.add_files('robots.js', 'server');
	if (api.export)
		api.export('robots', 'server');
});
