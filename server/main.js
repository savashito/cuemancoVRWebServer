import { Meteor } from 'meteor/meteor';
import http from 'http';
import socket_io from 'socket.io';
// import Fiber from 'fiber';
const PORT = 8080;



var Fiber = require('fibers');

var SocketMsgCallback = function(name,socket){
	return function(rowerJSON){
		SocketIOUtil.msgQueue.push({type:name,payload:rowerJSON,socket:socket})
	}
}

// Tracker.autorun(function() {
//   if (Meteor.userId()) {
//   	console.log('You login!');
//     // do something when they've just logged in.
//   }
// });


Meteor.startup(() => {
	Fiber(SocketIOUtil.SocketIOCallbackLoop).run()
	
	const server = http.createServer();
	const io = socket_io(server);

	// New client
	io.on('connection', function(socket) {
		console.log("Human connected ");
		socket.on('connectToWorkout', SocketMsgCallback('connectToWorkout',socket));
		socket.on('createWorkout', SocketMsgCallback('createWorkout',socket))
		socket.on('login', SocketMsgCallback('login',socket));
		socket.on('createRower',SocketMsgCallback('createRower',socket))
		socket.on('startWorkout',SocketMsgCallback('startWorkout',socket))
		socket.on('setLane',SocketMsgCallback('setLane',socket))
		socket.on('ergData',SocketMsgCallback('ergData',socket))
		socket.on('requestListWorkouts',SocketMsgCallback('requestListWorkouts',socket))
		socket.emit('connected',{success:true});
		// socket.emi 
		/*
		socket.on('udpateRower',function(rowerJSON){
			var rower = RowerController.getRower(rowerJSON);
			rower.update(rowerJSON);
		});*/
		/*
		socket.on('assignErgToRower',function(JSON){
			RowerController.assignErgToRower(JSON.rower,JSON.erg);
		});
		*/



	// socket.on('ergData', function (ergData) {
	// 	console.log(ergData);
	// 	return;
	// 	// get the rower
	// 	// get workout and add entry

	// 	var rower = Rowers.getByErgId(ergData.pyid);
	// 	rower.addSplit(ergData);
	// 	var workout = WorkoutManager.activeWorkouts.getByRower(rower);
	// 	workout.broadcastToPeers(rower, ergData);

	// 	/*
	// 	rower = RowerController.getRowerFromErgId(ergData.id);
	// 	workout = rower.getActiveWorkout();
		
	// 	// Broadcast to users the info we just got
	// 	workout.broadcastToPeers(rower, ergData)
	// 	// Save the data to the user 
	// 	rower.update(ergData);*/
		
	// });



	});
	// Start server
	try {
		server.listen(PORT);
	} catch (e) {
		console.error(e);
	}



});


	 // var socket = io('https://localhost');

		// 	console.log("socket variable set");
		// socket.on('connect', Meteor.bindEnvironment(function() {
		//   console.log('Connected to the websocket!');
		// 			socket.on('server_ergData', function (socket) {
		// 				console.log("Se conecto");
						
		// 				socket.on('server_ergData', function(rowerJSON){
		// 					console.log("Se Workout",rowerJSON);
						
		// 				});

		// 			});
		// }));
/*
Streamy.onConnect(function(socket) {
	console.log("Connected");
	/*Tracker.autorun(function() {
	//  var uid = Streamy.userId(socket); // uid will be null if the user is not logged in, otherwise, it will take the userId value

//    console.log("New userId state for", Streamy.id(socket), uid);
	});
});*/

/*
		socket.on('connect', Meteor.bindEnvironment(function() {
				console.log('Connected to the websocket!');
				//Meteor.call('methodName1');

				// on data event
				socket.on('data-event', Meteor.bindEnvironment(function(data) {
						console.log(data);
						Meteor.call('methodName2');
				}, function(e) {
						throw e;
				}));

				// on disconnect
				socket.on('disconnect', Meteor.bindEnvironment(function() {
					console.log('Disconnected from the websocket!');
					Meteor.call('methodName3');
				}, function(e) {
					throw e;
				}));

		}, function(e) {
				throw e;
		}));
*/
	/*
	// code to run on server at startup
	if (Meteor.isServer) {
	var csvParseSync = Meteor.wrapAsync(CSVParse);
	var output;
	try {
		output = csvParseSync('foo,bar\n1,2', { columns: true });
	} catch (error) {
		throw new Meteor.Error('csv-parse-fail', error.message);
	}
	console.log(output); // [ { foo: '1', bar: '2' } ]
}*/
