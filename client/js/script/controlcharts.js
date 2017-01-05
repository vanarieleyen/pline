
// returns the label to display on the chart
function label(soort) {
	switch(soort) {
		case 'matinmoist': 	return LABELS[612][$.jStorage.get("lang")];
		case 'matoutmoist': return LABELS[613][$.jStorage.get("lang")];
		case 'matouttemp': 	return LABELS[614][$.jStorage.get("lang")];
		case 'moisture': 		return LABELS[170][$.jStorage.get("lang")];
	}
}


function draw_controlchart() {
	var product = $('#evaluate [name=product] option:selected').val();
	var group = 	$('#control #group').val();									// regain1, regain2 etc..
	var choice =	$('#control #choice').val();								// inputmoist, outputmoist etc...
	var soort = 	$('#control #soort input:checked').val();		// controlchart soort
	var size =		$('#control #samplesize').val(); 
	var data = 		$.jStorage.get("pline_rawdata");

	// empty all charts
	$('#control #graph1').empty();
	$('#control #dist1').empty();	
	$('#control #graph2').empty();
	$('#control #dist2').empty();	
	
	if (data == null)	
		return;

	if (typeof product == 'undefined' || product==0)
		return;

	switch (soort) {
		case 'IMR':		imrChart(group, choice, data);
								break;
		case 'XBAR':	xbarChart(group, choice, size, data);
								break;
		case 'C':			//cChart('#control #graph', group, choice, product, data);
								break;
		case 'U':			//uChart('#control #graph', group, choice, product, data);
								break;
		case 'NP':		//npChart('#control #graph', group, choice, product, data);
								break;
		case 'P':			//pChart('#control #graph', group, choice, product, data);
								break;
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

// Table 2: Constants for Calculating Control Limits
// see: https://www.isixsigma.com/tools-templates/control-charts/a-guide-to-control-charts/
var control_constant = [ 
	{n:0}, 
	{n:1},
	{n:2,  d2:1.128, D3:null,  D4:3.268},
	{n:3,  d2:1.693, D3:null,  D4:2.574},
	{n:4,  d2:2.059, D3:null,  D4:2.282},
	{n:5,  d2:2.326, D3:null,  D4:2.114},
	{n:6,  d2:2.534, D3:null,  D4:2.004},
	{n:7,  d2:2.704, D3:0.076, D4:1.924},
	{n:8,  d2:2.847, D3:0.136, D4:1.864},
	{n:9,  d2:2.970, D3:0.184, D4:1.816},
	{n:10, d2:3.078, D3:0.223, D4:1.777},
	{n:11, d2:3.173, D3:0.256, D4:1.744},
	{n:12, d2:3.258, D3:0.283, D4:1.711},
	{n:13, d2:3.336, D3:0.307, D4:1.693},
	{n:14, d2:3.407, D3:0.328, D4:1.672},
	{n:15, d2:3.472, D3:0.347, D4:1.653}	
]

// background colors
function CC_background(type, CL, R) {
	var bg = [];
	var LCL, UCL, s;
	
	switch (type) {		// calculate control limits based on chart type
		case "X":
		case "I":		LCL = CL - (3* (R/control_constant[2].d2) );
								UCL = CL + (3* (R/control_constant[2].d2) );
								break;
		case "MR":	UCL = control_constant[2].D4 * R;
								LCL = -UCL;
								break;
	}
	
	s = specLimits(LCL, UCL);
	console.log(s);

	bg.push( { yaxis:{from:-100000, to:s.min35}, color:"#FFAD99" } );
	bg.push( { yaxis:{from:s.min35, to:s.min20}, color:"#FFD2AA"} );
	bg.push( { yaxis:{from:s.min20, to:s.max20}, color:"#AAFFAA"} );
	bg.push( { yaxis:{from:s.max20, to:s.max35}, color:"#FFD2AA"} );
	bg.push( { yaxis:{from:s.max35, to:100000 }, color:"#FFAD99"} );

	return bg;
}

// Xbar chart
function xbarChart(what, soort, size, data) {
	var fields = db[what][soort].field;
	var xChart = "#control #graph1";
	var rChart = "#control #graph2";
	var width = parseFloat($(xChart).innerWidth());
	var height = parseFloat($(xChart).innerHeight());
	var xResult = [], xRaw = [], rResult = [], rRaw = [];
	var tijd = [], ticks = 10; 
	
	var idx = 0;
	var xTotal = 0, rTotal = 0;
	var delta = 0;
	var tmp = [];
	var len, last = 0, calc = false;;
	for (var i = 0; i < data.count; i++) {
		fields.map(function (naam) {
			var value = data[i].row[naam];
			if (!isEmpty(value)) {
				if ($.isNumeric(value)) {
					value = parseFloat(value);
					len = tmp.push(value);
					switch (size) {
						case "MEAS":		// block of measurements
							if (last != naam) {
								last = naam;
								calc = true;
							}
							break;
						case "HOUR":		// each hour
							if (last != data[i].row[date]) {	// todo: hour filteren
								last = data[i].row[date];
								calc = true;
							}
							break;
						case "DAY":		// each day
							if (last != data[i].row[date]) {	// todo: day filteren
								last = data[i].row[date];
								calc = true;
							}
							break;
						case "2":		// every 2 measurements
							if (len > 2) {	
								calc = true;
							}
							break;
						case "5":		// every 5 measurements
							if (len > 5) {	
								calc = true;
							}
							break;
						case "10":		// every 10 measurements
							if (len > 10) {	
								calc = true;
							}
							break;
					}
					if (calc) {
						var val = jStat.mean(tmp);
						if (val > 0) {
							xResult.push(Array(idx, val, data[i].row['date'] ));
							xRaw.push(val);
							xTotal += val;
							if (rRaw.length == 0) 
								delta = val;
							delta = Math.abs(val-delta);
							rResult.push(Array(idx++, delta, data[i].row['date'] ));
							rRaw.push(delta);
							delta = val;
							rTotal += delta;
						}
						tmp = [];
						calc = false;
					}
				}
			}
		})
	}
	var xMean = jStat.mean(xRaw);
	var rMean = jStat.mean(rRaw);
	console.log(rMean);
	
	if (xResult.length > 2) {
		
		tijd = setTickLabels(xResult, ticks);

		// Individual chart 
		var dataset = { 
			data: xResult, 
			label: "x-Bar",
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
					apply:true
				}
			},
			trendline: { show: true },
			grid: {	markings: CC_background("X", xMean, rMean) },
			xaxis: {
				position: "bottom",
				ticks: tijd
			},
			yaxis: {
				position: "left",
				autoscaleMargin: 0
			}
		};
		
		canvas = $.plot($(xChart), [dataset], options);

		$(xChart).html('<img src=\"'+canvas.getCanvas().toDataURL('image/png')+'\"/>');
		$(xChart).children().css({"width":width+"px", "height":height+"px"});
		
		// Moving Range chart
		var dataset = { 
			data: rResult, 
			label: "Moving Range",
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
					apply:true
				}
			},
			trendline: { show: true },
			grid: {	markings: CC_background("MR", rMean, rMean) },
			xaxis: {
				position: "bottom",
				ticks: tijd
			},
			yaxis: {
				position: "left",
				autoscaleMargin: 0
			}
		};
		
		canvas = $.plot($(rChart), [dataset], options);

		$(rChart).html('<img src=\"'+canvas.getCanvas().toDataURL('image/png')+'\"/>');
		$(rChart).children().css({"width":width+"px", "height":height+"px"});

	} else {
		none(xChart);	// not enough data
		none(rChart);
	}
	miniDistChart('#control #dist1', xRaw);
	miniDistChart('#control #dist2', rRaw);
	
}


