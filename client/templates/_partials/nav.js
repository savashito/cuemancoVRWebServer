Template.nav.helpers({
	vendors: function(){
		return [{name:"rod"},{name:'tot'}]
	}
});

Template.nav.helpers({
	active: function(name){
		return Router.current().route.getName()==name?'active':'';
	},
	isLogIn:function(){
		// Yes I ment only one =
		return Meteor.user()!=undefined;
	}
});

