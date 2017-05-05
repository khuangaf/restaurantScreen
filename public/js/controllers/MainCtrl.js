app.controller('MainController', function($scope, $http) {

	
	$scope.reservations = [
	    { number: 6, time:"17:00:00", wanted: false },
	    { number: 7, time:"17:00:00", wanted: false },
	    { number: 8, time:"17:00:00", wanted: false },
	    { number: 9, time:"17:00:00", wanted: false }
  	];
  	// var socket = io();
  	var socket = io();
    socket.on('server',function(message){	
		console.log(message);
		$scope.reservations.push({number:message.people, time:message.time, wanted:false});
		$scope.$apply();    		
    });

    
    
    $scope.confirm = function(wanted){
    	//if originally is is not wanted, send the confirmation back to chatbot
    	if(!wanted){
    		console.log(wanted)
			var params = {facility:'light', action:'turn off'};
			socket.emit('out',params);

    	}
    	if(wanted) console.log('nono')
    }


});