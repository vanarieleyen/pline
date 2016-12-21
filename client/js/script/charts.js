
var what, start, end, product, machine, station, ofwhat, filter;

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
		what1: 	$('#charts #chart1').val(),							// which data to show (pd, weight, length etc..)
		type1: 	$('#charts #type1 input:checked').val(),			// what kind of chart to show (raw, average, cpk etc..)
		what2: 	$('#charts #chart2').val(),							// which data to show (pd, weight, length etc..)
		type2: 	$('#charts #type2 input:checked').val(),			// what kind of chart to show (raw, average, cpk etc..)
	};
	var arg = extend(defaults, arg); // fill with defaults when no arguments are passed
	//console.log(defaults);

	if (arg.product == '---')	arg.product = null;
	switch (arg.type1) {
		case 'Raw':			rawChart('#charts #graph1', arg.what1, "matoutmoist", arg.start, arg.end, arg.product);
								break;
		case 'Average':	averageChart('#charts #graph1', arg.what1, "matoutmoist", arg.start, arg.end, arg.product);
								break;
		case 'Deviation':	deviationChart('#charts #graph1', arg.what1, "matoutmoist", arg.start, arg.end, arg.product);
								break;
		case 'Variance':	variationChart('#charts #graph1', arg.what1, "matoutmoist", arg.start, arg.end, arg.product);
								break;
		case 'Cpk':	cpcpkChart('#charts #graph1', arg.what1, "matoutmoist", arg.start, arg.end, arg.product);
								break;
	}
	switch (arg.type2) {
		case 'Raw':			rawChart('#charts #graph2', arg.what2, "matoutmoist", arg.start, arg.end, arg.product);
								break;
		case 'Average':	averageChart('#charts #graph2', arg.what2, "matoutmoist", arg.start, arg.end, arg.product);
								break;
		case 'Deviation':	deviationChart('#charts #graph2', arg.what2, "matoutmoist", arg.start, arg.end, arg.product);
								break;
		case 'Variance':	variationChart('#charts #graph2', arg.what2, "matoutmoist", arg.start, arg.end, arg.product);
								break;
		case 'Cpk':	cpcpkChart('#charts #graph2', arg.what2, "matoutmoist", arg.start, arg.end, arg.product);
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
		success: function(data) {
			if (data != "") {
				eval(data);								// plot the chart
			} else {
				none(options.element);
				//notAvailable(options.element, 0);	// show not available
			}
   	}
	});		
}


// cp/cpk chart
function cpcpkChart(chart, what, soort, start, end, product) {
	var ytext;
	var specs = db[what][soort].spec;
	var fields = db[what][soort].field;

	if (product == null)		return;	// without a product there are no charts

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

	if (product == null)		return;	// without a product there are no charts

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

	if (product == null)		return;	// without a product there are no charts

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

	if (product == null)		return;	// without a product there are no charts
	
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

	if (product == null)		return;	// without a product there are no charts

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
    	url: "ajax/bell_chart.php",
	  	contentType: "application/x-www-form-urlencoded",
   	data: options,
		success: function(data) {
			eval(data);								// plot the chart
   	}
	});		
}

// shows the performance of one machine
function machineEvaluationChart(chart, machine, soort, start, end, filter) {	
	var p = [], q=0;

	$.getJSON('ajax/evaluate_machine.php', { 
		machine: machine,
		start: start,
		end: end,
		filter: filter,
		soort: soort
	},	function(data) {
		var lines = "";
		$.each(data.rows, function (key, val) {
			var score = Math.round(100*val.score)/100;	// rond af op 2 decimalen
			lines += sprintf("<tr><td>%s</td><td>%s</td><td>%s</td></tr>", val.product, val.aantal, score);
		});
		$("#eval_machines #productlist").empty();
		$("#eval_machines #productlist").append(lines);
		$("#eval_machines #machine").html(data.name);
		$("#eval_machines ._MEASUREMENTS").html(data.total);
		$.each(data.rec, function (key, val) {
			if (key != 'score' && key != 'count') {
				switch(key) {
					case soort+'_hd':			naam = LABELS[520][$.jStorage.get("lang")];	break;
					case soort+'_circum':	naam = LABELS[515][$.jStorage.get("lang")];	break;
					case soort+'_len':		naam = LABELS[102][$.jStorage.get("lang")];	break;
					case soort+'_pd':			naam = LABELS[312][$.jStorage.get("lang")];	break;
					case soort+'_vent':		naam = LABELS[516][$.jStorage.get("lang")];	break;
					case soort+'_weight':	naam = LABELS[42][$.jStorage.get("lang")];	break;
				}
				if (key.substring(0,3) == soort)
					p.push( [q++, val, naam] );
			}
		});
		switch (soort) {
			case "cpk": var ytext = LABELS[40][$.jStorage.get("lang")];
							var specs = [1, 0.8];		
							break;
			case "var": var ytext = LABELS[518][$.jStorage.get("lang")];	
							var specs = "";
							break;
			case "dev": var ytext = LABELS[517][$.jStorage.get("lang")];	
							var specs = "";
							break;
		}
		var legend = data.name;

		var perf = JSON.stringify(p);
		
		var options = {
			element: chart,								// element for the chart			db: '',											// database
			what: [perf],									// which fields to use for the data
			label: [legend],								// labels to use for the legend
			yaxis: [1],										// which axis to use for the data (count starts with x-axis)
			color: ["grey"],								// color to use for the data
			trend: false,									// show trendline
			stacked: false,								// stack the data
			trans: '0.3',									// transparency for bars
			type: "bars",									// plot: bars, lines, dist
			xlabel: [""],									// label for each serie on the x-axis
			ylabel: [ytext],								// label for each serie on the y-axis
			space: 80,										// add extra space for the tilted labels at the bottom
			resample: 1,									// used for dist charts (makes the bars wider)
			curved: true,									// use curved lines
			chop: false,									// chop data that is too much out of spec
			specs: specs,								// the field(s) or values to use as spec reference
			period: [],										// time or record range
			ticks: 1,										// number of time-marks on xaxis
			grid: [1,1],									// which grid to show [x,y]	
			show: [-2],										// what to show on xaxis (date=0, time=1, number=-1)
			samples: 500									// maximum data size (to speed up plotting)
		};
		drawChart(options);
	});
}

