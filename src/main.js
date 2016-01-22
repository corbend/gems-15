"use strict";

var CanvasJS = require('../node_modules/canvasjs/dist/canvasjs.min');
var _ = require('lodash');

var init = function() {

	var baseOptions = {
		theme: "theme1",//theme1
		title:{
			text: "Basic Column Chart - CanvasJS"              
		},
		animationEnabled: false,
	}

	var generatePoints = function() {
		var arr = [];
		for (var i = 0; i < 100; i++) {
			arr.push({
				label: i,
				y: Math.round(100 + Math.random() * 100)
			})
		}
		return arr;
	}

	var features = {
		"simple": {
			container: "simpleChart",
			type: "Chart",
			options: _.extend({
				axisY: {
					includeZero: true
				},
				data: [
				{	
					type: 'line',
					yValueFormatString: "##.0#",
					dataPoints: generatePoints()
				}]
			}, baseOptions)
		}
	}

	Object.keys(features).forEach(function(feat) {
		console.log(feat, features[feat]);
		let chart = new CanvasJS[features[feat].type](features[feat].container, features[feat].options);
		chart.render();

		var resetButton = document.getElementById("simpleChartRenderButton");
		var zeroIncludeButton = document.getElementById("simpleChartIncludeZeroButton");
		console.log(resetButton);
		resetButton.addEventListener('click', function() {
			console.log("reset data");
			features[feat].options.data[0].dataPoints = generatePoints();
			chart.render();
		});
		zeroIncludeButton.addEventListener('change', function(event) {
			console.log("include zero", event.target, event.target.getAttribute("checked"), event.target.value);
			var toggled = event.target.getAttribute("checked") == "true"? false: true;
			event.target.setAttribute("checked", toggled);
			features[feat].options.axisY.includeZero = event.target.getAttribute("checked") == "true";
			chart.render();
		});
	})
}

window.onload = init;

module.exports = init;