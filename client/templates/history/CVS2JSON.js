
CVSErg2JSON = function (CVS) {
	lines = CVS.split('\n');
	var offset = 7;
	var n = lines.length;
	var workouts = new WorkoutManager();//{};
	var rowerName = undefined;
	var listRowers = [];

	while(offset<n)
	{
		var obj = fetchWorkout(lines,offset);
		var workout = obj.workout;
		offset = obj.offset;
		workoutRowerName = obj.rowerName;

		// return;

		if(workoutRowerName===rowerName||rowerName===undefined){
			workouts.add(workout);// [workout.date] = workout;
			rowerName = workoutRowerName;
		}else{
			// console.log(workouts);
			// console.log(rowerName);
			// advance to the start position
			offset+=2;
			// ignore last workout
			var rower = Rowers.rowerFactory(rowerName,workouts);
			console.log(rower);
			listRowers.push(rower)
			// workouts = {};
			workouts = new WorkoutManager();
			rowerName = undefined;
			continue
			// update the new rower name
			// rowerName = workoutRowerName;
		}
		//console.log(workoutRowerName,offset);
		//console.log(workout);
	}

	var rower = Rowers.rowerFactory(rowerName,workouts);
	console.log(rower);
	listRowers.push(rower);
	return listRowers;
};

var parseDate = function(date){
	date = date.replace('/','-');
	return new Date(date);
}

var parseTime = function(time){
	// 31:59.8
	// 1:03:31
	var sTime = time.split(':');
	var totalTime = 0.0;
	if(sTime.length===3){
		totalTime = sTime[0]*60*60.0 + sTime[1]*60 + sTime[2]*1;

	}else if(sTime.length===2){
		pTime = sTime[1].split('.');
		totalTime = sTime[0]*60 + pTime[0]*1 + pTime[1]/10.0;
		console.log( "Original time ",time,totalTime)
	}
	return totalTime;
}

var fetchWorkout= function(lines,offset)
{
	// fetch a single workout
	var avgLine = lines[offset].split(',');
	var tTime = parseTime(avgLine[5]);
	var tDistance = avgLine[6];
	var avgSPM = avgLine[7];
	var avgPartial = parseTime(avgLine[13]);
	var avgCalories = avgLine[14];
	var avgWatts = avgLine[15];
	var date = parseDate(avgLine[2]);
	var rowerName = avgLine[1];


	var splits = [];
	var split;

	var n = lines.length;
	while(offset+1<n){
		offset+=1;
		avgLine = lines[offset].split(',');
		splitRowerName = avgLine[1];
		if(splitRowerName===rowerName){
			splitAvgPartial = parseTime(avgLine[13]);
			splitAvgCalories = avgLine[14];
			splitAvgWatts = avgLine[15];
			splitTime = parseTime(avgLine[9]);
			splitDistance = avgLine[10];
			splitSPM = avgLine[11];
			split = {partial:splitAvgPartial,calories:splitAvgCalories,watts:splitAvgWatts,time:splitTime,distance:splitDistance,SPM:splitSPM}
			// console.log("splitAvgPartial",splitAvgPartial,"splitSPM",splitSPM,splitDistance,splitTime,splitAvgWatts,splitAvgCalories)
			// console.log(split);
			splits.push(split);
		}else{

			// its a new entry
			break;
		}
	}
	var workout = {
		date: date,
		totalTime:tTime,totalDistance:tDistance,averageSPM:avgSPM,
		averagePartial:avgPartial,averageWatts:avgWatts,
		averageCalories:avgCalories,
		splits:splits
	};
	// console.log(workout);
	return {workout:workout,offset:offset+1,rowerName:rowerName};
}