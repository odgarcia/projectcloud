/**
 * Created by TOSHIBA on 26/09/2016.
 */
(function () {
    'use strict';

    var AudioPlayerCrtl = function ($rootScope, $scope, $location, piecesService, artistService, angularPlayer) {

        $rootScope.isPlay = true;
        $rootScope.togglePlayButton = function () {
            $rootScope.isPlay = !$rootScope.isPlay;
        };

        $rootScope.transformToSongs = function (data) {
            $rootScope.songs = [];
            for (var i = 0; i < data.length; i++) {

                var tempSong = {
                    id: data[i].pk.toString(),
                    title: data[i].fields.name,
                    artist: data[i].fields.artist_name,
                    url: data[i].fields.url,
                    duration: data[i].fields.duration,
                    image_cover: data[i].fields.image_cover,
                    viewCollections: false
                };



                $rootScope.songs.push(tempSong);
            }
        };
    };

    angular.module('freesounds.controllers').controller('AudioPlayerCrtl', ['$rootScope', '$scope', '$location', 'piecesService', 'artistService', 'angularPlayer', AudioPlayerCrtl]);
}());