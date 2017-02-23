
(function () {
        'use strict';

        var ProfileSvc = function ($resource, $http) {

                var profileService = {
                    query: function (user_id) {
                        var promise = $http.get('/api/profile/' + user_id, {})
                            .then(function (response) {
                                return response.data;
                            });
                        return promise;
                    },
                    update: function (data) {
                        var heads = {
                            'X-Requested-With': 'XMLHttpRequest',
                            'Content-Type': 'application/x-www-form-urlencoded',
                        };

                        var promise = $http.post('/api/profile/update',
                            {
                                headers: heads,
                                body: data
                            }
                            )
                            .then(function (response) {
                                return response.data;
                            }, function (error) {
                                console.log(error);
                            });
                        return promise;
                    }
                };

                return profileService;
            }
            ;

        angular.module('freesounds.services').factory('profileService', ['$resource', '$http', ProfileSvc]);
    }()
);
