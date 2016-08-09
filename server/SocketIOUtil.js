

var msgQueue = [];

var SocketIOCallbackLoop = function(){
	while(1){
		if(msgQueue.length > 0){
			var msg = msgQueue.pop();

			// {type:'createWorkout',payload:rowerJSON}
			IOCallbacks[msg.type](msg.payload,msg.socket);
			// console.log(msg);
			// rowerJSON = msg.payload;
			// msgQueue
		}else{
			FiberUtil.sleep(10);
		}
		// Fiber.yield();
		// sleep();
	}
}
// add logging callback
Accounts.onLogin(function(){
	console.log("Logeado con exito");
	IOCallbacks["login"](Meteor.user(),undefined);
});


var IOCallbacks = {
	'createWorkout':function(rowerJSON,socket){
		var rower = Rowers.getByUserId(rowerJSON.userId);
		console.log(rower);
		rower.setSocket(socket);
		if(rower.isInWorkout()){
			var workoutObj = rower.getActiveWorkout();
			console.log("Rower is already in workout",workoutObj);
			socket.emit('workoutCreatedFailed',{workoutId:workoutObj._id,workoutName:workoutObj.name});
		}else{
			var workoutObj = ActiveWorkouts.create(rowerJSON.workoutName,rower);
			console.log("Workout created suceessfully",workoutObj);
			socket.emit('createWorkoutSuccess',{workoutId:workoutObj._id,workoutName:workoutObj.name});
		}
	},
	'connectToWorkout':function(rowerJSON,socket){
		console.log('connectToWorkout',rowerJSON);
		var rower = Rowers.getByUserId(rowerJSON.userId);
		// console.log(rower);
		rower.setSocket(socket);
		if(rower.isInWorkout()){
			var workoutObj = rower.getActiveWorkout();
			socket.emit('connectToWorkoutFailed',{workoutId:workoutObj._id,workoutName:workoutObj.name});
		}else{
			var workoutObj = ActiveWorkouts.addRower(rowerJSON.workoutId,rower);
			console.log(workoutObj);
			if(workoutObj==undefined){
				socket.emit('connectToWorkoutFailed',{workoutId:workoutObj._id,workoutName:workoutObj.name});

			}else{
				socket.emit('connectToWorkoutSuccess',{workoutId:workoutObj._id,workoutName:workoutObj.name});

			}
		}
	},
	'login':function(userJSON,socket){
		console.log('login',userJSON);
		var name = userJSON.profile.name;
		var id = userJSON._id;
		var rower = Rowers.fetchOrCreate({userId: id,name:name});
		rower.setSocket(socket);
	},	
	'setLane':function(userJSON,socket){
		console.log('setLane',userJSON);
		var lane = userJSON.lane;
		var id = userJSON.userId;
		var rower = Rowers.getByUserId(id);
		rower.setSocket(socket);
		rower.setLane(lane);
	},
	'startWorkout':function(rowerJSON,socket){
		console.log("Worout started ",rowerJSON);
		var workoutManager = ActiveWorkouts.getWorkoutByRowerId(rowerJSON.userId);
		var rower = Rowers.getByUserId(rowerJSON.userId);
		rower.setSocket(socket);
		if(workoutManager==undefined){
			console.log('The user ',rowerJSON,' Is not in a workout');
		}else{
		
			workoutManager.start();
		}
	},
	'requestListWorkouts':function(rowerJSON,socket){
		console.log("List workoust ");
		socket.emit('responseListWorkouts',{workouts:"just a test"});

	},
	'ergData': function (ergData,socket) {
		console.log(ergData);
		// get the rower
		// get workout and add entry

		var rower = Rowers.getByErgId(ergData.cid);
		if(rower == undefined){
			console.log("Error, unkonw erg");
			return;
		}
		// console.log(ergData.cid,rower.name,rower.workouts);
		
		rower.addSplit(ergData);

		var workout = ActiveWorkouts.getWorkoutByRowerId(rower.userId);
		workout.broadcastToPeers(rower, ergData);

//		*/
		// workout.save()
		return;
		

		/*
		rower = RowerController.getRowerFromErgId(ergData.id);
		workout = rower.getActiveWorkout();
		
		// Broadcast to users the info we just got
		workout.broadcastToPeers(rower, ergData)
		// Save the data to the user 
		rower.update(ergData);*/
		
	},
	/*
	'createRower':function(rowerJSON,socket){
		console.log("Create Rower",rowerJSON);
		var rower = Rowers.create(rowerJSON);
		rower.setSocket(socket);

	}*/

}

// name space
SocketIOUtil = {
	SocketIOCallbackLoop:SocketIOCallbackLoop,
	msgQueue:msgQueue
};
