Package.describe({
  summary: "Serves a robot.txt which can be modified programatically",
  version: "0.0.9",
  git: "https://github.com/gadicc/meteor-robots.txt.git"
});

Package.on_use(function (api) {
  api.use('webapp@1.0.0', 'server');
	api.add_files('robots.js', 'server');
	api.export('robots', 'server');
});
