ergCSC = undefined;

var rowers = [{name:'rofddro'},{name:'sergio'}];
var Rower = function(name,workouts){

}





Template.history.helpers({
	rower :  function(){
		return Rowers.get(); // find({});        
	},
	arrayify:function(obj){
	    var result = [];
	    for (var key in obj) result.push(obj[key]);
	    return result;
	}
});

/*
Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.dict = new ReactiveDict('myDict');
  this.dict.set("weather", "cloudy");
  // this.counter = new ReactiveVar(0);
});
*/
Template.history.onRendered(function helloOnCreated() {
	var reader = new FileReader();
	// rower
	reader.onload = function (e) {
        var res =e.target.result.replace(/\r/g, "\n")
        rowers = CVSErg2JSON(res);
        // console.log(rowers);
        for (var rowerIndex in rowers){
        	 var rower = rowers[rowerIndex]
        	 Rowers.saveErgWorkout(rower);
        	console.log(rower);
        }
    };
	
	var inputElement = $('#test');
	
	inputElement.on('change',prepareUpload);

	function prepareUpload(event)
	{
	  files = event.target.files;
	  var f = files[0];
	  reader.readAsBinaryString(f)
	}


Template.registerHelper('arrayify',function(obj){
    var result = [];
    for (var key in obj) result.push(obj[key]);
    return result;
});
	/*
	console.log(inputElement)
	inputElement.addEventListener("change", handleFiles, false);
	function handleFiles() {
	  var fileList = this.files; 
	  console.log(fileList);
	  for (var i = 0, numFiles = files.length; i < numFiles; i++) {
  		var file = files[i];	
  			console.log(file);
  		}
	}
*/
// var isAdvancedUpload = function() {
//   var div = document.createElement('div');
//   return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
// };



// var $form = $('.box');

// if (isAdvancedUpload) {
//   $form.addClass('has-advanced-upload');
// }

// 	if (isAdvancedUpload) {
// 	  var droppedFiles = false;
// 	  $form.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
// 	    e.preventDefault();
// 	    e.stopPropagation();
// 	  })
// 	  .on('dragover dragenter', function() {
// 	    $form.addClass('is-dragover');
// 	  })
// 	  .on('dragleave dragend drop', function() {
// 	    $form.removeClass('is-dragover');
// 	  })
// 	  .on('drop', function(e) {
// 	    droppedFiles = e.originalEvent.dataTransfer.files;
// 	  });
// 	}
});
