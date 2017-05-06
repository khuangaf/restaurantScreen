// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');


// configuration ===========================================
	
// config files
var db = require('./config/db');
var server = require('http').Server(app);
var request = require('request');
var url = require('url');
var io = require('socket.io')(server);
var port = process.env.PORT || 8000; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
// app.use(cors())


app.get('/api/reserve',function(req,res){
		// console.log(req)
		//parse the parameters
		var url_parts = url.parse(req.url, true);
		var query = url_parts.query;
		var people = query.people;
		var time = query.time;
		//send the reservation to front end
		console.log(people)
		console.log(time)
		io.sockets.emit('server',{people:people, time:time});
		res.json({"status":"OK"});

	});
io.on("connection",function(socket){

	//listen on the api
	socket.on('out',function(parameters){
		var url ="https://hotel-agent.herokuapp.com/api/confirm";
		request({url:url, qs:parameters},function(err,response, body){
		    if(err) { console.log(err); return "error"; }
		    console.log("Get response: " + response.statusCode);
		    console.log(response);
		  });
		console.log(parameters)
	})
});
// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
// Listening on the port
server.listen(port, function(){
  console.log('listening on *:' + port);
});

// module.exports.io = io;
exports.io = io;
exports = module.exports = app; 						// expose app
