var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

var formatTimeUnits = function(time){
		if(time <10)
			return '0'+time
		return ''+time
	}

Template.rowerTemplate.helpers({
	formatDate:function(date){
		var day = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();
		return day + " "+monthNames[monthIndex] +" "+year
	},
	formatTime:function(time){
		time = Number(time)
		var hours = Math.floor(time/(60*60));
		time = time -hours*60*60;
		var minutes = Math.floor(time/(60));
		time = time-minutes*60;
		var seconds = Math.floor(time)//*100;
		// time = time - seconds;
		var miliSeconds = time - seconds;
		if(hours>0)
			return hours+":"+formatTimeUnits(minutes)+":"+formatTimeUnits(seconds);
		return minutes+":"+formatTimeUnits((seconds+miliSeconds).toFixed(1));
	},

})

// 01:42.5 60420.5 102.5