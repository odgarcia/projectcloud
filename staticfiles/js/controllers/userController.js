/**
 * Created by Jorge Perea on 22/10/2016.
 * Controller para los servicios relacionados con el usuario
 */

(function () {
    'use strict';

    var UserCrtl = function ($rootScope,$cookieStore, userService, $uibModal, $http, $location, $scope) {
        $scope.error = false;

        /**
         * Funcion para realizar el login del usuario
         */
        $scope.submitForm = function () {
            var res = userService.login($scope.login, $http).then(function (data) {
                if (data.mensaje == 'ok') {
                    var logged = userService.islogged($http).then(function (data) {
                        if (data.mensaje == 'ok') {
                            $rootScope.authenticated = true;
                            $rootScope.auth_user = $scope.login.username;
                            $scope.closeModal();
                            $location.url("/pieces");
                            $cookieStore.put('username',$scope.login.username);
                        } else {
                            console.log('Error while trying to log user');
                        }
                    })

                } else {
                    console.log('Ocurrio un error:' + JSON.stringify(data));
                    $scope.error = true;
                    $scope.show = true;
                    $scope.mensaje = data.mensaje;
                }
            }, function (response) {
                $scope.error = true;
                console.log('Error: ' + response);
            })
        }

        /**
         * Funcion para la creacion de un usuario en la aplicacion
         */
        $scope.create = function () {
            var res = userService.create($scope.form, $http).then(function (data) {
                console.log(JSON.stringify(data));
                $scope.show = true;
                if (data.mensaje == 'ok') {
                    $scope.success = true;

                    $scope.mensaje = 'User was created successfully';
                } else {
                    console.log('Error:' + data);
                    $scope.error = true;
                    $scope.mensaje = data.mensaje;
                }
            })
        }

        /**
         * Funcion para realizar logout del usuario
         */
        $scope.logout = function () {
            userService.logout($http).then(function (data) {
                    if (data.mensaje == 'ok') {
                        $rootScope.authenticated = false;
                        $rootScope.auth_user = '';
                        $cookieStore.remove('username');
                        $location.url("/pieces");
                    }
                });
        }

        /**
         * Abre el modal que contiene las opciones de registro y login
         */
        $scope.openModal = function() {
            $rootScope.modalInstance = $uibModal.open({
            templateUrl: 'static/partials/loginModal.html',
            controller: 'UserCrtl',
            bindToController: true,
            scope : $scope});
        }

        /**
         * Cierra el modal de login y registro
         */
        $scope.closeModal = function() {
            var modalInstance = $rootScope.modalInstance.close();
        }

        /**
         * Verifica si el usuario actual se encuentra autenticado
         */
        $scope.isLoggedIn = function() {
           return $rootScope.authenticated;
        }

        /**
         * Funcion para limpiar mensajes de creacion de usuario
         */
        $scope.clear = function() {
            $scope.show = false;
           delete $scope.mensaje
        }
    };
        angular.module('freesounds.controllers').controller('UserCrtl', ['$rootScope','$cookieStore', 'userService', '$uibModal', '$http', '$location','$scope', UserCrtl]);
}());