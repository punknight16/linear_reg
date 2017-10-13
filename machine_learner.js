var assert = require('assert');

function least_square_error(points_arr, m, b){
	var S = 0;
	points_arr.map(function(point, point_index){
		var x = point.x;
		var y = point.y;
		S += y*y-2*m*x*y-2*b*y+(m*x)*(m*x)+2*b*m*x+b*b;
	});
	return S;	
}

function all_slopes_intercepts(points_arr){
	var loop_arr = JSON.parse(JSON.stringify(points_arr));
	var slopes_arr = [];
	var intercepts_arr = [];
	while(loop_arr.length>1){
		var first_point = loop_arr.pop();
		loop_arr.map(function(second_point, second_point_index){
			var y1 = first_point.y;
			var y2 = second_point.y;
			var x1 = first_point.x;
			var x2= second_point.x;
			var m = (y2-y1)/(x2-x1);
			var b = m*-1*x1+y1;
			slopes_arr.push(m);
			intercepts_arr.push(b);
		});
	};
	return {slopes_arr: slopes_arr, intercepts_arr: intercepts_arr};
}

describe('least_square_error', function(){
	b = -1;
	m = 1;
	points_arr = [
		{x: 2, y: 1},
		{x: 3, y: 3},
		{x: 5, y: 4},
	];
	it('should get the error function and return 1', function(done){
		var S = least_square_error(points_arr, m, b);
		assert(S==1);
		done();
	});
});

describe('all_slopes', function(){
	points_arr = [
		{x: 2, y: 1},
		{x: 3, y: 3},
		{x: 5, y: 4},
	];
	it('should return all slopes', function(done){
		var return_args = all_slopes_intercepts(points_arr);
		
		var max_slope = Math.max.apply(null, return_args.slopes_arr);
		var min_slope = Math.min.apply(null, return_args.slopes_arr);
		var max_intercept = Math.max.apply(null, return_args.intercepts_arr);
		var min_intercept = Math.min.apply(null, return_args.intercepts_arr);

		var error_arr = []; //2 dimension matrix
		for (var i = 10; i >= 0; i--) {
			
	
			error_arr[0] = {slope: min_slope, intercept: min_intercept, standard_error: least_square_error(points_arr, min_slope, min_intercept)};
			error_arr[1] = {slope: min_slope, intercept: max_intercept, standard_error: least_square_error(points_arr, min_slope, max_intercept)};
			error_arr[2] = {slope: max_slope, intercept: min_intercept, standard_error: least_square_error(points_arr, max_slope, min_intercept)};
			error_arr[3] = {slope: max_slope, intercept: max_intercept, standard_error: least_square_error(points_arr, max_slope, max_intercept)};
		
			console.log(error_arr);
			var test = error_arr.reduce(function(prev, curr) {
    		return prev.standard_error < curr.standard_error ? prev : curr;
			});
			console.log("least_square_error: ", test);			
			var mid_slope = (max_slope+min_slope)/2;
			var mid_intercept = (max_intercept+min_intercept)/2;
			if(test.slope==min_slope){
				//replace error_arr max_slope with mid_slope
				max_slope = mid_slope;
				if(test.intercept==min_intercept){
					//replace error_arr max_intercept with mid_intercept
					max_intercept = mid_intercept;
				} else {
					//replace error_arr min_intercept with mid_intercept
					min_intercept = mid_intercept;
				}
			} else {
				//replace error_arr min_slope with mid_slope
				min_slope = mid_slope
				if(test.intercept==min_intercept){
					//replace error_arr max_intercept with mid_intercept
					max_intercept = mid_intercept;
				} else {
					//replace error_arr min_intercept with mid_intercept
					min_intercept = mid_intercept
				}
			}
		}
		
		done();
	});
});