// shows a comparison of all machines
function machineComparisonChart(chart, machines, start, end, filter) {	
	var ytext = LABELS[319][$.jStorage.get("lang")];
	var legend = LABELS[31][$.jStorage.get("lang")];
	var p = [], q=0, max_score=0;

	for (i=0; i < machines.length; i++) {
		$.getJSON('ajax/evaluate_machine.php', { 
			machine: machines[i],
			start: start,
			end: end,
			filter: filter,
			soort: 'cpk'
		},	function(data) {
			max_score = Math.max(max_score, data.score);
			p.push( [q++, data.score, data.name] );
		});
	}
	
	factor = 100/max_score;
	for (i=0; i < p.length; i++) {
		p[i][1] = p[i][1]*factor;
	}

	var perf = JSON.stringify(p);
	
	var options = {
		element: chart,								// element for the chart		db: '',											// database
		what: [perf],									// which fields to use for the data
		label: [legend],								// labels to use for the legend
		yaxis: [1],										// which axis to use for the data (count starts with x-axis)
		color: ["grey"],								// color to use for the data
		trend: false,									// show trendline
		stacked: false,								// stack the data
		trans: '0.3',									// transparency for bars
		type: "bars",									// plot: bars, lines, dist
		xlabel: [""],									// label for each serie on the x-axis
		ylabel: [ytext],								// label for each serie on the y-axis
		space: 80,										// add extra space for the tilted labels at the bottom
		resample: 1,									// used for dist charts (makes the bars wider)
		curved: true,									// use curved lines
		chop: false,									// chop data that is too much out of spec
		specs: [90, 70],								// the field(s) or values to use as spec reference
		period: [],										// time or record range
		ticks: 1,										// number of time-marks on xaxis
		grid: [1,1],									// which grid to show [x,y]	
		show: [-2],										// what to show on xaxis (date=0, time=1, number=-1)
		samples: 500									// maximum data size (to speed up plotting)
	};
	drawChart(options);
}

// make a chart of the penalties-score
function penaltiesChart(chart, table, start, end, product, machine, station, filter) {	
	var ytext, field, eff = [];

	ytext = LABELS[437][$.jStorage.get("lang")];
	field = 'vent';


	if (product == null)		return;	// without a product there are no charts

	plotChart({
		element: chart,								// element for the chart
		type: "raw",									// raw, average, deviation, variance, cpk
		table: table,									// the data table
		field: field,
		start: start,									// start of period
		end: end,										// end of period
		machine: machine,								// machine
		station: station,								// station
		filter: filter,								// filter
		product: product,								// the product that we need the specs from			
		label: ytext,									// label to use for the legend
		color: "blue",								 	// color to use for the data
		trend: false,									// show trendline
		trans: '0.3',									// transparency for bars
		ylabel: ytext,									// label on the y-axis
		space: 40,										// add extra space for the tilted labels at the bottom
		curved: false,									// use curved lines
		spec: [95, 97, 1000, 1000],				// which spec we need
		ticks: 10,										// number of time-marks on xaxis
		samples: 500									// maximum data size (to speed up plotting)
	});
}


// checks if the date is between start and end (only works with YYYY-MM-DD formatted strings)
function between(date, start, end) {
	return ( ( date >= start ) && ( date < end ) );
}

