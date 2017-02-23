/**
 * Created by Jorge Perea on 01/10/2016.
 * Controlador que se encarga de la ejecución de las diferentes funciones y de la obtención de la respuesta
 */

(function () {
    'use strict';

    var NewsFeedCrtl = function ($rootScope, $cookieStore,$scope,$q, $location, $routeParams, $route, artistService, S3UploadService) {
        $scope.newItem={};
        $scope.newsfeeds=[];
        $scope.Errors=[];
        $rootScope.Locations=[];
        $scope.upload={}
        $scope.loadNews = function () {
              $scope.newsfeeds=[];
            artistService.list_newsfeed().then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    var news_id = data[i].pk.toString();

                    var tempNewsFeed = {
                        id: news_id,
                        title: data[i].fields.title,
                        content: data[i].fields.content,
                        url: data[i].fields.image
                    };
                    $scope.newsfeeds.push(tempNewsFeed);
                }
                console.log($scope.newsfeeds)

                if(typeof $routeParams.newsfeed_id !== 'undefined')
                {
                    console.log($scope.newsfeeds.length)
                    var j;
                    for (j = 0; j < $scope.newsfeeds.length; j++) {
                        console.log("entro");
                        if($scope.newsfeeds[j].id===$routeParams.newsfeed_id)
                        {
                            console.log(j)
                            $scope.selectednewsfeed=$scope.newsfeeds[j];
                            console.log($scope.selectednewsfeed);
                            break;
                        }
                    }
                }
            }, function (response) {
                $scope.error = true;
                console.log('Error: ' + response);
            })
        };
        $scope.loadNews();

        $scope.addImage=function(files){
            $scope.Errors=[];
            console.log(files[0]);
            if(files[0].type.includes("image"))
            {
                $scope.newItem.url=files;
            }else
            {
                $scope.Errors.push( "The Piece extension must be an image");
            }

        };

        $scope.add=function()
        {
            console.log("agregando");
            $scope.uploadFiles($scope.newItem.url).then(function (data)
            {
                 var data = {
                            title: $scope.newItem.title,
                            content:$scope.newItem.content,
                            url: $rootScope.Locations[0].Location,
                            artist: $cookieStore.get('username')
                        }
                artistService.add(data).then(function (result) {
                            // Mark as success
                            if (result.status == undefined) {
                                $scope.Errors = [];
                                $rootScope.Locations = [];
                                $scope.newItem = {};
                                $scope.upload.success = true;
                            }
                            else {
                                $scope.Errors.push("An error has ocurred, please contact the system administrator ");
                                $scope.upload.success = false
                            }

            });
        })};
        /*Metodo de agregar a S3*/
        $scope.uploadFiles = function (files) {
            var defered = $q.defer();
            var promise = defered.promise;
            $scope.Files = files;
            if (files && files.length > 0) {
                angular.forEach($scope.Files, function (file, key) {
                        $scope.File=file

                        S3UploadService.Upload(file).then(function (result) {

                            // Mark as success
                            file.Success = true;
                            defered.resolve(result);

                        }, function (error) {
                            // Mark the error
                            $scope.Error = error;
                            defered.reject(error)
                        }, function (progress) {
                            // Write the progress as a percentage
                            file.Progress = (progress.loaded / progress.total) * 100
                        });
                    }

                );
            }
            return promise};

    };


    angular.module('freesounds.controllers').controller('NewsFeedCrtl', ['$rootScope', '$cookieStore','$scope','$q', '$location', '$routeParams', '$route','artistService','S3UploadService', NewsFeedCrtl]);
}());
