/*
 * Debate Summary Mobile - Croudsource arguments and debates
 * Copyright (C) 2015 Policy Wiki Educational Foundation LTD <hello@shouldwe.org>
 *
 * This file is part of Debate Summary Mobile.
 *
 * Debate Summary Mobile is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Debate Summary Mobile is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Debate Summary Mobile.  If not, see <http://www.gnu.org/licenses/>.
 */
(function () {
  'use strict';

  var authors, dependencies, nodeEnv, bowerJSON, paths, runSequence, replace,
  gulp, clean, usemin, imagemin, prefixer, stylish, jshint, csslint, svgmin,
  uglify, cssmin, connect, modRewrite;

  gulp        = require('gulp');
  replace     = require('gulp-replace');
  clean       = require('gulp-clean');
  usemin      = require('gulp-usemin');
  imagemin    = require('gulp-imagemin');
  svgmin      = require('gulp-svgmin');
  cssmin      = require('gulp-cssmin');
  uglify      = require('gulp-uglify');
  prefixer    = require('gulp-autoprefixer');
  jshint      = require('gulp-jshint');
  csslint     = require('gulp-csslint');
  connect     = require('gulp-connect');
  modRewrite  = require('connect-modrewrite');
  stylish     = require('jshint-stylish');
  runSequence = require('run-sequence');


  /**
   * @name paths
   * @returns {Object} common paths to parse
   */
  paths = {
    scripts: 'app/scripts/**/*.js',
    styles: 'app/styles/**/*.css',
    dest: 'public/'
  }

  /**
   * @name bowerJSON
   * @returns {Object} Contents from `./bower.json`
   */
  bowerJSON = require('./bower.json');

  /**
   * @name authors
   * @returns {Array} Project author's and contributors
   */
  authors = [];
  bowerJSON.authors.forEach(function (author) {
    var result = [];
    result.push(author.name);
    if (author.url) {
      result.push('Site: ' + author.url);
    }
    if (author.twitter) {
      result.push('Twitter: ' + author.twitter);
    }
    if (author.xing) {
      result.push('XING: ' + author.xing);
    }
    if (author.location) {
      result.push('Location: ' + author.location);
    }

    authors.push(result.join('\n'));
  });

  /**
   * @name dependencies
   * @returns {Array} Project dependencies
   */
  dependencies = Object.keys(bowerJSON.dependencies || {}).sort().join(', ');

  /**
   * @name env
   * @returns {String} environment stage, defaults to 'development'.
   */
  nodeEnv = process.env.NODE_ENV || 'development';

  /**
   * @namespace gulp
   * @module Lint
   */
  gulp.task('lint', [
    'lint:js',
    'lint:css'
  ]);

  /**
   * @namespace gulp
   * @name lint:js
   * @desc
   * Lint application JavaScript Files
   */
  gulp.task('lint:js', function () {
    return gulp.src(paths.scripts)
      .pipe(jshint())
      .pipe(jshint.reporter(stylish));
  });

  /**
   * @namespace gulp
   * @name lint:css
   * @desc
   * Lint application CSS files
   */
  gulp.task('lint:css', function () {
    return gulp.src(paths.styles)
      .pipe(csslint('.csslintrc'))
      .pipe(csslint.reporter());
  });

  /**
   * @namespace gulp
   * @module Minification
   */
  gulp.task('minify',[
    'min:img',
    'min:svg',
    'min:js',
    'min:css'
  ]);

  /**
   * @namespace gulp
   * @name usemin
   */
  gulp.task('usemin', function () {
    return gulp.src('app/*.html')
      .pipe(usemin({
        htmlmin: false // Setting true will cause issues with JavaScript dependant on custom attributes.
      }))
      .pipe(gulp.dest(paths.dest));
  });

  /**
   * @namespace gulp
   * @name min:img
   */
  gulp.task('min:img', function () {
    return gulp.src('app/images/**/*.{png,jpg,gif,jpeg}')
      .pipe(imagemin())
      .pipe(gulp.dest('public/images/'));
  });

  /**
   * @namespace gulp
   * @name min:svg
   */
  gulp.task('min:svg', function () {
    return gulp.src('app/images/**/*.svg')
      .pipe(svgmin())
      .pipe(gulp.dest('public/images/'));
  });

  /**
   * @namespace gulp
   * @name min:js
   */
  gulp.task('min:js', function () {
    return gulp.src('public/scripts/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/scripts/'));
  });

  /**
   * @namespace gulp
   * @name min:js
   */
  gulp.task('min:css', function () {
    return gulp.src('public/styles/**/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('public/styles/'));
  });

  /**
   * @namespace gulp
   * @module Utilities
   */

  /**
   * @namespace gulp
   * @name replace
   * @desc
   * Replaces all matched tags with the given variable.
   * @example
   * '{{@@ENV}}' === 'development'
   * // true
   */
  gulp.task('replace', function () {
    return gulp.src('public/**/*.{txt,js,css,html,webapp}',{base: paths.dest})
    .pipe(replace('{{@@Team}}', authors.join('\n\n')))
    .pipe(replace('{{@@Version}}', bowerJSON.version))
    .pipe(replace('{{@@SiteName}}', bowerJSON.title))
    .pipe(replace('{{@@URL}}', bowerJSON.url))
    .pipe(replace('{{@@Description}}', bowerJSON.title))
    .pipe(replace('{{@@BuildDate}}', new Date().toISOString()))
    .pipe(replace('{{@@Components}}', dependencies))
    .pipe(replace('{{@@ENV}}', nodeEnv))
    .pipe(gulp.dest(paths.dest));
  });

  /**
   * @namespace gulp
   * @name clean
   * @desc
   * Cleans the public directory
   */
  gulp.task('clean', function () {
    return gulp.src(['public/', '.tmp'],{read: false})
      .pipe(clean());
  });

  /**
   * @namespace gulp
   * @name copy
   * @desc
   * Copies files that do not need to be modified.
   */
  gulp.task('copy', ['copy:fonts'], function () {
    return gulp.src([
      'app/*.{txt,webapp,ico}',
      'app/.htaccess',
      'app/views/**/*.html',
      'app/locales/**/*.json'
    ], {
      base: 'app/'
    })
      .pipe(gulp.dest(paths.dest));
  });

  gulp.task('copy:fonts', function () {
    return gulp.src([
      'app/bower_components/font-awesome/fonts/*.{woff,ttf,eof,otf,svg}'
    ])
      .pipe(gulp.dest('public/fonts/'));
  });

  gulp.task('copy:dev', ['copy'], function () {
    return gulp.src([
      'app/images/**/*.{png,jpg,gif,svg}'
    ], {
      base: 'app/'
    })
      .pipe(gulp.dest(paths.dest));
  });

  /**
   * @namespace gulp
   * @name autoprefixer
   * @desc
   * Add any CSS vendor prefixes that are not in the stable specification.
   */
  gulp.task('autoprefixer', function () {
    return gulp.src(
      'public/styles/*.css'
    )
      .pipe(
        prefixer('> 1%', 'last 2 versions', 'Firefox ESR', 'Explorer >= 9', 'ios >= 6', 'android >= 4')
      )
      .pipe(gulp.dest('public/styles/'));
  });

  gulp.task('http:server', function(){
    return connect.server({
      port: process.env.PORT || 3000,
      root: 'public',
      middleware: function(connect, options) {
        // Return array of whatever middlewares you want
        return [
          // redirect all urls to index.html in build folder
          modRewrite([
            '!\\.html|\\.js|\\.css|\\.png|\\.svg|\\.txt|\\.woff|\\.ttf|\\.eot$ /index.html [L]'
          ]),

          // Serve static files.
          connect.static(options.root)
        ];
      }
    });
  });

  /**
    * @namespace gulp
    * @name server
    * @desc
    * Serve compiled files
    */
  gulp.task('server', [
    'build:production',
    'http:server'
  ]);

  /**
   * @namespace gulp
   * @name build
   * @desc
   * The super build task that does everything needed.
   */
  gulp.task('build:dev', ['lint'], function () {
    return runSequence(
      'clean',
      ['copy:dev'],
      ['usemin'],
      ['autoprefixer'],
      'replace'
    )
  });

  gulp.task('build:production', function () {
    return runSequence(
      'clean',
      'copy',
      'usemin',
      'autoprefixer',
      'replace',
      'minify'
    );
  });

  /**
   * @namespace gulp
   * @name watch
   * @desc
   * Watches for file changes and runs a task
   */
  gulp.task('watch', ['build:dev', 'http:server'], function () {
    return gulp.watch([
      'app/*.{txt,html}',
      'app/styles/**/*.css',
      'app/scripts/**/*.js',
      'app/views/**/*.html'
    ], ['build:dev']);
  });

  /**
   * @namespace gulp
   * @name default
   * @desc
   * The default task to be run, defaults to `build`
   */
  gulp.task('default', ['build:dev']);
}).call(this);
