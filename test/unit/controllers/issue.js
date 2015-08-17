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

  describe('ShouldWe::Controllers::IssueCtrl', function () {
    beforeEach(module('shouldweMock'));

    describe('$routing', function () {
      var route, $route;
      beforeEach(inject(function (_$route_) {
        $route = _$route_;
        route = $route.routes['/issues/:id'];
      }));

      it('routes "/issues/:id"', function () {
        expect(route.controller).toEqual('IssueCtrl');
        expect(route.templateUrl).toEqual('views/issues/show.html');
      });

      it('resolves object', function (done) {
        var app, resolve, resolved, $httpBackend;
        app = angular.injector(['shouldweMock']);
        resolve = route.resolve.issueObject;
        $route.current = {
          params: {
            id: 1
          }
        };
        resolved = app.invoke(resolve, null, {$route: $route});

        $httpBackend = app.get('$httpBackend');

        expect(app.annotate(resolve)).toContain('$route');
        
        resolved.then(function (response) {
          expect(response.data).toEqual(jasmine.getJSONFixture('issue.json'));
          done();
        });

        $httpBackend.flush();
      });
    });

    describe('Controller', function () {
      var $scope, issueObject;
      beforeEach(inject(function ($controller, $rootScope){
        $scope = $rootScope.$new();
        issueObject = {data: {}};
        $controller('IssueCtrl', {$scope: $scope,issueObject: issueObject});
      }));

      it('has issue defined', function () {
        expect($scope.issue).toBeDefined();
      });

      describe('toggleContext()', function (){
        it('changes to 99', function (){
          $scope.contextLimit = 3;
          $scope.toggleContext($scope.contextLimit);
          expect($scope.contextLimit).toEqual(99);
        });

        it('changes to 3', function (){
          $scope.contextLimit = 99;
          $scope.toggleContext($scope.limit);
          expect($scope.contextLimit).toEqual(3);
        });
      });
    });
  });

}).call(this);
