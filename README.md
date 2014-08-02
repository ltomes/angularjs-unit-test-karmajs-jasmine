angularjs-unit-test-karmajs-jasmine
===================================

Simple AngularJS application built around a set of Karma.js unit tests (using the Jasimine framework)


###Basic Instructions

Karma runs on Node.js and is available as an NPM package. Setup steps can be found [here](http://karma-runner.github.io/0.12/intro/installation.html)

To install karma as a command-line instruction, run

`$ npm install -g karma-cli`


karma.config.js has already been wired to run the application (which consists of app.html and app.js) and perform the tests stored in the *tests* directory. 

The current tests are constructed using the [Jasmine framework](http://jasmine.github.io/).

Running `karma start karma.config.js` will launch the application in a Chrome browser, and report back each result.
