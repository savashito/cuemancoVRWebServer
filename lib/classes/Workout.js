Workout = class Workout{
	constructor(obj){
		if(obj!=undefined){
			this.date = obj.date;
			this.totalTime = obj.tTime;
			this.totalDistance = obj.tDistance;
			this.averageSPM = obj.avgSPM;
			this.averagePartial = obj.avgPartial;
			this.averageWatts = obj.avgWatts;
			this.averageCalories = obj.avgCalories;
			this.splits = obj.splits;			
			this.name = obj.name;
			this._id = obj._id
			
		}
		
	}
	marshal(){
		return {
			date:			this.date,
			tTime:			this.totalTime,
			tDistance:		this.totalDistance,
			avgSPM:			this.averageSPM,
			avgPartial:		this.averagePartial,
			avgWatts:		this.averageWatts,
			avgCalories:	this.averageCalories,
			splits:			this.splits,			
			// name:			this.name,
			// _rowers:		this._rowers,
		};
	}

	start(){
		this.date = new Date();
		this.splits = [];
		console.log("Workout started");
		// save changes to db

		// WorkoutManager.activeWorkouts.updateWorkout(this);
		//this.save()
	}
	/*
	save(){
		Workouts.updateWorkout(this);
	}*/
	stop(){
		// must calc all averages base on splits
	}
	// setName(name){
	// 	this.name = name;
	// }


}