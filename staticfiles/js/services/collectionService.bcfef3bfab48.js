/**
 * Created by Minna on 5/10/2016.
 */
(function () {
        'use strict';

        var collectionSrv = function ($http) {
            var CreateCollectionService = {
                create: function (data) {
                    var heads = {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    };
                    var promise = $http.post('/api/collections/create',
                        {
                            headers: heads,
                            body: data
                        }
                    ).then(function (response) {
                            return response.data;
                        }
                    );
                    return promise;
                },
                list: function () {
                    var promise = $http.get('/api/collections/', {}).then(function (response) {
                            return response.data;
                        }
                    );
                    return promise;
                },
                add: function (data) {
                    var heads = {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    };
                    var promise = $http.put('/api/collections/add',
                        {
                            headers: heads,
                            body: data
                        }
                    ).then(function (response) {
                            return response.data;
                        }
                    );
                    return promise;
                },
                piecesById: function (collection_id) {
                    var promise = $http.get('/api/collections/' + collection_id + '/pieces', {}).then(function (response) {
                            return response.data;
                        }
                    );
                    return promise;
                },
                delete: function (collection_id) {
                    var promise = $http.delete('/api/collections/' + collection_id + '/delete', {}).then(function (response) {
                            return response.data;
                        }
                    );
                    return promise;
                },
                update: function (collection_id, new_name) {
                    var promise = $http.put('/api/collections/' + collection_id + '/update', {name: new_name})
                        .then(function (response) {
                            return response.data;
                        }
                    );
                    return promise;
                }
            };
            return CreateCollectionService;
        };
        angular.module('freesounds.services').service('collectionService', ['$http', collectionSrv]);
    }()
);