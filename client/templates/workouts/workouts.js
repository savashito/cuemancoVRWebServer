Template.workouts.helpers({
	workouts:function(){
		return ActiveWorkouts.getAll();/*[
		{
			name:'elRayo',
			_rowers:[{name:'Ray'},{name:'rodro'}]
		}

		]*/
		// return activeWorkouts._workouts;
	}
});