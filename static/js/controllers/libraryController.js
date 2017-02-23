/**
 * Created by TOSHIBA on 26/09/2016.
 */
(function () {
    'use strict';

    var LibraryCrtl = function ($rootScope, $scope, $location, $routeParams, $route, collectionService) {

        $scope.isNewCollection = true;
        $scope.newCollection = {};
        $scope.validationError = false;
        $scope.editmode = false;
        $scope.newName = null;

        $scope.toggleIsNewCollection = function () {
            $scope.isNewCollection = !$scope.isNewCollection;
            $scope.newCollection = {};
        };

        $scope.saveCollection = function () {
            if ($scope.newCollection.name) {
                $scope.validationError = false;
                var res = collectionService.create($scope.newCollection).then(function (data) {
                        if (data.mensaje == "ok") {
                            $scope.collections.push(JSON.parse(data.data)[0]);
                            $scope.isNewCollection = true;
                            $scope.newCollection = {};
                        }
                        else {
                            console.log('ocurrio un error: ' + JSON.stringify(data));
                        }
                    }
                )
            }
            else {
                $scope.mensaje = "el nombre no puede ser vacio";
                $scope.validationError = true;
            }
        };

        $scope.loadCollections = function () {
            var res = collectionService.list().then(function (data) {
                    $scope.collections = data;
                }
            )
        };
        $scope.loadCollections();

        $scope.hasPieces = function (collection) {
            if (collection.expanded && collection.pieces) {
                return true;
            }
            else {
                return false;
            }
        };

        $scope.collapse = function (collection) {
            collection.expanded = false;
        };

        $scope.loadPieces = function (collection) {
            collectionService.piecesById(collection.pk).then(function (data) {
                collection.pieces = data;
            })
            collection.expanded = true;
        };

        $scope.putSongs = function (collection) {

            $scope.loadPieces(collection).then(function () {
                if (collection.pieces) {
                    $rootScope.transformToSongs(collection.pieces);
                    $rootScope.isPlay = false;
                } else {
                    $rootScope.songs = [];
                }
            });
        };

        $scope.deleteCollection = function (collection_id) {
            collectionService.delete(collection_id).then(function (data) {
                $scope.loadCollections();
            });
        };

        $scope.toogleEditMode = function (collection) {
            if (collection.editmode === null) {
                collection.editmode = false;
            }
            collection.editmode = !collection.editmode;
            collection.newName = collection.fields.name;
        };

        $scope.editCollection = function (collection) {
            collectionService.update(collection.pk, collection.newName).then(function (data) {
                $scope.loadCollections();
            });
        };
    };

    angular.module('freesounds.controllers').controller('LibraryCrtl', ['$rootScope', '$scope', '$location', '$routeParams', '$route', 'collectionService', LibraryCrtl]);
}());