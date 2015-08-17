# Debate Summary Mobile App

Debate Summary is open-sourced version of [ShouldWe](http://www.shouldwe.org), free to copy and modify (see [LICENSE](./LICENSE)).

This is a standalone application that is optimized for mobile devices.

It uses [AngularJS][angularjs] as it's core framework, and [gulp][gulp] to build and run
the application.

The application source files are located in `./app` and the served files will
be generated into `./public`.


    ├── app
    │   ├── images
    │   │   └── touch
    │   ├── scripts
    │   │   ├── controllers
    │   │   ├── directives
    │   │   ├── filters
    │   │   └── services
    │   └── styles
    └── config


## Installation on Mac OS

* NodeJS

There is a make task that should get your system up-to spec.

    $ make setup

Alternatively for you can run the following manually, (no sudo required)

    brew install node
    npm install -g bower gulp
    npm install
    bower install

## Running

You can start a simple application server and auto compile assets by running:

    $ gulp watch

The application will be available to view at:

    http://localhost:3000

In production you can simply run

    $ npm start


## License

Copyright (C) 2015 Policy Wiki Educational Foundation LTD <hello@shouldwe.org>, (see [License](./LICENSE))

[angularjs]:https://angularjs.org/
[gulp]:http://gulpjs.com/
