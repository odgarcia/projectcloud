/**
 * Created by TOSHIBA on 26/09/2016.
 */
(function () {
        'use strict';

        var CategorySvc = function ($resource, $http) {

                var categoryService = {
                    list: function () {
<<<<<<< HEAD
                        var promise = $http.get('/api/search_category/', {})
                            .then(function (response) {
                                return response.data;
                            });
                        return promise;
                    },

                    list_pieces: function(category_id){
                        var promise = $http.get('api/search_category/'+category_id+'/',{})
=======
                        var promise = $http.get('/api/category/', {})
>>>>>>> 618e744b78ffb67c7d4dde2f804cb77285fcf230
                            .then(function (response) {
                                return response.data;
                            });
                        return promise;
                    }
                };

                return categoryService;
            }
            ;

        angular.module('freesounds.services').factory('categoryService', ['$resource', '$http', CategorySvc]);
    }()
);
