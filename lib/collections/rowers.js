Rowers = new Mongo.Collection("rowers");


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
	return {name:name,workouts:workouts.get(),userId:Meteor.users.find().fetch()[0]._id};
}

Rowers.addSplit = function(split){
	var name = 'Savage' ;
	var rower = sortResults(Rowers.findOne({ userId:Meteor.users.find().fetch()[0]._id,name:name}));
	//console.log(rower)
	rower.workouts[0].splits.push({partial:123,calories:43,watts:200,time:3232,distance:1000,SPM:22});

	//console.log(rower,rower.workouts[0],rower.workouts[0].splits);
	// Rowers.update({_id:rower._id },{$set: {workouts:rower.workouts}});
	Rowers.update({_id:rower._id },
		{
			$set:{
				workouts:rower.workouts
			}
			// $set: {
			// 	'workouts.0.splits': rower.workouts[0].splits 
			// }
		});
	// ratings.0.rating
	// Rowers.update ( {_id: rower._id, workouts.splits: 0}, 
 //    	{$push: {'workouts.$.splits': {partial:123,calories:43,watts:200,time:3232,distance:1000,SPM:22} } })
	

// 	db.userlinks.update (
//     {_id: 1, 'tags.tag': 'foo'}, 
//     {$push: {'tags.$.links': {link: 'http://www.google.com', date: '123'} } }
// )
}


Rowers.addWorkout = function(workout){
	var name = 'Savage' ;
	var rower = sortResults(Rowers.findOne({ userId:Meteor.users.find().fetch()[0]._id,name:name}));

	rower.workouts[0].splits.push({partial:123,calories:43,watts:200,time:3232,distance:1000,SPM:22});
	// Rowers.update({_id:rower._id },{$set: {workouts:rower.workouts}});
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
	// ratings.0.rating
	// Rowers.update ( {_id: rower._id, workouts.splits: 0}, 
 //    	{$push: {'workouts.$.splits': {partial:123,calories:43,watts:200,time:3232,distance:1000,SPM:22} } })
	

// 	db.userlinks.update (
//     {_id: 1, 'tags.tag': 'foo'}, 
//     {$push: {'tags.$.links': {link: 'http://www.google.com', date: '123'} } }
// )
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
		// { "$addToSet": {rower.workouts} });
/*
	Rowers.update(
   { _id: 2 },
   { $addToSet: { workouts: { $each: workouts } } }
   { $addToSet: { workouts: { $each: [ "camera", "electronics", "accessories" ] } } }

   Rowers.update({"name": "Farmer John"},
					 {"$set": {"items.apples": 2}});
 )
*/
	// return 0;
	// return Rowers.find()

}
/*
Rowers.put = function(rower){
	return Rowers.insert()
}*/
var sortResults = function(rower){
		rower.workouts.sort(function(a, b) {
		    // a = new Date(a.dateModified);
		    // b = new Date(b.dateModified);
		    // console.log(rower[i].name)
		    return b.date-a.date;
		});
		rower.workouts.sort();

	return rower
}
Rowers.get = function(){
	var user = Meteor.users.find().fetch()[0]
	var userId = user!==undefined?user._id:undefined;
	console.log(userId);
	if(userId===undefined)return;
	var rower = Rowers.find({userId:userId}).fetch();
	if(rower !== undefined || rower[0] !== undefined){
		console.log(rower[0]);
		for (var i =0;i<rower.length;++i){		
			sortResults(rower[i])
			console.log(rower[i].name);
		}
	}
	return rower;
	// ,{sort: {'workouts.$.date': -1}});
	// return Rowers.find({userId:userId},{sort: {'workouts.$.date': -1}}).fetch()

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

Rowers.allow({
	update : function(userid, product){
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