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

  var shareImage = function() {
    return encodeURIComponent(new URL($('#issue-image').prop('src')));
  };

  var shareText = function(content) {
    return encodeURIComponent($.trim(content));
  };

  var app = angular.module('shouldwe');
  app.config(['$routeProvider', function ($routeProvider){
    $routeProvider.when('/issues/:id', {
        controller: 'IssueCtrl',
        templateUrl: 'views/issues/show.html',
        resolve: {
          issueObject: ['$route', 'issue', function ($route, issue) {
            var id = $route.current.params.id;
            return issue.fetch(id);
          }]
        }
      });
  }]);

  app.controller('IssueCtrl', [
    '$scope',
    '$rootScope',
    '$sce',
    'pageTitle',
    'issueObject',
    function ($scope, $rootScope, $sce, pageTitle, issueObject) {
      $scope.$parent.bottomNavbar = true;
      $scope.$parent.topNavbar = true;
      /**
       * @ngdoc object
       * @name issue
       * @desc
       * Stubbed issue for now
       */
      pageTitle(issueObject.title);
      $scope.issue = issueObject;
      $scope.contextLimit = 3;
      $scope.urlLocation = issueObject.canonicalUrl;

      $scope.toggleContext = function (limit) {
        if($scope.contextLimit > 10) {
          $scope.contextLimit = 3;
        } else {
          $scope.contextLimit = 999;
        }
      };

      $scope.showEvidence = function(text){
        $scope.currentEvidence = text;
        $scope.toggle('evidenceOverlay', 'on');
      };

      $scope.share = function(provider, selection){
        var params, service_url, redirectUri, share_url, share_content;
        params = [];

        if ('undefined' !== typeof selection) {
          share_url = encodeURIComponent([$scope.urlLocation, selection.sha].join('#'));
          share_content = selection.content;
        } else {
          share_url = $scope.urlLocation;
          share_content = $scope.issue.content;
        }

        var share_text = shareText([$scope.issue.title, share_content].join(' '));

        if (provider == "twitter"){
          var twitter_text = share_text.substring(0, 120);

          params.push("hashtags=ShouldWe");
          params.push("text=" + twitter_text);
          params.push("url=" + share_url);
          params.push("related=ShouldweTweet:ShouldWe");
          params = params.join('&');

          service_url = "https://twitter.com/share?" + params;
        }

        if (provider == "facebook"){
          redirectUri = "http://www.shouldwe.org/popupclose.html";
          params.push("app_id=748081568637331");
          params.push("link=" + share_url);

          params.push("image=" + shareImage());
          params.push("name=" + $scope.issue.title);
          params.push("description=" + share_text);
          params.push("redirect_uri=" + redirectUri);
          params.push("display=popup");
          params = params.join('&');

          service_url = "https://www.facebook.com/dialog/feed?" + params;
        }

        if (provider == "linkedin"){
          params.push("mini=true");
          params.push("title=" + $scope.issue.title);
          params.push("summary=" + share_text);
          params.push("url=" + $scope.urlLocation);
          params.push("source=" + share_url);
          params = params.join('&');
          service_url = "http://www.linkedin.com/shareArticle?" + params;
        }

        window.open(service_url);
      };

    }
  ]);

}).call(this);
