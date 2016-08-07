ActiveWorkout = class ActiveWorkout{
	constructor(obj) {
		if(obj!=undefined){
			this._id = obj._id
			this.name = obj.name;
			this._rowers = obj._rowers!=undefined?obj._rowers:[];
			console.log('ActiveWorkout.constructor',obj._rower,this._rowers)
		}
	}
	marshal(){
		return {
			name:this.name,
			_rowers:this._rowers
		};
	}
	start(){
		console.log("ActiveWorkout started");
		var rowers = Rowers.unmarshal(this._rowers);
		for (var i =0;i<rowers.length;++i){
			var rowerInWorkout = rowers[i];
			rowerInWorkout.startWorkout();
		}
	}
	stop(){
		console.log("ActiveWorkout Stopped");
		for (var i =0;i<this._rowers.length;++i){
			var rowerInWorkout = this._rowers[i];
			rowerInWorkout.stopWorkout();
		}
	}
	addRower(rower){
		this._rowers.push(rower.userId);
	}
	broadcastToPeers(rower,ergData){
		var rowers = Rowers.unmarshal(this._rowers);
		ergData.userId = rower.userId;
		ergData.lane = rower.getLane();
		for (var i =0;i<rowers.length;++i){
			var peerRower = rowers[i];
			peerRower.send(ergData);
			/*
			if(peerRower.userId!=rower.userId){
				// console.log(peerRower,rower);	
				rower.send(ergData);
			}*/
			
			// rower.send(ergData);
		}
	}


}
	/*
  	constructor() {
  		this._workouts = [];
  		this._rowers = {};
	}
	add(workout){
		this._workouts.push(workout); // [this.getKey(workout)] = workout;
	}*/
	/*
	getKey(workout){
		return workout.date.replace('.','_') + workout.totalTime.replace('.','_');
	}*/
	/*
	addRower(workoutId,rower){
		var workout = this._workouts[workoutId];
		if(workout==undefined){
			workout = new Workout();
			this._rowers[rower.userId] = workout;
			workoutId = this._workouts.length;
			this._workouts[workoutId] = workout;
		}
		workout.addRower(rower);
		return {workout:workout,workoutId:workoutId};
	}
	// creates or gets workout rower is in.
	getByRower(rower){
		var workout = this._rowers[rower.userId];
		if(workout==undefined){
			workout = new Workout();
			this._rowers[rower.userId] = workout;
		}
		return workout;
	}*/
	/*
	get(){
		return this._workouts;
	}*/
// }
/*
WorkoutManager.joinWorkouts = function(w1,w2){
	return w1;
}*/

// WorkoutManager.activeWorkouts = new WorkoutManager()
