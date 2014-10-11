if (Meteor.isServer) {
  robots.addLine('Sitemap: ' + Meteor.absoluteUrl('sitemap.xml'));
  robots.addLine('User-agent: *');
  robots.addLine('Disallow: /talk');
}
