
(function () {
    'use strict';

    var AddPiecesCrtl = function ($rootScope,$cookieStore, $scope, Upload, $q, S3UploadService,piecesService,categoryService ) {
        categoryService.list().then(function (data) {
            $scope.categories = data;
        });

        $scope.Errors=[];
        $rootScope.Locations=[];
        $scope.newPiece={};
        $scope.upload={}

        $scope.addPiece=function(){
            $scope.Errors=[]
            if($scope.newPiece.cover!=undefined && $scope.newPiece.sound!=undefined){

             console.log($scope.newPiece.sound[0]);
                    var objectUrl= URL.createObjectURL($scope.newPiece.sound[0])
                   // console.log(x);
                 $("#audio").prop("src", objectUrl);
                $("#audio").on("canplaythrough", function(e){
                 var seconds = e.currentTarget.duration;
                    var duration = moment.duration(seconds, "seconds");

                 var time = "";
                var hours = duration.hours();
                if (hours > 0) { time = hours + ":" ; }

    time = time + duration.minutes() + ":" + duration.seconds();
    $scope.newPiece.duration=time;

    URL.revokeObjectURL(objectUrl);
});
           // if($scope.newPiece.cover[0].type.contains("image") && $scope.newPiece.sound[0].type.contains("audio")) {
                $scope.uploadFiles($scope.newPiece.cover).then(function (data) {

                    $scope.uploadFiles($scope.newPiece.sound).then(function (data) {

                        var data = {
                            name: $scope.newPiece.name,
                            sound: $rootScope.Locations[1].Location,
                            cover: $rootScope.Locations[0].Location,
                            duration: $scope.newPiece.duration,
                            category: $scope.newPiece.category,
                            artist: $cookieStore.get('username')
                        }
                        piecesService.add(data).then(function (result) {
                            // Mark as success
                            if (result.status == undefined) {
                                $scope.Errors = [];
                                $rootScope.Locations = [];
                                $scope.newPiece = {};
                                $scope.upload.success = true
                            }
                            else {
                                $scope.Errors.push("An error has ocurred, please contact the system administrator ");
                                $scope.upload.success = false
                            }

                        });
                    });
                });


            }else
                {
                     $scope.Errors.push("You have to select a image cover and piece ")
                }
        }
        $scope.addCover=function(files){
            $scope.Errors=[];
            console.log(files[0]);
            if(files[0].type.includes("image"))
            {
                $scope.newPiece.cover=files;
            }else
                {

                     $scope.Errors.push ("The Cover extension must be png or jpg");

                }


        }
        $scope.addSound=function(files){
            $scope.Errors=[];
            console.log(files[0]);
              if(files[0].type.includes("audio"))
            {
                 $scope.newPiece.sound=files;
            }else
                {
                       $scope.Errors.push( "The Piece extension must be mp3 or wav");
                }

        }

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
           return promise}
    };

    angular.module('freesounds.controllers').controller('AddPiecesCrtl', ['$rootScope','$cookieStore', '$scope','Upload','$q', 'S3UploadService','piecesService','categoryService', AddPiecesCrtl]);
 }());