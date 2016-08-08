var rowersCache = {};

var logger = require('tracer').colorConsole();
Rower = class Rower{
	constructor(rowerJSON){

		if(rowerJSON!=undefined){// } || rowerJSON[0] != undefined){
			Rower.sortResults(rowerJSON);
			this.userId = rowerJSON.userId;
			this.workouts = rowerJSON.workouts;
			this.name = rowerJSON.name;
			this.lane = rowerJSON.lane;
			/*
			for (var i =0;i<rowerDB.length;++i){		
				Rower.sortResults(rowerDB[i])
				// console.log(rowerDB[i].name);
			}*/
			// extendRower(rowerDB);
		}
	}
	setSocket(socket){
		this.socket = socket;
	}
	addSplit(split){
		// console.log(this.name,"Error, the workout has not started");
		this.workouts[0].splits.push(split);
		this.saveActiveWorkout();
		// this.workouts[0].save();
		// var workout = this.getActiveWorkout();

/*
		Rowers.update({userId:this.userId },
			{
			$set:{
				workouts:this.workouts
			}
		});
*/
	}
	getLane(){
		return this.lane;
	}
	setLane(lane){
		this.lane = lane;
		console.log("Lane updated");
		Rowers.updateLane(this);
	}
	saveActiveWorkout(){
		if(this._id==undefined){
			var r = Rowers.findOne({userId:this.userId});
			this._id = r._id; 
		}
		
		Rowers.update({_id:this._id },{$set:{workouts:this.workouts }});
	}
	startWorkout(){
		console.log(this.name, "Started Workout");
		this.workouts[0] = new Workout();
		this.workouts[0].start();
		this.saveActiveWorkout();
	}
	stopWorkout(){

	}
	isInWorkout(){
		var w = ActiveWorkouts.getWorkoutByRowerId(this.userId);
		// console.log('isInWorkout',w);
		return undefined!=w;
	}
	getActiveWorkout(){
		return ActiveWorkouts.getWorkoutByRowerId(this.userId);
	}
	send(ergData){
		ergData.from = this.userId;
		if(this.socket == undefined){
			logger.error(" Error, ",this.name,"socket is not defined");
		}else{
			this.socket.emit('ergData',ergData);

		}
	}
	marshal(){
		return {
			userId : this.userId,
			workouts : this.workouts,
			name : this.name
			// lane : this.getLane()
		}
	}


}
Rower.sortResults = function(rower){
	if(rower.workouts!=undefined){
		rower.workouts.sort(function(a, b) {
		    // a = new Date(a.dateModified);
		    // b = new Date(b.dateModified);
		    // console.log(rower[i].name)
		    return b.date-a.date;
		});
		rower.workouts.sort();
	}
	return rower;
}

Rower.getRower = function(rowerJSON){
	if(rowerJSON==undefined)return undefined;
	if(rowersCache[rowerJSON.userId] == undefined){
		rowersCache[rowerJSON.userId] = new Rower(rowerJSON);
	}
	return rowersCache[rowerJSON.userId]
}
