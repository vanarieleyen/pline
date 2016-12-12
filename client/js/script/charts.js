
// show 'not available' (for charts that are not available)
function none(chart) {
	var msg = LABELS[321][$.jStorage.get("lang")];
	var height = $(chart).css("height");
	var width = $(chart).css("width");
	var t = $.plot($(chart), [], {grid: {borderWidth: {top: 0, right: 0, bottom: 0, left: 0}}});
	var ctx = t.getCanvas().getContext("2d");	
	ctx.font = 'italic 40px Calibri';
	ctx.fillStyle = "#FF0000";
	var w = ctx.measureText(msg).width;
	ctx.fillText(msg, ($(chart).width()-w)/2, ($(chart).height())/2);
	$(chart).html('<img src=\"'+t.getCanvas().toDataURL('image/png')+'\"/>');
	return true;
}

// basic call to draw a chart
function plotChart(options) {
	$.ajax({
   	type: "POST",
   	async: false,
    	url: "ajax/get_series.php",
	  	contentType: "application/x-www-form-urlencoded",
   	data: options,
		success: function(data) {
			if (data != "") {
				eval(data);								// plot the chart
			} else {
				notAvailable(options.element, 0);	// show not available
			}
   	}
	});		
}

function plotMiniChart(element, soort, line, specs) {
	ticks = [];
	$.each(line, function(idx, val) {
		ticks.push(Array(idx, idx+1));
	});

	$.plot( $("#"+element+" #minichart-"+soort), 
		[{ 
			data: line, 
			yaxis: 1, 
			color: "#3333FF", 
			lines: {show:true}
		}], 
		{  
			grid: { 
				markings: [		// background color according to specs
					{ 
						yaxis: { from:-100000, to: specs.min35 }, 
						color: '#FFAD99' 
					},{ 
						yaxis: { from: specs.min35, to: specs.min20 }, 
						color: '#FFD2AA' 
					},{ 
						yaxis: { from: specs.min20, to: specs.max20 }, 
						color: '#AAFFAA' 
					},{ 
						yaxis: { from: specs.max20, to: specs.max35 }, 
						color: '#FFD2AA' 
					},{ 
						yaxis: { from: specs.max35, to:100000 }, 
						color: '#FFAD99' 
					}
				] 
			},
			xaxes: [{ 
				position: "bottom",  
				axisLabelUseCanvas: true, 
				axisLabelFontSizePixels: 12, 
				axisLabelFontFamily: "Verdana, Arial", 
				axisLabelColour: "rgb(56, 56, 56)", 
				axisLabelPadding: 25, 
				ticks: ticks, 
				font: { size: 10, weight: "light", family: "sans-serif", color: "rgb(56, 56, 56)" } 
			}] 
		}
	)
}

function mini_chart(element, soort, id) {		// mini timechart
	var specmin = db[element][soort].spec.min;
	var specmax = db[element][soort].spec.max;

	var sql = sprintf("SELECT * FROM gwc_handmade.%s t1 \
							JOIN gwc_handmade.specs t2 ON t1.product=t2.name AND t1.date BETWEEN t2.start AND t2.end \
						WHERE t1.id=%s", element, id);
	$.getJSON('server/get_record.php', { 
		query: sql
	}, function(data) {
		var line = Array();
		var specs = specLimits(data[specmin], data[specmax]);
				
		if (data.rowcount == '0') {		// specs not found
			sql = sprintf("SELECT * FROM gwc_handmade.%s WHERE id=%s", element, id);
			$.getJSON('server/get_record.php', { 
					query: sql
			}, function(data) {
				line = [];
				db[element][soort].field.map(function (field, i) {
					tmp = data[field];
					val = (tmp=="") ? NaN : parseFloat(tmp);
					line.push( Array(i, val) );
				});
				plotMiniChart(element, soort, line, specs);
			});
		} else {
			line = [];
			db[element][soort].field.map(function (field, i) {
				tmp = data[field];
				val = (tmp=="") ? NaN : parseFloat(tmp);
				line.push( Array(i, val) );
			});
			plotMiniChart(element, soort, line, specs);
		}
	});
}


