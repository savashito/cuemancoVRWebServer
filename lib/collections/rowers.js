Rowers = new Mongo.Collection("rowers");


var _ergId2rowers = {};

/*
Rowers.byName = function(name){
	return Rowers.findOne({name:name});
}

Rowers.getCount = function(){
	return Rowers.find().count();
}

Rowers.tmpLogFind = function(){
	return [{name:'redrogo'},{name:'jojo'}];
}

Rowers.rowerFactory = function(name,workouts){
	var user = Meteor.user();
	return {name:name,workouts:workouts.get(),userId:user._id};
}*/

/*
Rowers.addSplit = function(split){
	var name = 'Savage' ;
	var userId = Meteor.userId(); // Meteor.users.find().fetch()[0]
	var rower = Rowers.findByName(userid,name);
	//console.log(rower)
	rower.workouts[0].splits.push({partial:123,calories:43,watts:200,time:3232,distance:1000,SPM:22});
	Rowers.update({_id:rower._id },
		{
			$set:{
				workouts:rower.workouts
			}
		});
}
*/
Rowers.updateLane = function(rower){
	var lane = rower.getLane();
	console.log(lane,rower.userId);
		Rowers.update({userId:rower.userId },
		{
			$set:{
				lane:lane
			}
		});
}
Rowers.findByName = function(userId,name){
	Rower.sortResults(Rowers.findOne({ userId:user._id,name:name}));
}

Rowers.addWorkout = function(workout){
	var name = 'Savage' ;
	var userId = Meteor.userId();
	var rower = Rowers.findByName(userid,name); // sortResults(Rowers.findOne({ userId:Meteor.users.find().fetch()[0]._id,name:name}));
	// rower.workouts[0].splits.push({partial:123,calories:43,watts:200,time:3232,distance:1000,SPM:22});
	workout = {
		date: new Date(),
		totalTime:1021,totalDistance:12,averageSPM:313,
		averagePartial:13,averageWatts:200,
		averageCalories:34,
		splits:[]
	}
	Rowers.update({_id:rower._id },
		{
			$push: {
				'workouts': workout 
			}
		});
}


Rowers.getByErgId = function(ergId){
	ergId=ergId+""
	var rower = _ergId2rowers[ergId];
	if(rower==undefined){
		// { tags: { $in: ["appliances", "school"] } },
		var rowerDB = Rowers.findOne({ergIds: { $in: [ergId]}});
		console.log(ergId,rowerDB)
		rower = Rower.getRower(rowerDB);// Rowers.getB(rowerRaw.userId);
		_ergId2rowers[ergId] = rower;
	}
	return rower;
}
Rowers.addErgId = function(ergId){
	// sstringify ergId
	ergId=ergId+""
	var user = Meteor.user();
	
	var docId = Rowers.findOne({ userId: user._id});
	console.log(docId)
	Rowers.update({ _id: docId._id},{ $push: { ergIds: ergId }});
	return ergId;
}

Rowers.saveErgWorkout = function(rowerJSON){

	var a = { $addToSet: { workouts: { $each: rowerJSON.workouts } } };// {"jojo": {workouts:rower.workouts}};
   
	var rower = Rowers.findOne({ userId: rowerJSON.userId,name:rowerJSON.name })
	if(rower!==undefined){
		console.log( "update",rowerJSON.userId,rowerJSON.name );
		// rower.forEach (function)
		var workouts = WorkoutManager.joinWorkouts(rowerJSON.workouts,rower.workouts);
		Rowers.update({_id:rower._id },{userId: rowerJSON.userId,name:rowerJSON.name,workouts:workouts });

	}else{
		console.log(rowerJSON);
		Rowers.insert( {userId: rowerJSON.userId,name:rowerJSON.name,workouts:rowerJSON.workouts });
	}
}
Rowers.fetchOrCreate = function(rowerJSON){
	var rowerDB = Rowers.findOne( {userId: rowerJSON.userId});
	if(rowerDB==undefined){
		rowerDB = Rowers.insert( {userId: rowerJSON.userId,name:rowerJSON.name,workouts:[]});
	}
	var rower = Rower.getRower(rowerDB); // new Rower(rowerDB);
	return rower;
}
/*
Rowers.create = function(rowerJSON){
	var rowerDB = Rowers.insert( {userId: rowerJSON.userId,name:rowerJSON.name,workouts:[]});
	var rower = Rower.getRower(rowerDB);
	return rower;
}*/

/*
var sortResults = function(rower){
		rower.workouts.sort(function(a, b) {
		    // a = new Date(a.dateModified);
		    // b = new Date(b.dateModified);
		    // console.log(rower[i].name)
		    return b.date-a.date;
		});
		rower.workouts.sort();

	return rower
}*/

/*
Rowers.get = function(userId){

	var user = this.userId; // Meteor.userId(); //Meteor.users.find().fetch()[0]
	console.log(user);
	// console.log(user.userId);
	return;
	userId = user!==undefined?user._id:userId;
	console.log(userId);
	return;
	if(userId==undefined)return;
	// is the user caches?
	var rower = rowersCache[userId];
	if(rower == undefined){
		rower = Rowers.find({userId:userId}).fetch();
		if(rower !== undefined || rower[0] !== undefined){
			console.log(rower[0]);
			for (var i =0;i<rower.length;++i){		
				sortResults(rower[i])
				console.log(rower[i].name);
			}
			extendRower(rower);
			// cahce the rower
			rowersCache[userId] = rower;
		}
	}
	return rower;
	// ,{sort: {'workouts.$.date': -1}});
	// return Rowers.find({userId:userId},{sort: {'workouts.$.date': -1}}).fetch()

}
*/
Rowers.getByUserId = function(userId){
	if(userId==undefined)return;
	var rowerDB = Rowers.findOne( {userId: userId});
	// console.log(rowerDB);
	var rower = Rower.getRower(rowerDB);
	return rower;
}

Rowers.unmarshal = function(rowers){
	for (var i = rowers.length - 1; i >= 0; i--) {
		rowers[i] = Rowers.getByUserId(rowers[i]);
	};
	return rowers;
}

if (Meteor.isServer) {

  Meteor.startup(function() {

	return Meteor.methods({

	  removeAllRowers: function() {

		return Rowers.remove({});

	  }

	});

  });

}

/*
var extendRower = function(rower){
	rower.setSocket=function(socket){
		rower.socket = socket;
	}
	rower.send = function(ergData){
		ergData.from = rower.userId;
		rower.socket.emit('ergData',ergData);
	}

};
*/

if (Meteor.isServer) {
	Accounts.onLogin(function(obj){
		var user = obj.user;
		var name = user.profile.name;
		var id = user._id;
		// console.log("Muahah",user,name,id);

	});
}

Rowers.allow({
	update : function(userId, product){
		// return isAdmin();
		return true;
	},
	insert : function(userid, product){
		return true;
		return isAdmin();
	},
	remove : function(userid, product){
		return true;
		return isAdmin();
	}
});