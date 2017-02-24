/**
 * Created by TOSHIBA on 26/09/2016.
 */
(function () {
        'use strict';


        var PiecesCrtl = function ($rootScope, $scope, $location, $cookieStore, $routeParams, piecesService, artistService, collectionService) {

            if(typeof $cookieStore.get('username') !== "undefined") {
                $rootScope.authenticated = true;
                $rootScope.auth_user = $cookieStore.get('username');
            }

            $scope.selectedCollection = {};

            $rootScope.songs = [];

            $scope.loadPieces = function () {
                piecesService.list().then(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        var piece_id = data[i].pk.toString();

                        var tempSong = {
                            id: piece_id,
                            title: data[i].fields.name,
                            artist: data[i].fields.artist_name,
                            url: data[i].fields.url,
                            duration: data[i].fields.duration,
                            image_cover: data[i].fields.image_cover,
                            viewCollections: false,
                            likes: 0,
                            upvoted: false,

                        };

                        $rootScope.songs.push(tempSong);
                    }
                }, function (response) {
                    $scope.error = true;
                    console.log('Error: ' + response);
                }).then(function () {
                    $scope.loadLikes();
                }).then(function () {
                    $scope.loadUpvotes();
                });
            };
            $scope.loadPieces();

            $scope.loadLikes = function () {
                var song = {};
                for (var i = 0; i < $rootScope.songs.length; i++) {
                    (function (song, i) {
                        song = $rootScope.songs[i];
                        piecesService.getLikes(song.id).then(function (likes) {
                            song.likes = likes;
                            return;
                        });
                    }).call(this, song, i)
                }
            };

            $scope.loadUpvotes = function () {
                var song = {};
                for (var i = 0; i < $rootScope.songs.length; i++) {
                    (function (song, i) {
                        song = $rootScope.songs[i];
                        piecesService.wasLiked(song.id, $cookieStore.get('username')).then(function (liked) {
                            song.upvoted = liked;
                            return;
                        });
                    }).call(this, song, i)
                }
            };

            collectionService.list().then(function (data) {
                $scope.availableCollections = data;
            });

            $scope.viewDetail = function (piece_id) {
                $("body").removeClass("modal-open");
                $(".modal-backdrop").remove();
                $location.url('/pieces/' + piece_id);
            };

            $scope.$on('track:loaded', function (event, data) {
                $rootScope.isPlay = false;
            });

            $scope.$on('track:progress', function (event, data) {
                if (data > 99.9) {
                    $rootScope.isPlay = true;
                }
            });

            $scope.showCollections = function (piece) {
                piece.viewCollections = !piece.viewCollections;
            };

            $scope.addToCollection = function (piece, collection) {
                collectionService.add({piece_id: piece.id, collection_id: collection.pk}).then(function (response) {
                    console.log(JSON.stringify(response));
                    piece.viewCollections = false;
                })
            };

            $scope.upVote = function (piece) {
                var username = $cookieStore.get('username');
                var piece_id = piece.id;
                piecesService.like(piece_id, username).then(function (data) {
                    piece.upvoted = true;
                    piecesService.getLikes(piece_id).then(function (likes) {
                        piece.likes = likes;
                        $scope.loadRank();
                    });
                });
            };

            $scope.downVote = function (piece) {
                var username = $cookieStore.get('username');
                var piece_id = piece.id;
                piecesService.unlike(piece_id, username).then(function (data) {
                    piece.upvoted = false;
                    piecesService.getLikes(piece_id).then(function (likes) {
                        piece.likes = likes;
                        $scope.loadRank();
                    });
                });
            };

            $scope.loadRank = function () {
                piecesService.rankList().then(function (data) {
                    $scope.rank = data.data;
                });
            };
            $scope.loadRank();




        $scope.listByCategory = function () {
            //FALTA TODO
            piecesService.categoryQuery($routeParams.piece_category).then(function(data){
                for (var i = 0; i < data.length; i++) {

                    var piece_id = data[i].pk.toString();
                    var piece_category = data[i].fields.category.toString();

                    var tempSong = {
                        id: piece_id,
                        title: data[i].fields.name,
                        artist: data[i].fields.artist.name,
                        url: data[i].fields.url,
                        duration: data[i].fields.duration,
                        image_cover: data[i].fields.image_cover,
                        viewCollections: false,
                        likes: 0,
                        category:piece_category,
                        upvoted: false
                    };

                    $rootScope.songs.push(tempSong);
                }
                }, function (response) {
                    $scope.error = true;
                    console.log('Error: ' + response);
                }).then(function () {
                    $scope.loadLikes();
                }).then(function () {
                    $scope.loadUpvotes();
                });
        };
        $scope.listByCategory();
    };



        angular.module('freesounds.controllers').controller('PiecesCrtl', ['$rootScope', '$scope', '$location', '$cookieStore', '$routeParams', 'piecesService', 'artistService', 'collectionService', PiecesCrtl]);

    }()
);