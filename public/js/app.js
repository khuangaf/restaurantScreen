var app = angular.module('sampleApp', ['ngMaterial']);
app.config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});