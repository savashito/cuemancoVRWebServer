
ActiveWorkouts = new Mongo.Collection("activeWorkouts");
var workoutCache = {};
var _workouts = [];
// WorkoutManager.ActiveWorkouts = ActiveWorkouts;

/* ActiveWorkoutsSchema see workout.js


*/
ActiveWorkouts.create = function(name,rower){
	workout = new ActiveWorkout({name: name});
	workout.addRower(rower);


	workoutJSON = ActiveWorkouts.insert(workout.marshal());
	return workoutJSON;

/*
	this._rowers[rower.userId] = workout;

	
	this._workouts[workoutId] = workout;
	*/
	// workoutId = _workouts.length;
	// _workouts[workoutId] = workout;

};

ActiveWorkouts.getAll = function(){
	var workouts = ActiveWorkouts.find().fetch();
	for (i in workouts){
		var workout = workouts[i];
		workout._rowers = Rowers.unmarshal(workout._rowers);
		// Rowers.getByUserId (workout.)

	}
	return workouts;
}

ActiveWorkouts.getAllSmall = function(){
	// this function should remove the workout information to keep the object sleek
	return ActiveWorkouts.getAll ();
	/*
	var workouts = ActiveWorkouts.find().fetch();
	for (i in workouts){
		var workout = workouts[i];
		workout._rowers = Rowers.unmarshal(workout._rowers);

		// Rowers.getByUserId (workout.)

	}
	return workouts;
	*/
}



ActiveWorkouts.updateWorkout = function(workout){
	ActiveWorkouts.update({_id:workout._id},workout.marshal());
}

ActiveWorkouts.addRower = function(workoutId,rower){
	var activeWorkout = ActiveWorkouts.getWorkoutById(workoutId);

	console.log('ActiveWorkouts.addRower ',activeWorkout);
	if(activeWorkout==undefined){
		console.log("Error Workout ID doesn't exist!!");
		return;
	}
	activeWorkout.addRower(rower);
	ActiveWorkouts.update({_id:workoutId},activeWorkout.marshal());
	// bhjkn
	// save to mongo
	return activeWorkout;
	/*
	if(workout==undefined){
		ActiveWorkouts.insert( {name: '',});

		workout = new Workout();
		this._rowers[rower.userId] = workout;
		workoutId = this._workouts.length;
		this._workouts[workoutId] = workout;
	}*/
	//workout.addRower(rower);
	return {workout:workout,workoutId:workoutId};
}

/*
	// creates or gets workout rower is in.
ActiveWorkouts.getByRower = function(rower){
	var workout = this._rowers[rower.userId];
	if(workout==undefined){
		workout = new Workout();
		this._rowers[rower.userId] = workout;
	}
	return workout;
}
*/

//ActiveWorkouts.setName = function(workoutId,name){}
ActiveWorkouts.getWorkoutByRowerId = function(rowerId){
		// rowerRaw = Rowers.findOne({ergIds: { $in: [ergId]}});
	// console.log()
	return new ActiveWorkout(ActiveWorkouts.findOne({_rowers: {$in: [rowerId]}}));

}



ActiveWorkouts.getWorkoutById = function(workoutId){
	// if(userId==undefined)return;
	// is the user caches?
	var workout = workoutCache[workoutId];
	console.log('ActiveWorkouts.getWorkoutById',workout)
	if(workout == undefined){
		var w = ActiveWorkouts.findOne({_id:workoutId});
		if(w == undefined) return w;
		workout = new ActiveWorkout(w);// .fetch();
		console.log('ByIdworkout',workout,w);
		/*
		if(workout != undefined){
			throw new Exception();
			// workout = new Workout(workout);
			// cahce the workout
			
		}*/
		workoutCache[workoutId] = workout;
	}
	return workout;
	// ,{sort: {'workouts.$.date': -1}});
	// return Rowers.find({userId:userId},{sort: {'workouts.$.date': -1}}).fetch()
}


