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

    $scope.users = ['Fabio', 'Leonardo', 'Thomas', 'Gabriele', 'Fabrizio', 'John', 'Luis', 'Kate', 'Max'];
    function createCORSRequest(method, url) {
	  var xhr = new XMLHttpRequest();
	  if ("withCredentials" in xhr) {

	    // Check if the XMLHttpRequest object has a "withCredentials" property.
	    // "withCredentials" only exists on XMLHTTPRequest2 objects.
	    xhr.open(method, url, true);
		
	    
	  } else if (typeof XDomainRequest != "undefined") {

	    // Otherwise, check if XDomainRequest.
	    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
	    xhr = new XDomainRequest();
	    
	  } else {

	    // Otherwise, CORS is not supported by the browser.
	    xhr = null;

	  }
	  return xhr;
	}
    $scope.toggle = function(wanted){
    	//if originally is is not wanted, send the confirmation back to chatbot
    	if(!wanted){
    		// var url ="https://young-castle-82935.herokuapp.com/api/facility"
   //  		var xhr = createCORSRequest('GET', url);
			// if (!xhr) {
			//   throw new Error('CORS not supported');
			// }
			var params = {facility:'light', action:'turn off'};
	    	// xhr.send(params)

			// $http.get(url,{headers: {'Access-Control-Allow-Origin': '*'}}).then(function(response){
			// 	console.log(response)
			// });
			socket.emit('out',params);

    	}
    	if(wanted) console.log('nono')
    }


});