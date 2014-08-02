var connect = require('connect');

var serveStatic = require('serve-static');

var app = connect();

app.use(serveStatic('../angular_testing_example'));

app.listen(5000);
