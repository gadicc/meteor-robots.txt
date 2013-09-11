## robots.txt smart package

Currently, all this package does is implement a <code>robots.addLine('line')</code>
which other packages can use to add lines to what is served at /robots.txt.

If there is any demand for other functions, they can be added too.  Let me know
if you need to modify an existing robots.txt or want other functionality.

### Existing public/robots.txt

* In Meteor <= 0.6.4, if `public/robots.txt` exists, it's contents will be served
in addition to whatever is added with robots.addLine().

* In Meteor >= 0.6.5, if `public/robots.txt` exists, **this smart package will
not work**.  I am working on a fix, but for now, if you want to use the functionality
offered by this package, pleasure ensure that this file *does not exist* (if it does,
only it's own contents will be served, and nothing else).