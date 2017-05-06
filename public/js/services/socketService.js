/* global io */
'use strict';
var currentURL = window.location.href;
  	currentURL = currentURL.substr(0,currentURL.length-1);
  	console.log(currentURL);

angular.module('sampleApp')
  .factory('socket', function(socketFactory) {
    var socket = io.connect();

    var wrappedSocket = socketFactory({
      ioSocket: socket
    });

    wrappedSocket.reconnect = function() {
      if(socket.socket.connected) {
        socket.socket.disconnect();
        socket.socket.connect();
      } else {
        socket.socket.connect();
      }
    };

    wrappedSocket.disconnect = function() {
      socket.socket.disconnect();
    };

    wrappedSocket.connect = function() {
      socket.socket.connect();
    };

    return wrappedSocket;
  });