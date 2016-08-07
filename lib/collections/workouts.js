/*
Workouts = new Mongo.Collection("workouts");

Workouts.updateWorkout = function(workout){
	if(workout._id!=undefined)
		Workouts.update({_id:workout._id},workout.marshal());
	else{
		var _id = Workouts.insert(workout.marshal());
		workout._id = _id;

	}
}
*/