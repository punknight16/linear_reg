function estimateHouseSalesPrice(points_arr, new_x){
	var line_obj = derivedLinearRegression(points_arr);
	var new_y = line_obj.lms_slope*new_x+line_obj.lms_intercept; 
	return new_y;
}

function linearRegression(points_arr){
	//get the avg x's
	var total_Xs = 0;
	var total_Ys = 0;
	for(var i = 0; i < points_arr.length; i++) {
    total_Xs += points_arr[i].x;
    total_Ys += points_arr[i].y;
	}
	var X_avg = total_Xs / points_arr.length;
	var Y_avg = total_Ys / points_arr.length;

	//get the numerator and deonominator of the linear regression formula
	var numerator = 0;
	var denominator = 0;
	for(var i = 0; i < points_arr.length; i++) {
		numerator += (points_arr[i].x-X_avg)*(points_arr[i].y-Y_avg);
		denominator += (points_arr[i].x-X_avg)*(points_arr[i].x-X_avg);
	}
	//divide numerator by denominator
	var lms_slope = numerator/denominator;
	var lms_intercept = Y_avg-lms_slope*X_avg;
	return {lms_slope: lms_slope, lms_intercept: lms_intercept}
}

function derivedLinearRegression(points_arr){
	//get n
	var n = points_arr.length;
	
	// get the summation of Xi * Yi
	var sum_xy = 0;
	for(var i = 0; i < points_arr.length; i++) {
		sum_xy += points_arr[i].x*points_arr[i].y;
	}

	// get the summation of Xi
	var sum_x = 0;
	for(var i = 0; i < points_arr.length; i++) {
		sum_x += points_arr[i].x;
	}

	// get the summation of Yi
	var sum_y = 0;
	for(var i = 0; i < points_arr.length; i++) {
		sum_y += points_arr[i].y;
	}

	//get the summation of Xi^2
	var sum_x_squared = 0;
	for(var i = 0; i < points_arr.length; i++) {
		sum_x_squared += points_arr[i].x * points_arr[i].x;
	}

	var lms_slope = (n*sum_xy-sum_x*sum_y)/(n*sum_x_squared-(sum_x*sum_x));

	//get the avg x's
	var total_Xs = 0;
	var total_Ys = 0;
	for(var i = 0; i < points_arr.length; i++) {
    total_Xs += points_arr[i].x;
    total_Ys += points_arr[i].y;
	}
	var X_avg = total_Xs / points_arr.length;
	var Y_avg = total_Ys / points_arr.length;

	var lms_intercept = Y_avg-lms_slope*X_avg;
	return {lms_slope: lms_slope, lms_intercept: lms_intercept}
}

//Tests
if(false){
var assert = require('assert');
/*
describe('estimateHouseSalesPrice', function(){	
	it('should return 178,000', function(done){
		var price = estimateHouseSalesPrice();
		console.log(price);
		assert(true)
		done();

	})
})
*/
describe('linearRegression', function(){
	/*var points_arr = [
		{x: 8, y: 3},
		{x: 2, y: 10},
		{x: 11, y: 3},
		{x: 6, y: 6},
		{x: 5, y: 8},
		{x: 4, y: 12},
		{x: 12, y: 1},
		{x: 9, y: 4},
		{x: 6, y: 9},
		{x: 1, y: 14}
	];
	it('should solve for the least mean square slope as about -1.1', function(done){
		var lin_reg = linearRegression(points_arr);
		assert(lin_reg.lms_slope==-1.1064189189189189);
		assert(lin_reg.lms_intercept==14.08108108108108);
		done();
	});*/
	var points_arr = [
		{x: 2000, y: 250000},
		{x: 850, y: 150000},
		{x: 550, y: 78000},
	];
	it('should solve for the least mean square slope as about -1.1', function(done){
		var price_estimate = estimateHouseSalesPrice(points_arr, 1200);
		console.log(price_estimate);
		//at 1800
		//assert(price_estimate==232543.38549075392);
		done();
	});

})
}