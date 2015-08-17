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

  angular.module('shouldweMock',[
    'ngMock',
    'shouldwe'
  ]).run(function ($httpBackend) {
    $httpBackend.when('GET','http://test.host/issues/1').respond(
      200, jasmine.getJSONFixture('issue.json')
    );
  });

  jasmine.getJSONFixture = function (file) {
    var base, xhr, response;
    base = '/base/test/fixtures/';
    xhr = new XMLHttpRequest();
    xhr.open('GET', base + file, false);
    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        response = JSON.parse(this.responseText);
      }
    };
    xhr.send();
    return response;
  };

}).call(this);
