
Router.configure({
	layoutTemplate: 'layout'
});

Router.route("/",{
	name: 'home'
});

Router.route("/addErg",{
	name : "addErg"
	});

Router.route("/history",{
	name : "history"
	});
Router.route("/workouts",{
	name : "workouts"
	});

Router.route("/google0dff94cd3d2da1ff.html",{
	name : "google0dff94cd3d2da1ff"
	});




/*

Router.route("/uploadlog",{ where: "server" })
.post(function(){
		console.log("Hiii");
		console.log(this.request);
	console.log(this.params.query);
	console.log(this.request.body)
	console.log(this.request.body.a)
	console.log(this.request.query)
	console.log(this.request.files)
	console.log("end->>>");
	this.next()
});
*/
// 	function(){
// 	console.log("Hiii");
// 	console.log(this.params.query);
// 	console.log(this.request.body)
// 	console.log(this.request.query)
// 	console.log("Hiii");
// 	this.next()
// });