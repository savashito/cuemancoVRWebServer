WorkoutManager = class WorkoutManager{
  	constructor() {
  		this._workouts = [];
	}
	add(workout){
		this._workouts.push(workout); // [this.getKey(workout)] = workout;
	}
	getKey(workout){
		return workout.date.replace('.','_') + workout.totalTime.replace('.','_');
	}
	get(){
		return this._workouts;
	}
}
WorkoutManager.joinWorkouts = function(w1,w2){

	return w1;
}

