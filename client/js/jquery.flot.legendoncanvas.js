(function($) {

	function init(plot) {
		plot.hooks.processOptions.push(addLastDrawHook);
	}

	function addLastDrawHook(plot) {
		plot.hooks.draw.push(drawLegend);
	}

	// draws the legend on the canvas, using the HTML added by flot as a guide
	function drawLegend(plot, ctx) {
		var options = plot.getOptions();
		if (!options.legend.show) return;

		var placeholder = plot.getPlaceholder();
		var container = options.legend.container || placeholder.find('.legend');

		var f = {
			style: placeholder.css("font-style"),
			size: Math.round(0.8 * (+placeholder.css("font-size").replace("px", "") || 13)),
			variant: placeholder.css("font-variant"),
			weight: placeholder.css("font-weight"),
			family: placeholder.css("font-family")
		};

		ctx.font = f.style + " " + f.variant + " " + f.weight + " " + f.size + "px '" + f.family + "'";
		ctx.textAlign = "left";
		ctx.textBaseline = "bottom";

		function fontAscent() {
			return 12;
		}

		var series = plot.getData();
		var plotOffset = plot.getPlotOffset();
		var plotHeight = plot.height();
		var plotWidth = plot.width();
		var lf = options.legend.labelFormatter;
		var legendWidth = 0, legendHeight = 0;
		var num_labels = 0;
		var s, label;
		var columns = options.legend.noColumns;
		
		// get width of legend and number of valid legend entries
		for (var i = 0; i < series.length; ++i) {
			s = series[i];
			label = s.label;
			if (!label) continue;
			num_labels++;
			if (lf) label = lf(label, s);
			labelWidth = ctx.measureText(label).width;
			if (labelWidth > legendWidth) legendWidth = labelWidth;
		}
		var LEGEND_BOX_WIDTH = 22; // color box
		var PADDING_RIGHT = 5;
		var LEGEND_BOX_LINE_HEIGHT = 14;
		legendWidth = legendWidth + LEGEND_BOX_WIDTH + PADDING_RIGHT;
		legendHeight = LEGEND_BOX_LINE_HEIGHT; 
		columns = Math.max(columns, 1);
		boxWidth = Math.min(columns, num_labels)*legendWidth;
		boxHeight = Math.round(num_labels/columns) * LEGEND_BOX_LINE_HEIGHT;
		var x, y;
		if (options.legend.container != null) {
			x = $(options.legend.container).offset().left;
			y = $(options.legend.container).offset().top;
		} else {
			var pos = "";
			var p = options.legend.position;
			var m = options.legend.margin;
			if (m[0] == null) m = [m, m];
			if (p.charAt(0) == "n")
				y = Math.round(plotOffset.top + options.grid.borderWidth + m[1]);
			else if (p.charAt(0) == "s")
				y = Math.round(plotOffset.top + options.grid.borderWidth + plotHeight - m[0] - boxHeight); 
			if (p.charAt(1) == "e")
				x = Math.round(plotOffset.left + options.grid.borderWidth + plotWidth - m[0] - boxWidth);
			else if (p.charAt(1) == "w")
				x = Math.round(plotOffset.left + options.grid.borderWidth + m[0]);
			if (options.legend.backgroundOpacity != 0.0) {
				var c = options.legend.backgroundColor;
				if (c == null) c = options.grid.backgroundColor;
				if (c && typeof c == "string") {
					ctx.globalAlpha = options.legend.backgroundOpacity;
					ctx.fillStyle = c;
					ctx.fillRect(x, y, boxWidth, boxHeight);
					ctx.globalAlpha = 1.0;
				}
			}
		}
		
		var posx, posy, hpos=0;
		for (var i = 0, j = 0, col = 0; i < series.length; ++i) {
			s = series[i];
			label = s.label;
			if (!label) continue;
			if (lf) label = lf(label, s);
			if (columns > 1) {
				posy = y + (Math.floor(j/columns) * 18);
				hpos = x + legendWidth*(j%columns);
				ctx.fillStyle = options.legend.labelBoxBorderColor;
				ctx.fillRect(hpos, posy, 18, 14);
				ctx.fillStyle = "#FFF";
				ctx.fillRect(hpos + 1, posy + 1, 16, 12);
				ctx.fillStyle = s.color;
				ctx.fillRect(hpos + 2, posy + 2, 14, 10);
				ctx.fillStyle = options.legend.color;
				ctx.fillText(label, hpos+22, posy+ f.size + 2);
			} else {
				posy = y + (j * 18);
				ctx.fillStyle = options.legend.labelBoxBorderColor;
				ctx.fillRect(x, posy, 18, 14);
				ctx.fillStyle = "#FFF";
				ctx.fillRect(x + 1, posy + 1, 16, 12);
				ctx.fillStyle = s.color;
				ctx.fillRect(x + 2, posy + 2, 14, 10);
				posx = x+22;
				posy = posy + f.size + 2;
				ctx.fillStyle = options.legend.color;
				ctx.fillText(label, posx, posy);
			}
			j++;
		}

		container.hide(); // hide the HTML version
	}

	$.plot.plugins.push({
		init: init,
		options: {},
		name: 'legendoncanvas',
		version: '1.0'
	});
})(jQuery);