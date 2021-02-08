

var canvas ;
var context ;
var Val_max;
var Val_min;
var sections;
var xScale;
var yScale;
		// Values for the Data Plot, they can also be obtained from a external file
var loc1 =  [30, 5, 8, , 10, 12, 10, 9, 8, 9, 9, 18,30, 5, 8, , 10, 12, 10, 9, 8, 9, 9, 18];
var loc2 = [3, 5, 7, 8, 9, 10, 9, 9, 8, 2, 9, 23];
var loc3 =   [20, 22, 20, 25, 4, 5, 10, 28, 30, 4, 6, 8];

function makeGraph() {
		// set these values for your data 
	sections = 24;
	Val_max = 60;
	Val_min = -30;
	var stepSize = 10;
	var columnSize = 40;
	var rowSize = 50;
	var margin = 0;
	var xAxis = [" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] 
		//
		
	canvas = document.getElementById("canvas_G");
	context = canvas.getContext("2d");
	context.fillStyle = "#0099ff"
	context.font = "20 pt Verdana"
	
	yScale = (canvas.height - columnSize - margin) / (Val_max - Val_min);
	xScale = (canvas.width - rowSize) / sections;
	
	context.strokeStyle="#009933"; // color of grid lines
	context.beginPath();
		// print Parameters on X axis, and grid lines on the graph
	for (i=1;i<=sections;i++) {
		var x = i * xScale;
		context.fillText(xAxis[i], x,columnSize - margin);
		context.moveTo(x, columnSize);
		context.lineTo(x, canvas.height - margin);
	}
		// print row header and draw horizontal grid lines
	var count =  0;
	for (scale=Val_max;scale>=Val_min;scale = scale - stepSize) {
		var y = columnSize + (yScale * count * stepSize); 
		context.fillText(scale, margin,y + margin);
		context.moveTo(rowSize,y)
		context.lineTo(canvas.width,y)
		count++;
	}
	context.stroke();
	
	context.translate(rowSize,canvas.height + Val_min * yScale);
	context.scale(1,-1 * yScale);
	
		// Color of each dataplot items
		
	context.strokeStyle="#FF0066";
	plotData(loc1);
	context.strokeStyle="#9933FF";
	plotData(loc2);
	context.strokeStyle="#000";
	plotData(loc3);
}

function plotData(dataSet) {
	context.beginPath();
	context.moveTo(0, dataSet[0]);
	for (i=1;i<sections;i++) {
		context.lineTo(i * xScale, dataSet[i]);
	}
	context.stroke();
}
