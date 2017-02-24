
(function () {
    'use strict';

    var ProfileCtrl = function ($rootScope, $scope, $location, $routeParams, $route, profileService) {

        $scope.viewProfileInput = false;

        $scope.nameErrorMessage = null;
        $scope.nameError = false;

        profileService.query($routeParams.user_id).then(function (response) {
            $scope.artista = response[0];
        });
        $scope.toggleProfileInput = function () {
            $scope.viewProfileInput = !$scope.viewProfileInput;
        };

        $scope.saveProfile = function (artista) {
            if (!artista.fields.name || 0 === artista.fields.name.length) {
                $scope.nameErrorMessage = 'Name of a piece must not be empty !!';
                $scope.nameError = true;
            }
            else {
                $scope.lyricsError = false;
                $scope.nameError = false;
                profileService.update(artista).then(function (data) {
                    $route.reload();
                })
            }
        };
    };

    angular.module('freesounds.controllers').controller('ProfileCtrl', ['$rootScope', '$scope', '$location', '$routeParams', '$route', 'profileService', ProfileCtrl]);
}());