// I-MR
function imrChart(what, soort, data) {
	var fields = db[what][soort].field;
	var iChart = "#control #graph1";
	var rChart = "#control #graph2";
	var width = parseFloat($(iChart).innerWidth());
	var height = parseFloat($(iChart).innerHeight());
	var iResult = [], iRaw = [], rResult = [], rRaw = [];
	var tijd = [], ticks = 10; 

	var idx = 0;
	var iTotal = 0, rTotal = 0;
	var delta = 0;
	for (var i = 0; i < data.count; i++) {
		fields.map(function (naam) {
			var value = data[i].row[naam];
			if (!isEmpty(value)) {
				if ($.isNumeric(value)) {
					value = parseFloat(value);
					iResult.push(Array(idx, value, data[i].row['date'] ));
					iRaw.push(value);
					if (rRaw.length == 0) 
						delta = value;
					delta = Math.abs(value-delta);
					rResult.push(Array(idx++, delta, data[i].row['date'] ));
					rRaw.push(delta);
					delta = value;
					iTotal += value;
					rTotal += delta;
				}
			}
		})
	}
	var iMean = jStat.mean(iRaw);
	var rMean = jStat.mean(rRaw);
	console.log(rMean);
	
	if (iResult.length > 2) {
		
		tijd = setTickLabels(iResult, ticks);

		// Individual chart 
		var dataset = { 
			data: iResult, 
			label: "Individuals",
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
					apply:true
				}
			},
			trendline: { show: true },
			grid: {	markings: CC_background("I", iMean, rMean) },
			xaxis: {
				position: "bottom",
				ticks: tijd
			},
			yaxis: {
				position: "left",
				autoscaleMargin: 0
			}
		};
		
		canvas = $.plot($(iChart), [dataset], options);

		$(iChart).html('<img src=\"'+canvas.getCanvas().toDataURL('image/png')+'\"/>');
		$(iChart).children().css({"width":width+"px", "height":height+"px"});
		
		// Moving Range chart
		var dataset = { 
			data: rResult, 
			label: "Moving Range",
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
					apply:true
				}
			},
			trendline: { show: true },
			grid: {	markings: CC_background("MR", rMean, rMean) },
			xaxis: {
				position: "bottom",
				ticks: tijd
			},
			yaxis: {
				position: "left",
				autoscaleMargin: 0
			}
		};
		
		canvas = $.plot($(rChart), [dataset], options);

		$(rChart).html('<img src=\"'+canvas.getCanvas().toDataURL('image/png')+'\"/>');
		$(rChart).children().css({"width":width+"px", "height":height+"px"});

	} else {
		none(iChart);	// not enough data
		none(rChart);
	}
	miniDistChart('#control #dist1', iRaw);
	miniDistChart('#control #dist2', rRaw);
	
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

