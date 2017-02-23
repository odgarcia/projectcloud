/**
 * Created by Jorge Perea on 01/10/2016.
 * Service para las diferentes funciones definidas para el artista
 */
(function () {
    'use strict';

    var ArtistSvc = function ($resource,$http) {
        var artistService = {
            list: function () {
                var promise = $http.get('/api/search_artist/', {})
                    .then(function (response) {
                        return response.data;
                    });
                return promise;
            },
            create: function (data) {
                var heads = {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/x-www-form-urlencoded',
                };
                var promise = $http.post('/api/createArtist/',
                    {
                        headers: heads,
                        body: data
                    }).then(function (response) {
                    return response.data;
                });
                return promise;
            },
            list_pieces: function (id) {
                var promise = $http.get('/api/search_artist/'+id+'/pieces', {})
                    .then(function (response) {
                        return response.data;
                    });
                return promise;
            },
              findById: function (user_id) {
                var promise = $http.get('/api/artist/'+user_id, {})
                    .then(function (response) {
                        return response.data;
                    });
                return promise;
            },
            list_newsfeed: function () {
                var promise = $http.get('/api/newsfeed', {})
                    .then(function (response) {
                        return response.data;
                    });
                return promise;
            },
             getLikes:function (newsfeed_id) {
                        var promise = $http.get('/api/newsfeed/' + newsfeed_id +'/likes',{})
                            .then(function (response) {
                                return response.data.likes;
                            }, function (error) {
                                console.log("entro en error");
                               return error;
                            });
                        return promise;
                    },
                    wasLiked:function (newsfeed_id, username) {
                        var promise = $http.post('/api/newsfeed/' + newsfeed_id +'/liked',{username:username})
                            .then(function (response) {
                                return response.data.liked;
                            }, function (error) {
                                console.log("entro en error");
                               return error;
                            });
                        return promise;
                    },
                    like:function (newsfeed_id, username) {
                        var promise = $http.post('/api/newsfeed/' + newsfeed_id +'/like',{username:username})
                            .then(function (response) {
                                return response;
                            }, function (error) {
                                console.log("entro en error");
                               return error;
                            });
                        return promise;
                    },
                    unlike:function (newsfeed_id, username) {
                        var promise = $http.post('/api/newsfeed/' + newsfeed_id +'/unlike',{username:username})
                            .then(function (response) {
                                return response;
                            }, function (error) {
                                console.log("entro en error");
                               return error;
                            });
                        return promise;
                    },
            add:function (data) {
                        var heads = {
                            'X-Requested-With': 'XMLHttpRequest',
                            'Content-Type': 'application/x-www-form-urlencoded',
                        };

                        var promise = $http.post('/api/newsfeed/add_newsfeed/',{body:data}

                            )
                            .then(function (response) {
                                return response.data;
                            }, function (error) {
                                console.log("entro en error");
                               return error;
                            });
                        return promise;
                    }
        };

        return artistService;
    };

    angular.module('freesounds.services').factory('artistService', ['$resource','$http', ArtistSvc]);
}());