// distribution chart
function distributionChart(chart, table, start, end, product, machine, station, filter) {	
	var xLbl, yLbl, field, _data = [];

	if (product == null)		return;	// without a product there are no charts
	
	switch(table) {
		case 'weight': 		xLbl = sprintf("%s (%s)", LABELS[42][$.jStorage.get("lang")], LABELS[314][$.jStorage.get("lang")]);
									field = 'weight';
									break;
		case 'ventilation': 	xLbl = sprintf("%s (%s)", LABELS[516][$.jStorage.get("lang")], LABELS[314][$.jStorage.get("lang")]);
									field = 'vent';
									break;
		case 'pd': 				xLbl = sprintf("%s (%s)", LABELS[146][$.jStorage.get("lang")], LABELS[314][$.jStorage.get("lang")]);
									field = 'pd';
									break;
		case 'length': 		xLbl = sprintf("%s (%s)", LABELS[102][$.jStorage.get("lang")], LABELS[314][$.jStorage.get("lang")]);
									field = 'len';
									break;
		case 'hardness': 		xLbl = sprintf("%s (%s)", LABELS[520][$.jStorage.get("lang")], LABELS[314][$.jStorage.get("lang")]);
									field = 'hd';
									break;
		case 'circumference':xLbl = sprintf("%s (%s)", LABELS[515][$.jStorage.get("lang")], LABELS[314][$.jStorage.get("lang")]);
									field = 'circ';
									break;
	}
	yLbl = LABELS[94][$.jStorage.get("lang")];

	var sql = sprintf("SELECT %s_min AS low, %s AS norm, %s_max AS high FROM gwc_slimline.products_finished WHERE pid='%s'",
							field, field, field, product);
	$.getJSON('/ajax/get_range.php', {	// get the product specifications
		query: sql
	},	function(data) {
		var low = parseFloat(data[0].row.low);
		var norm = parseFloat(data[0].row.norm);
		var high = parseFloat(data[0].row.high);
		
		var machine_condition = (parseInt(machine) > -1) ? sprintf("AND t1.packing_m='%s' ", machine ) : "";
		var station_condition = (parseInt(station) > -1) ? sprintf("AND t1.origin='%s' ", station ) : "";
		var filter_condition = (parseInt(filter) > 0) ? " AND t1.checked>0 " : " AND t1.checked=0 ";
		var sql = sprintf("SELECT t2.value AS value, t1.date AS date "+ 
							"FROM gwc_slimline.cigaret t1 "+
							"JOIN gwc_slimline.%s t2 ON t2.master=t1.YPBH "+
							"WHERE (DATE(t1.date) BETWEEN '%s' AND '%s') AND t2.value>0 AND t1.product='%s' %s %s %s ORDER BY t1.date",
							table, start, end, product, machine_condition, station_condition, filter_condition); 

		$.getJSON('/ajax/get_range.php', {	// get the data 
			query: sql
		},	function(data) {

			for (i = 0; i < data.count; i++) 
				_data.push([i, parseFloat(data[i].row.value)]);

			var check = (_data.length > 100) ? 1 : 0;
			if (notAvailable(chart, check)) 	// show NA when not enough data
				return;	

			var DATA = JSON.stringify(_data);
			drawBell({
				element: chart,								// element for the chart				what: [DATA],									// which fields to use for the data
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
	});
}

// ABC defects
function abcdefectsChart(chart, what, type, start, end, product, machine, station, filter) {	
	switch (what) {
		case "stick":			var checked = 200;	break;
		case "pack":			var checked = 10;	break;
		case "sleeve":			var checked = 5;	break;
		case "carton":			var checked = 5;	break;
	}

	$.getJSON('/slimline/ajax/abc_defects.php', {	// get the ab defects 
		type: type,		what: what,
		start: start,
		end: end,
		product: product,
		machine: machine,
		station: station,
		filter: filter
	},	function(res) {

		if (notAvailable(chart, res.count))		// no visual measurements available
			return;

		if (typeof res.data == 'undefined') {	// visual measurements available but everything ok
			none(chart);
			return;
		}

		var T = [], total=0, q=0;
		$.each(res.data, function(text, amount) {
			if (amount!='' && !isNaN(amount) && typeof amount != 'undefined')
				T.push({label:text, data:parseInt(amount)});
		});

		if (notAvailable(chart, T.length))
			return;
		T.sort(function(a, b){
  			return parseInt(b.data) - parseInt(a.data);
		});

		var t = $.plot($(chart), T, {
			canvas: true,
         series: {
            pie: {
               show: true,
               radius: 0.5,	// radius of the pie 0..1
               tilt:0.6,
               shadow: {alpha:0.1},
               label: {
                	show: true,
                	radius: 0.7,	// radius of the label placement 0..1
                	formatter:	function(label,point) { 
                						var nr;
                						$.each(T, function(k, v){
                							if (v.label == label)
                								nr = v.data; 
                						});
                						var pt = 100/checked*nr;
                						return(label.substr(0, 4)+'<br>'+nr+' ('+pt.toFixed(1)+'%)'); 
                					},
                	threshold: 0.05	// labels below 5% are not shown
            	}
            }
         },
         legend: {
         	position: 'ne',
         	show: true,
         	color: 'black'
         }
    	});
    	$(chart).html('<img src=\"'+t.getCanvas().toDataURL('image/png')+'\"/>');
   });
}

