/**
 * Created by Jorge Perea on 01/10/2016.
 * Controlador que se encarga de la ejecución de las diferentes funciones y de la obtención de la respuesta
 */

(function () {
    'use strict';

    var ArtistCrtl = function ($rootScope, $scope, $location, $routeParams, $route, artistService) {

        $rootScope.artists = [];
        $rootScope.pieces = [];

        $scope.create = function () {
            var res = artistService.create($scope.form).then(function (data) {
                console.log(JSON.stringify(data));
                if (data.mensaje == 'ok') {
                    $scope.success = true;
                    $scope.mensaje = 'Se creo el artista de forma exitosa';
                } else {
                    console.log('Ocurrio un error:' + data);
                    $scope.error = true;
                    $scope.mensaje = data.mensaje;
                }
            })
        };
        $scope.loadArtist = function () {
            artistService.list().then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    var artist_id = data[i].pk.toString();

                    var tempArtist = {
                        id: artist_id,
                        name: data[i].fields.name,
                        last_name: data[i].fields.last_name,
                        avatar: data[i].fields.avatar,
                        name_artistic: data[i].fields.name_artistic,
                        userId: data[i].fields.userId
                    };
                    $rootScope.artists.push(tempArtist);
                }
            }, function (response) {
                $scope.error = true;
                console.log('Error: ' + response);
            })
        };
        $scope.loadArtist();
        $scope.loadArtistPieces = function () {
            artistService.list_pieces($routeParams.user_id).then(function (data) {
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
        $scope.loadArtistPieces();

    };


    angular.module('freesounds.controllers').controller('ArtistCrtl', ['$rootScope', '$scope', '$location', '$routeParams', '$route','artistService', ArtistCrtl]);
}());
