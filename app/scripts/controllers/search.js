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

  var app = angular.module('shouldwe');

  app.config(['$routeProvider', function ($routeProvider){
    $routeProvider.when('/search/:name',{
      controller: 'SearchCtrl',
      templateUrl: 'views/search.html',
      resolve: {
        searchObject: ['$http', '$route', 'endpoint', function ($http, $route, endpoint) {
          var term = $route.current.params.name;
          return $http({
            url: endpoint + '/issues/search',
            method: 'GET',
            params: {q: term}
          }).then(function(response) {
            return {
              term: term,
              results: response.data
            };
          });
        }]
      }
    });
  }]);

  app.controller('SearchCtrl', [
    '$scope',
    '$route',
    'pageTitle',
    'searchObject',
    function($scope, $route, pageTitle, searchObject) {
      $scope.name = searchObject.term;
      $scope.$parent.bottomNavbar = false;
      $scope.$parent.topNavbar = true;
      pageTitle($scope.name);

      if ($scope.name){
        $scope.$parent.searchQuery = searchObject.term;
      }

      $scope.results = searchObject.results.issues;
    }
  ]);
}).call(this);

