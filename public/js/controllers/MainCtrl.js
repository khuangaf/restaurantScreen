'use strict';
angular.module('sampleApp').controller('MainController', function($scope, $http, socket) {

	
	$scope.reservations = [
	    // { number: 6, time:"17:00:00", wanted: false },
	    // { number: 7, time:"17:00:00", wanted: false },
	    // { number: 8, time:"17:00:00", wanted: false },
	    // { number: 9, time:"17:00:00", wanted: false }
  	];
  	var currentURL = window.location.href;
  	currentURL = currentURL.substr(0,currentURL.length-1);
  	console.log(currentURL);
	// var socket = io(currentURL);
	// var socket = req.app.get('socketio');
  // 	var socket = io(currentURL);
  	

  // 	// var socket = io('http://localhost:8000');
    socket.on('server',function(message){	

		console.log(message);
		$scope.reservations.push({number:message.people, time:message.time, wanted:false});
		$scope.$apply();    		
    });

    
    
    $scope.confirm = function(index){
    	//if originally is is not wanted, send the confirmation back to chatbot
    	$scope.reservations.splice(index,1);
    	// $scope.$apply();
		// console.log(wanted)
		var params = {message:"Your reservation is confirmed."}
		socket.emit('out',params);

    	
    }


});