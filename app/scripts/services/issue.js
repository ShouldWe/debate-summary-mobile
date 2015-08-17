/**
 * @file services/issue.js
 * @author Kyle Welsby <kyle@mekyle.com>
 * @license
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

  var app = angular.module('shouldwe');

  app.service(
    'issue',
    [
      '$http',
      'endpoint',
      function ($http, endpoint) {
        var api = {};
        api.fetch = function (id) {
          return $http.get(endpoint + '/issues/' + id)
          .then(function(response) {
            return response.data;
          });
        };
        return api;
      }
    ]
  );
}).call(this);
