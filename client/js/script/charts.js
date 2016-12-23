
var what, start, end, product, machine, station, ofwhat, filter, rawdata;

// used to fill in default arguments in draw_chart()
function extend() {
	for (var i = 1; i < arguments.length; i++)
		for (var key in arguments[i])
			if (arguments[i].hasOwnProperty(key))
				arguments[0][key] = arguments[i][key];
	return arguments[0];
}
    
// draws the charts in chart.php
function draw_chart(arg) {
	var defaults = {	
    start: 	$('#evaluate [name=start]').val(),	// begin tijdsperiode
		end: 		$('#evaluate [name=end]').val(),
		product: $('#evaluate [name=product] option:selected').val(),
		group1: 	$('#charts #group1').val(),											// regain1, regain2 etc..
		choice1:	$('#charts #choice1').val(),											// inputmoist, outputmoist etc...
		type1: 	$('#charts #type1 input:checked').val(),					// raw, avg, cpk etc...
		group2: 	$('#charts #group2').val(),		
		choice2:	$('#charts #choice2').val(),					
		type2: 	$('#charts #type2 input:checked').val(),		
	};
	var arg = extend(defaults, arg); // fill with defaults when no arguments are passed

	if (arg.product == '---')	arg.product = null;
	switch (arg.type1) {
		case 'Raw':			rawChart('#charts #graph1', arg.group1, arg.choice1, arg.start, arg.end, arg.product);
								break;
		case 'Average':	averageChart('#charts #graph1', arg.group1, arg.choice1, arg.start, arg.end, arg.product);
								break;
		case 'Deviation':	deviationChart('#charts #graph1', arg.group1, arg.choice1, arg.start, arg.end, arg.product);
								break;
		case 'Variance':	variationChart('#charts #graph1', arg.group1, arg.choice1, arg.start, arg.end, arg.product);
								break;
		case 'Cpk':	cpcpkChart('#charts #graph1', arg.group1, arg.choice1, arg.start, arg.end, arg.product);
								break;
		case 'Dist':	distributionChart('#charts #graph1', arg.group1, arg.choice1, arg.start, arg.end, arg.product);
								break;
	}
	miniDistChart('#charts #dist1', arg.group1, arg.choice1, arg.product, arg.end);

	switch (arg.type2) {
		case 'Raw':			rawChart('#charts #graph2', arg.group2, arg.choice2, arg.start, arg.end, arg.product);
								break;
		case 'Average':	averageChart('#charts #graph2', arg.group2, arg.choice2, arg.start, arg.end, arg.product);
								break;
		case 'Deviation':	deviationChart('#charts #graph2', arg.group2, arg.choice2, arg.start, arg.end, arg.product);
								break;
		case 'Variance':	variationChart('#charts #graph2', arg.group2, arg.choice2, arg.start, arg.end, arg.product);
								break;
		case 'Cpk':		cpcpkChart('#charts #graph2', arg.group2, arg.choice2, arg.start, arg.end, arg.product);
								break;
		case 'Dist':	distributionChart('#charts #graph2', arg.group2, arg.choice2, arg.start, arg.end, arg.product);
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

// basic call to draw a chart
function plotChart(options) {
	$.ajax({
   	type: "POST",
   	async: false,
    	url: "server/get_series.php",
	  	contentType: "application/x-www-form-urlencoded",
   	data: options,
   	dataType: 'json',
		success: function(data) {
			if (data != "") {
				eval(data.chart);								// plot the chart
				rawdata = data.raw;
			} else {
				none(options.element);
				//notAvailable(options.element, 0);	// show not available
			}
			// set the image to the container size
			var width = $(options.element).innerWidth();
			var height = $(options.element).innerHeight();
			$(options.element).children().css({"width":width+"px", "height":height+"px"}); 
   	}
	});		
}


// cp/cpk chart
function cpcpkChart(chart, what, soort, start, end, product) {
	var ytext;
	var specs = db[what][soort].spec;
	var fields = db[what][soort].field;

	if (product == 0)		return;	// without a product there are no charts

	switch(soort) {
		case 'matinmoist': 	ytext = LABELS[612][$.jStorage.get("lang")];
									break;
		case 'matoutmoist': ytext = LABELS[613][$.jStorage.get("lang")];
									break;
		case 'matouttemp': 	ytext = LABELS[614][$.jStorage.get("lang")];
									break;
		case 'moisture': 		ytext = LABELS[170][$.jStorage.get("lang")];
									break;
	}

	plotChart({
		element: chart,								// element for the chart
		type: "cpk",									// raw, average, deviation, variance, cpk
		field: fields,									// field list
		table: "inspection",							// the data table
		start: start,									// start of period
		end: end,										// end of period
		product: product,								// the product that we need the specs from			
		label: ytext,									// label to use for the legend
		color: "blue",								 	// color to use for the data
		trend: true,									// show trendline
		trans: '0.3',									// transparency for bars
		ylabel: ytext,									// label on the y-axis
		space: 40,										// add extra space for the tilted labels at the bottom
		curved: true,									// use curved lines
		spec: specs,									// spec list
		ticks: 10,										// number of time-marks on xaxis
		samples: 500									// maximum data size (to speed up plotting)
	});
}

// variance chart
function variationChart(chart, what, soort, start, end, product) {
	var ytext, field, eff = [];
	var specs = db[what][soort].spec;
	var fields = db[what][soort].field;

	if (product == 0)		return;	// without a product there are no charts

	switch(soort) {
		case 'matinmoist': 	ytext = LABELS[612][$.jStorage.get("lang")];
									break;
		case 'matoutmoist': 	ytext = LABELS[613][$.jStorage.get("lang")];
									break;
		case 'matouttemp': 	ytext = LABELS[614][$.jStorage.get("lang")];
									break;
		case 'moisture': 		ytext = LABELS[170][$.jStorage.get("lang")];
									break;
	}

	plotChart({
		element: chart,								// element for the chart
		type: "variance",								// raw, average, deviation, variance, cpk
		field: fields,									// field list
		table: "inspection",							// the data table
		start: start,									// start of period
		end: end,										// end of period
		product: product,								// the product that we need the specs from			
		label: ytext,									// label to use for the legend
		color: "blue",								 	// color to use for the data
		trend: true,									// show trendline
		trans: '0.3',									// transparency for bars
		ylabel: ytext,									// label on the y-axis
		space: 40,										// add extra space for the tilted labels at the bottom
		curved: true,									// use curved lines
		spec: specs,									// spec list
		ticks: 10,										// number of time-marks on xaxis
		samples: 500									// maximum data size (to speed up plotting)
	});
}

// std. deviation chart
function deviationChart(chart, what, soort, start, end, product) {
	var ytext, field, eff = [];
	var specs = db[what][soort].spec;
	var fields = db[what][soort].field;

	if (product == 0)		return;	// without a product there are no charts

	switch(soort) {
		case 'matinmoist': 	ytext = LABELS[612][$.jStorage.get("lang")];
									break;
		case 'matoutmoist': 	ytext = LABELS[613][$.jStorage.get("lang")];
									break;
		case 'matouttemp': 	ytext = LABELS[614][$.jStorage.get("lang")];
									break;
		case 'moisture': 		ytext = LABELS[170][$.jStorage.get("lang")];
									break;
	}
	
	plotChart({
		element: chart,								// element for the chart
		type: "deviation",									// raw, average, deviation, variance, cpk
		field: fields,									// field list
		table: "inspection",							// the data table
		start: start,									// start of period
		end: end,										// end of period
		product: product,								// the product that we need the specs from			
		label: ytext,									// label to use for the legend
		color: "blue",								 	// color to use for the data
		trend: true,									// show trendline
		trans: '0.3',									// transparency for bars
		ylabel: ytext,									// label on the y-axis
		space: 40,										// add extra space for the tilted labels at the bottom
		curved: true,									// use curved lines
		spec: specs,									// spec list
		ticks: 10,										// number of time-marks on xaxis
		samples: 500									// maximum data size (to speed up plotting)
	});
}

// average chart
function averageChart(chart, what, soort, start, end, product) {
	var ytext, field, eff = [];
	var specs = db[what][soort].spec;
	var fields = db[what][soort].field;

	if (product == 0)		return;	// without a product there are no charts
	
	switch(soort) {
		case 'matinmoist': 	ytext = LABELS[612][$.jStorage.get("lang")];
									break;
		case 'matoutmoist': 	ytext = LABELS[613][$.jStorage.get("lang")];
									break;
		case 'matouttemp': 	ytext = LABELS[614][$.jStorage.get("lang")];
									break;
		case 'moisture': 		ytext = LABELS[170][$.jStorage.get("lang")];
									break;
	}

	plotChart({
		element: chart,								// element for the chart
		type: "average",									// raw, average, deviation, variance, cpk
		field: fields,									// field list
		table: "inspection",							// the data table
		start: start,									// start of period
		end: end,										// end of period
		product: product,								// the product that we need the specs from			
		label: ytext,									// label to use for the legend
		color: "blue",								 	// color to use for the data
		trend: true,									// show trendline
		trans: '0.3',									// transparency for bars
		ylabel: ytext,									// label on the y-axis
		space: 40,										// add extra space for the tilted labels at the bottom
		curved: true,									// use curved lines
		spec: specs,									// spec list
		ticks: 10,										// number of time-marks on xaxis
		samples: 500									// maximum data size (to speed up plotting)
	});
}

// make a chart of the raw data
function rawChart(chart, what, soort, start, end, product) {
	var ytext, field, eff = [];
	var specs = db[what][soort].spec;
	var fields = db[what][soort].field;

	switch(soort) {
		case 'matinmoist': 	ytext = LABELS[612][$.jStorage.get("lang")];
									break;
		case 'matoutmoist': 	ytext = LABELS[613][$.jStorage.get("lang")];
									break;
		case 'matouttemp': 	ytext = LABELS[614][$.jStorage.get("lang")];
									break;
		case 'moisture': 		ytext = LABELS[170][$.jStorage.get("lang")];
									break;
	}

	if (product == 0)		return;	// without a product there are no charts

	plotChart({
		element: chart,								// element for the chart
		type: "raw",									// raw, average, deviation, variance, cpk
		field: fields,									// field list
		table: "inspection",							// the data table
		start: start,									// start of period
		end: end,										// end of period
		product: product,								// the product that we need the specs from			
		label: ytext,									// label to use for the legend
		color: "blue",								 	// color to use for the data
		trend: false,									// show trendline
		trans: '0.3',									// transparency for bars
		ylabel: ytext,									// label on the y-axis
		space: 40,										// add extra space for the tilted labels at the bottom
		curved: true,									// use curved lines
		spec: specs,									// spec list
		ticks: 10,										// number of time-marks on xaxis
		samples: 500									// maximum data size (to speed up plotting)
	});
}


// call to draw a distribution chart
function drawBell(options) {
	$.ajax({
   	type: "POST",
   	async: false,
    	url: "server/bell_chart.php",
	  	contentType: "application/x-www-form-urlencoded",
   	data: options,
		success: function(data) {							// plot the chart
			if (data != "") {
				eval(data);								// plot the chart
			} else {
				none(options.element);
			}
			// set the image to the container size
			var width = $(options.element).innerWidth();
			var height = $(options.element).innerHeight();
			$(options.element).children().css({"width":width+"px", "height":height+"px"});
   	}
	});		
}

// mini distribution chart
function miniDistChart(chart, what, soort, product, end) {
	var specs = db[what][soort].spec;

	if (product == 0)		return;	// without a product there are no charts
	
	var spec = getSpec(product, end);		// get the specs for the last date
	var low = spec[db[what][soort].spec.min];
	var high = spec[db[what][soort].spec.max];
	var norm = (parseFloat(low)+parseFloat(high))/2;

	var DATA = JSON.stringify(rawdata);
	drawBell({
		element: chart,								// element for the chart
		orientation: "vertical",			// orientation of the chart								what: [DATA],									// the raw data
		color: "grey",								// color to use for the data
		specs: [low, norm, high],			// the field(s) or values to use as spec reference
		samples: 1000									// maximum data size (to speed up plotting)
	});

	$(chart).children().css("-webkit-transform","rotate(90deg) scaleX(-1) translate(-50px, 41px)");
}

// large distribution chart
function distributionChart(chart, what, soort, start, end, product) {
	var ytext, field, eff = [];
	var specs = db[what][soort].spec;
	var fields = db[what][soort].field;

	switch(soort) {
		case 'matinmoist': 	xLbl = LABELS[612][$.jStorage.get("lang")];
									break;
		case 'matoutmoist': 	xLbl = LABELS[613][$.jStorage.get("lang")];
									break;
		case 'matouttemp': 	xLbl = LABELS[614][$.jStorage.get("lang")];
									break;
		case 'moisture': 		xLbl = LABELS[170][$.jStorage.get("lang")];
									break;
	}

	if (product == 0)		return;	// without a product there are no charts

	yLbl = LABELS[94][$.jStorage.get("lang")];
	
	var spec = getSpec(product, end);		// get the specs for the last date
	var low = spec[db[what][soort].spec.min];
	var high = spec[db[what][soort].spec.max];
	var norm = (parseFloat(low)+parseFloat(high))/2;
	var _data = Array();

	var sql = sprintf("SELECT * FROM gwc_pline.inspection WHERE (DATE(date) BETWEEN '%s' AND '%s') AND product='%s' ORDER BY date",
							start, end, product);

	$.getJSON('server/get_range.php', {	// get the data 
		query: sql
	},	function(data) {
			
		for (i = 0; i < data.count; i++) {
			fields.map(function (naam) {
				_data.push([i, parseFloat(data[i].row[naam])]);
			})
		}

		var DATA = JSON.stringify(_data);
		drawBell({
			element: chart,								// element for the chart
			orientation: "horizontal",		// orientation of the chart									what: [DATA],									// which fields to use for the data
			label: [xLbl],									// labels to use for the legend
			color: "grey",									// color to use for the data
			trans: '0.3',									// transparency for bars
			ylabel: yLbl,									// label for each serie on the y-axis
			space: 15,										// add extra space for the tilted labels at the bottom
			resample: 1,									// used for dist charts (makes the bars wider)
			specs: [low, norm, high],					// the field(s) or values to use as spec reference
			period: [],										// time or record range
			ticks: 5,										// number of time-marks on xaxis
			grid: [1,1],									// which grid to show [x,y]	
			show: [-2],										// what to show on xaxis (date=0, time=1, number=-1, raw=-2)
			samples: 1000									// maximum data size (to speed up plotting)
		});
		//alert();
	});

}
