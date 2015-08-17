# Debate Summary Mobile App

Debate Summary is open-sourced version of [ShouldWe](http://www.shouldwe.org), free to copy and modify (see [LICENSE](./LICENSE)).

This is a standalone application that is optimized for mobile devices.

It uses [AngularJS][angularjs] as it's core framework, [gulp][gulp] to build
the application and [nginx][nginx] to serve.  

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
* Nginx

There is a make task that should get your system up-to spec.

    $ make setup

Alternatively for you can run the following manually, (no sudo required)

    brew install node nginx
    npm install -g bower gulp
    npm install
    bower install

## Running

The application uses `gulp` to build the application and `nginx` to serve.

On multi-core processor systems, you can invoke the commands with the make task:

    $ make -j2

The application will be available to view at:

    http://localhost:3000

Alternatively you can run each command in a separate terminal.

gulp:

    $ gulp watch

nginx:

    $ nginx -p . -c config/nginx.conf


## License

Copyright (C) 2015 Policy Wiki Educational Foundation LTD <hello@shouldwe.org>, (see [License](./LICENSE))

[angularjs]:https://angularjs.org/
[nginx]:http://nginx.org/
[gulp]:http://gulpjs.com/
