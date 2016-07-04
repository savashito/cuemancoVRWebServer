import { Meteor } from 'meteor/meteor';

// fs = Npm.require('fs');
// fs.readFile('http://localhost:3000/logrodrigo.csv',  function (err,data) {
// console.log(data);
// console.log(err);

// });

import http from 'http';
import socket_io from 'socket.io';

const PORT = 80;
Meteor.startup(() => {
	
	const server = http.createServer();
  const io = socket_io(server);

  let counter = 0;

  // New client
  io.on('connection', function(socket) {
    // console.log('new socket client');
    socket.on('ergData', function (ergData) {
    	// socket.emit('server_ergData',ergData);
    	console.log(ergData);
  	});
 socket.on('connectToWorkout', function(rowerJSON){
    var rower = RowerController.getRower(rowerJSON.id);
    rower.setSocket(socket);
    // add the workout if non-existing or get current workout
    var workout = WorkoutController.getWorkout(rower);
    workout.addRower(rower);
    // Save workout changes to db
    
    workout.update();
    // rower.update(rowerJSON);
    // workout.save();
    // rowerJSON = socket;


    // var workout = rower.workout;
    // workout doesn't exist
    // workout = {} or undefined
    // workout = {ditance:20000,time:60*60}
    // connect to existing workout
    // workout = {id=123}

    


    /*
    if(listCurrentWorkouts[workout.id]==undefined):
      listCurrentWorkouts[workout.id] = WorkoutUtil.createWorkout(workout);
    workout = listCurrentWorkouts[workout.id];
    */
    // add rower to workout
  });
  socket.on('udpateRower',function(rowerJSON){

    var rower = RowerController.getRower(rowerJSON);
    rower.update(rowerJSON);
  });
  socket.on('assignErgToRower',function(JSON){
    RowerController.assignErgToRower(JSON.rower,JSON.erg);
    // var erg = JSON.erg;

  });

  socket.on('startWorkout',function(rowerJSON){

  });

  socket.on('ergData', function (ergData) {
    socket.emit('server_ergData',ergData);
    // console.log(ergData);
    /*
    console.log(ergData);
    rower = RowerController.getRowerFromErgId(ergData.id);
    workout = rower.getActiveWorkout();
    
    // Broadcast to users the info we just got
    workout.broadcastToPeers(rower, ergData)
    // Save the data to the user 
    rower.update(ergData);
    */
  });


  	
  });
  // Start server
  try {
    server.listen(PORT);
  } catch (e) {
    console.error(e);
  }


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

});
