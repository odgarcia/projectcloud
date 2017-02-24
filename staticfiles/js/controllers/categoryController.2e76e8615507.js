/**
 * Created by Minna on 19/11/2016.
 */
(function () {
    'use strict';

    var CategoryCrtl = function ($rootScope, $scope, $location, $routeParams, $route, categoryService) {

        $rootScope.categories = [];
        $rootScope.pieces = [];

        $scope.loadCategory = function () {
            categoryService.list().then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    var category_id = data[i].pk.toString();

                    var tempArtist = {
                        id: category_id,
                        name: data[i].fields.name
                    };
                    $rootScope.categories.push(tempArtist);
                }
            }, function (response) {
                $scope.error = true;
                console.log('Error: ' + response);
            })
        };
        $scope.loadCategory();
        $scope.loadCategoryPieces = function () {
            categoryService.list_pieces($routeParams.category_id).then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    var piece_id = data[i].pk.toString();

                   var tempPiece = {
                            id: piece_id,
                            title: data[i].fields.name,
                            artist: data[i].fields.artist.name,
                            url: data[i].fields.url,
                            duration: data[i].fields.duration,
                            image_cover: data[i].fields.image_cover,
                            viewCollections: false,
                            likes: 0,
                            upvoted: false
                        };
                    $rootScope.artist_name = tempPiece.artist;
                    $rootScope.pieces.push(tempPiece);
                }
            }, function (response) {
                $scope.error = true;
                console.log(response);
            })
        };
        $scope.loadCategoryPieces();

    };

    angular.module('freesounds.controllers').controller('CategoryCrtl', ['$rootScope', '$scope', '$location', '$routeParams', '$route','categoryService', CategoryCrtl]);
}());