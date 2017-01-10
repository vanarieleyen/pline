   
// draws the charts in chart.php
function draw_chart(keus) {
	var product = $('#evaluate [name=product] option:selected').val();
	var group = 	$('#charts #group'+keus).val();									// regain1, regain2 etc..
	var choice =	$('#charts #choice'+keus).val();								// inputmoist, outputmoist etc...
	var type = 		$('#charts #type'+keus+' input:checked').val();		// raw, avg, cpk etc...
	var data = 		$.jStorage.get("pline_rawdata");

	$('#charts #graph'+keus).empty();
	if (keus=="1") $('#charts #dist1').empty();	// empty mini distribution chart

	if (data == null)	
		return;

	if (typeof product == 'undefined' || product==0)
		return;
		
	switch (type) {
		case 'Raw':				rawChart('#charts #graph'+keus, group, choice, product, data);
								break;
		case 'Average':		averageChart('#charts #graph'+keus, group, choice, product, data);
								break;
		case 'Deviation':	deviationChart('#charts #graph'+keus, group, choice, product, data);
								break;
		case 'Variance':	variationChart('#charts #graph'+keus, group, choice, product, data);
								break;
		case 'Cpk':				cpkChart('#charts #graph'+keus, group, choice, product, data);
								break;
		case 'Dist':			if (keus=="1") $('#charts #dist1').empty();	// empty mini distribution chart
											distributionChart('#charts #graph'+keus, group, choice, product, data);
								break;
	}
	
	// local functions
	
	// returns the label to display on the chart
	function label(soort) {
		switch(soort) {
			case 'matinmoist': 	return LABELS[612][$.jStorage.get("lang")];
			case 'matoutmoist': return LABELS[613][$.jStorage.get("lang")];
			case 'matouttemp': 	return LABELS[614][$.jStorage.get("lang")];
			case 'moisture': 		return LABELS[170][$.jStorage.get("lang")];
		}
	}
	
	
	// show 'none' (for products that have no defects)
	function none(chart) {
		var msg = LABELS[321][$.jStorage.get("lang")];
		var height = $(chart).css("height");
		var width = $(chart).css("width");
		var t = $.plot($(chart), [], {grid: {borderWidth: {top: 0, right: 0, bottom: 0, left: 0}}});
		var ctx = t.getCanvas().getContext("2d");	
		ctx.font = 'italic 40px Calibri';
		ctx.fillStyle = "#FF0000";
		var w = ctx.measureText(msg).width;
		ctx.fillText(msg, ($(chart).width()-w)/2, ($(chart).height()-40)/2);
		$(chart).html('<img src=\"'+t.getCanvas().toDataURL('image/png')+'\"/>');
		return true;
	}
	
	// tick array with time labels
	function setTickLabels(result, ticks) {
		var labels = [];
		var split = Math.ceil(result.length / ticks);
		$.each(result, function(idx, value) {
			if (split != 0)
				if ((idx % split) == 0)
					if (typeof value[2] !== 'undefined')
						labels.push(Array(idx, value[2].substr(0, 10) ) );
		});
		return labels;
	}
	
	// background colors
	function background(result, what, soort, product) {
		var bg = [];
		var low, high, s, spec, oldcrc=0;
		var len = result.length;
		
		$.each(result, function(idx, value) {
			spec = getSpec(product, value[2]);		// get the specs of certain date
			low = parseFloat(spec[db[what][soort].spec.min]);
			high = parseFloat(spec[db[what][soort].spec.max]);
			s = specLimits(low, high);
	
			if (crc(JSON.stringify(spec)) != oldcrc) {
				oldcrc = crc(JSON.stringify(spec));
				bg.push( { xaxis:{from:idx, to:len}, yaxis:{from:-100000, to:s.min35}, color:"#FFAD99" } );
				bg.push( { xaxis:{from:idx, to:len}, yaxis:{from:s.min35, to:s.min20}, color:"#FFD2AA"} );
				bg.push( { xaxis:{from:idx, to:len}, yaxis:{from:s.min20, to:s.max20}, color:"#AAFFAA"} );
				bg.push( { xaxis:{from:idx, to:len}, yaxis:{from:s.max20, to:s.max35}, color:"#FFD2AA"} );
				bg.push( { xaxis:{from:idx, to:len}, yaxis:{from:s.max35, to:100000 }, color:"#FFAD99"} );
			}
		});
		return bg;
	}
	
	
	// cpk chart
	function cpkChart(chart, what, soort, product, data) {
		var specs = db[what][soort].spec;
		var fields = db[what][soort].field;
		var width = Math.round(parseFloat($(chart).innerWidth()));
		var height = Math.round(parseFloat($(chart).innerHeight()));
		var result = [], tijd = [], raw = [];
		var length, ticks = 10; 
	
		var tmp = [];
		var sample_size = Math.round(Math.min(data.count, width) / 50);
		var idx = 0;
		for (var i = 0; i < data.count; i++) {
			fields.map(function (naam) {
				var value = data[i].row[naam];
				if (!isEmpty(value)) {
					if ($.isNumeric(value)) {
						length = tmp.push(parseFloat(value));
						if (length > sample_size) {
							var spec = getSpec(product, data[i].row['date']);		// get the specs of current data
							var low = parseFloat(spec[db[what][soort].spec.min]);
							var high = parseFloat(spec[db[what][soort].spec.max]);
							var val = cpk(low, high, tmp);
							if (val != '--' && val > 0) {
								result.push(Array(idx++, val, data[i].row['date'] ));
								raw.push(val);
								tmp = [];
							}
						}
					}
				}
			})
		}
	
		if (result.length > 5) {
	
			tijd = setTickLabels(result, ticks);
			
			var dataset = { 
				data: result, 
				label: label(soort),
				color: 'blue', 
				lines: {show:true},
			};
			
			var options = {
				canvas: true,
				space: 70,		// reserved space for the date labels on the bottom
				series: {
					downsample: { threshold: width }
				},
				trendline: { show: true },
				grid: {	
					markings: [
						{ yaxis: {from:-100000,	to:0.5},		color:"#FFAD99" },
						{ yaxis: {from:0.5,			to:0.7}, 		color:"#FFD2AA"},
						{ yaxis: {from:0.7,			to:100000 },color:"#AAFFAA"}
					]
				},
				xaxis: {
					position: "bottom",
					ticks: tijd
				},
				yaxis: {
					position: "left",
					autoscaleMargin: 0
				}
			};
			
			canvas = $.plot($(chart), [dataset], options);
	
			$(chart).html('<img src=\"'+canvas.getCanvas().toDataURL('image/png')+'\"/>');
			$(chart).children().css({"width":width+"px", "height":height+"px"});
		} else {
			none(chart);	// not enough data
		}
		if (chart == "#charts #graph1")		// the minichart is only drawn for the upper charts
			miniDistChart('#charts #dist1', raw);
	}
	
	// variance chart
	function variationChart(chart, what, soort, product, data) {
		var specs = db[what][soort].spec;
		var fields = db[what][soort].field;
		var width = Math.round(parseFloat($(chart).innerWidth()));
		var height = Math.round(parseFloat($(chart).innerHeight()));
		var result = [], tijd = [], raw = [];
		var length, ticks = 10; 
	
		var tmp = [];
		var sample_size = Math.round(Math.min(data.count, width) / 50);
		var idx = 0;
		for (var i = 0; i < data.count; i++) {
			fields.map(function (naam) {
				var value = data[i].row[naam];
				if (!isEmpty(value)) {
					if ($.isNumeric(value)) {
						length = tmp.push(parseFloat(value));
						if (length > sample_size) {
							var val = jStat.coeffvar(tmp);
							if (val > 0) {
								result.push(Array(idx++, val, data[i].row['date'] ));
								raw.push(val);
								tmp = [];
							}
						}
					}
				}
			})
		}
		
		if (result.length > 5) {
			
			tijd = setTickLabels(result, ticks);
	
			var dataset = { 
				data: result, 
				label: label(soort),
				color: 'blue', 
				lines: {show:true},
			};
			
			var options = {
				canvas: true,
				space: 70,		// reserved space for the date labels on the bottom
				series: {
					downsample: { threshold: width },
					curvedLines: {	
						active: true, 
						apply:true
					}
				},
				trendline: { show: true },
				grid: {	
					markings: [
						{ yaxis: {from:-100000,	to:0.02},		color:"#AAFFAA" },
						{ yaxis: {from:0.02,		to:0.025}, 	color:"#FFD2AA"},
						{ yaxis: {from:0.025,		to:100000 },color:"#FFAD99"}
					]
				},
				xaxis: {
					position: "bottom",
					ticks: tijd
				},
				yaxis: {
					position: "left",
					autoscaleMargin: 0
				}
			};
			
			canvas = $.plot($(chart), [dataset], options);
	
			$(chart).html('<img src=\"'+canvas.getCanvas().toDataURL('image/png')+'\"/>');
			$(chart).children().css({"width":width+"px", "height":height+"px"});
		} else {
			none(chart);	// not enough data
		}
		if (chart == "#charts #graph1")		// the minichart is only drawn for the upper charts
			miniDistChart('#charts #dist1', raw);
	}
	
	// std. deviation chart
	function deviationChart(chart, what, soort, product, data) {
		var specs = db[what][soort].spec;
		var fields = db[what][soort].field;
		var width = Math.round(parseFloat($(chart).innerWidth()));
		var height = Math.round(parseFloat($(chart).innerHeight()));
		var result = [], tijd = [], raw = [];
		var length, ticks = 10; 
	
		var tmp = [];
		var sample_size = Math.round(Math.min(data.count, width) / 50);
		var idx = 0;
		for (var i = 0; i < data.count; i++) {
			fields.map(function (naam) {
				var value = data[i].row[naam];
				if (!isEmpty(value)) {
					if ($.isNumeric(value)) {
						length = tmp.push(parseFloat(value));
						if (length > sample_size) {
							var val = jStat.stdev(tmp);
							if (val > 0) {
								result.push(Array(idx++, val, data[i].row['date'] ));
								raw.push(val);
								tmp = [];
							}
						}
					}
				}
			})
		}
		
		if (result.length > 5) {
			
			tijd = setTickLabels(result, ticks);
			
			var dataset = { 
				data: result, 
				label: label(soort),
				color: 'blue', 
				lines: {show:true},
			};
			
			var options = {
				canvas: true,
				space: 70,		// reserved space for the date labels on the bottom
				series: {
					downsample: { threshold: width },
					curvedLines: {	
						active: true, 
						apply:true
					}
				},
				trendline: { show: true },
				grid: {	
					markings: [
						{ yaxis: {from:-100000,	to:0.4},		color:"#AAFFAA" },
						{ yaxis: {from:0.4,			to:0.5}, 		color:"#FFD2AA"},
						{ yaxis: {from:0.5,			to:100000 },color:"#FFAD99"}
					]
				},
				xaxis: {
					position: "bottom",
					ticks: tijd
				},
				yaxis: {
					position: "left",
					autoscaleMargin: 0
				}
			};
			
			canvas = $.plot($(chart), [dataset], options);
	
			$(chart).html('<img src=\"'+canvas.getCanvas().toDataURL('image/png')+'\"/>');
			$(chart).children().css({"width":width+"px", "height":height+"px"});
		} else {
			none(chart);	// not enough data
		}
		if (chart == "#charts #graph1")		// the minichart is only drawn for the upper charts
			miniDistChart('#charts #dist1', raw);
	}
	
	// average chart
	function averageChart(chart, what, soort, product, data) {
		var specs = db[what][soort].spec;
		var fields = db[what][soort].field;
		var width = Math.round(parseFloat($(chart).innerWidth()));
		var height = Math.round(parseFloat($(chart).innerHeight()));
		var result = [], tijd = [], raw = [];
		var length, ticks = 10; 
	
		var tmp = [];
		var sample_size = Math.round(Math.min(data.count, width) / 50);
		var idx = 0;
		for (var i = 0; i < data.count; i++) {
			fields.map(function (naam) {
				var value = data[i].row[naam];
				if (!isEmpty(value)) {
					if ($.isNumeric(value)) {
						length = tmp.push(parseFloat(value));
						if (length > sample_size) {
							var val = jStat.mean(tmp);
							if (val > 0) {
								result.push(Array(idx++, val, data[i].row['date'] ));
								raw.push(val);
								tmp = [];
							}
						}
					}
				}
			})
		}
		
		if (result.length > 5) {
			
			tijd = setTickLabels(result, ticks);
	
			var dataset = { 
				data: result, 
				label: label(soort),
				color: 'blue', 
				lines: {show:true},
			};
			
			var options = {
				canvas: true,
				space: 70,		// reserved space for the date labels on the bottom
				series: {
					downsample: { threshold: width },
					curvedLines: {	
						active: true, 
						apply:true
					}
				},
				trendline: { show: true },
				grid: {	markings: background(result, what, soort, product) },
				xaxis: {
					position: "bottom",
					ticks: tijd
				},
				yaxis: {
					position: "left",
					autoscaleMargin: 0
				}
			};
			
			canvas = $.plot($(chart), [dataset], options);
	
			$(chart).html('<img src=\"'+canvas.getCanvas().toDataURL('image/png')+'\"/>');
			$(chart).children().css({"width":width+"px", "height":height+"px"});
		} else {
			none(chart);	// not enough data
		}
		if (chart == "#charts #graph1")		// the minichart is only drawn for the upper charts
			miniDistChart('#charts #dist1', raw);
	}
	
	// make a chart of the raw data
	function rawChart(chart, what, soort, product, data) {
		var specs = db[what][soort].spec;
		var fields = db[what][soort].field;
		var width = Math.round(parseFloat($(chart).innerWidth()));
		var height = Math.round(parseFloat($(chart).innerHeight()));
		var result = [], tijd = [], ticks = 10;
		var raw = [];
	
		var idx = 0;
		for (var i = 0; i < data.count; i++) {
			fields.map(function (naam) {
				var val = data[i].row[naam];
				if (val.trim() != "") {
					result.push(Array(idx++, parseFloat(val), data[i].row['date'] ));
					raw.push(val);
				}
			})
		}

		if (result.length > 5) {
	
			tijd = setTickLabels(result, ticks);

			var dataset = { 
				data: result, 
				label: label(soort),
				color: 'blue', 
				lines: {show:true},
			};
			
			var options = {
				canvas: true,
				space: 70,		// reserved space for the date labels on the bottom
				series: {
					downsample: { threshold: width },
					curvedLines: {	
						active: false, 
						apply:false
					}
				},
				trendline: { show: true },
				grid: {	markings: background(result, what, soort, product) },
				xaxis: {
					position: "bottom",
					ticks: tijd
				},
				yaxis: {
					position: "left",
					autoscaleMargin: 0
				}
			};
			//		console.log(dataset);
			canvas = $.plot($(chart), [dataset], options);

			$(chart).html('<img src=\"'+canvas.getCanvas().toDataURL('image/png')+'\"/>');
			$(chart).children().css({"width":width+"px", "height":height+"px"});
		} else {
			none(chart);	// not enough data
		}
		if (chart == "#charts #graph1")		// the minichart is only drawn for the upper charts
			miniDistChart('#charts #dist1', raw);
	}
	
	
	// large distribution chart
	function distributionChart(chart, what, soort, product, data) {
		var specs = db[what][soort].spec;
		var fields = db[what][soort].field;
		var width = Math.round(parseFloat($(chart).innerWidth()));
		var height = Math.round(parseFloat($(chart).innerHeight()));
		var end = data[data.count-1].row['date'];
		var spec = getSpec(product, end);		// get the specs for the last date
		var low = parseFloat(spec[db[what][soort].spec.min]);
		var high = parseFloat(spec[db[what][soort].spec.max]);
		var scale = width/(high-low);		// hoeveel de waarden moeten worden aangepast om in de sample-ruimte te passen
		var spec = specLimits(low, high);
		var min35 = Math.round(spec.min35*scale);
		var min20 = Math.round(spec.min20*scale);
		var norm  = Math.round(spec.norm*scale);
		var max20 = Math.round(spec.max20*scale);
		var max35 = Math.round(spec.max35*scale);
		var ll = low-(low/(100/2));		// the limits for values that are too much out of bounds
		var ul = high+(high/(100/2));
		var distribution = {};		// the individual bars
	
		if (data.count > 3) {
			// create the distribution
			for (var i = 0; i < data.count; i++) {
				fields.map(function (naam) {
					var value = parseFloat(data[i].row[naam]);
					var index = (typeof value !== 'undefined') ? ($.isNumeric(value) ? Math.round(value*scale) : 0) : 0;
					if (typeof distribution[index] !== 'undefined')
						distribution[index]++;
					else
						distribution[index] = 0;
				})
			}
	
			// sort the distribution on key
			Object.keys(distribution).sort().forEach(function(key) {	
				var value = distribution[key];
				delete distribution[key];
				distribution[key] = value;
			});
	
			// calculate the optimal bar width and populate the dataset  
			var result = [];
			var old = 0.0;
			var smallest=1000000.0;		// smallest space between 2 bars
			$.each(distribution, function(key, value) {
				if (key > 0) {
					result.push(Array(key, value));
					smallest = Math.min(smallest, key-old);
					old = key;
				}
			});
			barwidth = 1/(1/smallest);
	
			var dataset = { 
				data: result, 
				color: 'grey', 
				bars: {show:true, lineWidth: 1} 
			};
		
			var options = {
				canvas: true,
				space: 50,		// reserved space for the ticks on the bottom
				series: {
					downsample: { threshold: width }
				},
				grid: {
					markings: [
						{ xaxis: { from:-100000,to:min35 },	color: '#FFAD99' },
						{ xaxis: { from:min35,	to:min20 },	color: '#FFD2AA' },
						{ xaxis: { from:min20,	to:max20 },	color: '#AAFFAA' },
						{ xaxis: { from:max20,	to:max35 },	color: '#FFD2AA' },
						{ xaxis: { from:max35,	to:100000 },color: '#FFAD99' }
					]
				},
				bars: {	barWidth: barwidth },
				xaxis: {
					position: "bottom",
					axisLabelPadding: 10,
					ticks: 10,
					tickDecimals: 1,
					tickFormatter: function (val, axis) {return (val/scale).toFixed(axis.tickDecimals)},
					min: ll*scale,
					max: ul*scale
				},
				yaxis: {
					position: "left",
					axisLabelPadding: 3
				}
			};
		
			canvas = $.plot($(chart), [dataset], options);
	
			$(chart).html('<img src=\"'+canvas.getCanvas().toDataURL('image/png')+'\"/>');
			$(chart).children().css({"width":width+"px", "height":height+"px"});
		} else {
			none(chart);	// not enough data
		}		
	}
	
	
	// mini distribution chart
	// uses the raw data from other charts 
	function miniDistChart(chart, rawdata) {
		var width = $(chart).innerWidth();
		var height = $(chart).innerHeight();
		var lower = Array.min(rawdata); 							// find the lowest and highest value
		var upper = Array.max(rawdata); 
		var scale = height/(upper-lower);
		var canvas, index;
	
		var distribution = {};		// the individual bars
		$.each(rawdata, function (key, value) {
			index = (typeof value !== 'undefined') ? ($.isNumeric(value) ? Math.round(value*scale) : 0) : 0;
			if (typeof distribution[index] !== 'undefined')
				distribution[index]++;
			else
				distribution[index] = 0;
		});
	
		Object.keys(distribution).sort().forEach(function(key) {	// sort the distribution (on keys)
			var value = distribution[key];
			delete distribution[key];
			distribution[key] = value;
		});
	
		var result = [];			// calculate the barwidth and set the data
		var old = 0.0;
		var smallest=1000000.0;
		$.each(distribution, function(key, value) {
			if (key > 0) {
				result.push(Array(value, key));
				smallest = Math.min(smallest, key-old);
				old = key;
			}
		});
		barwidth = 1/(1/smallest);
	
		var dataset = { 
				data: result, 
				color: 'grey', 
				lines: {show:false}, 
				bars: {show:true, lineWidth: 1, horizontal: true} 
			};
	
		var options = {
					canvas: true,
					series: {
						downsample: { threshold: height }
					},
					bars: {	barWidth: barwidth },
					xaxis: { show: false },
					yaxis: {
						autoscaleMargin: 0,
						show: false
					},
					grid: false
				};
	
		canvas = $.plot($(chart), [dataset], options);
		
		$(chart).html('<img src=\"'+canvas.getCanvas().toDataURL('image/png')+'\"/>');
		$(chart).children().css({"width":width+"px", 
														"height":height+"px",
														"-webkit-transform":"translate(0px, 6px)"
														});
	}

}	
