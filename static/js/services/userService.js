/**
 * Created by Jorge Perea on 22/10/2016.
 */

(function () {
    'use strict';
    var UserSvc = function ($resource, $http) {

        var loginService = {
            login: function (data, $http) {
                //Headers que se deben enviar con la petición
                //X-Requested-With hace que el navegador no muestre un popup alternativo
                var heads = {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/x-www-form-urlencoded',
                };

                var promise = $http.post('/api/login/',
                    {
                        headers: heads,
                        body: data
                    }).then(function (response) {
                    return response.data;
                });
                return promise;
            },
            logout: function ($http) {
                var promise = $http.get('/api/logout', {}).then(function (response) {
                    return response.data;
                });
                return promise;
            },
            islogged: function ($http) {
                var promise = $http.get('/api/islogged', {}).then(function (response) {
                    return response.data;
                });
                return promise;
            },
            create: function (data, $http) {
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
            }
        };

        return loginService;

    };

    angular.module('freesounds.services').factory('userService', ['$http', UserSvc]);
}());