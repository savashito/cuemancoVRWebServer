
Template.addErg.helpers({
	rowerErgId:function(){
		var id = Meteor.userId();
		rower = Rowers.findOne({userId:id});
		if(rower==undefined)return null;

		console.log(rower)
		return rower.ergIds;
	}

});
Template.addErg.events({

	'click #addErg':function(){
		Rowers.addErgId ($( "#textErgId" ).val());
		// console.log("Added ergId ",$( "#textErgId" ).val());
	}
});