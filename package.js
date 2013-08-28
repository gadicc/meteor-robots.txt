Package.describe({
    summary: "Serves a robot.txt which can be modified programatically"
});

Package.on_use(function (api) {
	api.use('standard-app-packages', 'server');
	api.add_files('robots.js', 'server');
});
