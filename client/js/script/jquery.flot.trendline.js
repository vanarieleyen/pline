/*
@author Ricardo Vega - "ricardoe" in the google mail system
Flot plugin for trendlines. Controlled through the option
"trendline" in the global series options

  series: {
    trendline: {
        [show:boolean],
        [lineWidth:integer],
        [fill:boolean],
        [fillColor:color],
        [steps:boolean]
    }
  }
*/

function convertRGBDecimalToHex(rgb)
{
    var regex = /rgb *\( *([0-9]{1,3}) *, *([0-9]{1,3}) *, *([0-9]{1,3}) *\)/;
    var values = regex.exec(rgb);
    if(values.length != 4)
    {
        return rgb; // fall back to what was given.              
    }
    var r = Math.round(parseFloat(values[1]));
    var g = Math.round(parseFloat(values[2]));
    var b = Math.round(parseFloat(values[3]));
    return "#" 
        + (r + 0x10000).toString(16).substring(3).toUpperCase() 
        + (g + 0x10000).toString(16).substring(3).toUpperCase()
        + (b + 0x10000).toString(16).substring(3).toUpperCase();
}

function convertToHexColor(englishColor) {
    // create a temporary div. 
    var div = $('<div></div>').appendTo("body").css('background-color', englishColor);
    var computedStyle = window.getComputedStyle(div[0]);

    // get computed color.
    var computedColor = computedStyle.backgroundColor;

    // cleanup temporary div.
    div.remove();

    return convertRGBDecimalToHex(computedColor);    // The above returns "rgb(R, G, B)" on IE9/Chrome20/Firefox13.
};

function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
 
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;
 
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
 
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [ h, s, l ];
}

function hslToRgb(h, s, l) {
  var r, g, b;
 
  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
 
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return [ r * 255, g * 255, b * 255 ];
}

(function ($) {
    function init(plot) {
        var opts, enabled = false,
            defaultLine = {},
            defaultOther = { show: false };
        
        function checkEnabled(plot, options) {
            if ('trendline' in options && options.trendline.show) {
                enabled = true;
                opts = options;
                defaultLine = $.extend(defaultLine,options.trendline);
                plot.hooks.processParsedData.push(bestfit);
            }
        }

        function bestfit(plot, series, data) {

            var ii=0, x, y, x0, x1, y0, y1, dx,
                m = 0, b = 0, cs, ns,
                n = data.length, Sx = 0, Sy = 0, Sxy = 0, Sx2 = 0, S2x = 0;
            
            // Not enough data or disabled
            if(n < 2 || !enabled) return;
            
            // Do math stuff
            for(ii; ii<n; ii++){
                x = data[ii][0];
                y = data[ii][1];
                Sx += x;
                Sy += y;
                Sxy += (x*y);
                Sx2 += (x*x);
            }
            // Calculate slope and intercept
            m = (n*Sx2 - S2x) != 0 ? (n*Sxy - Sx*Sy) / (n*Sx2 - Sx*Sx) : 0;
            b = (Sy - m*Sx) / n;
            
            // Calculate minimal coordinates to draw the trendline
            x0 = parseFloat(data[0][0]);
            y0 = parseFloat(m*x0 + b);
            x1 = parseFloat(data[ii-1][0]);
            y1 = parseFloat(m*x1 + b);

            // We extend add the new serie to the series array
            //ns = $.extend(true, {}, opts.series, { data:[[x0,y0],[x1,y1]], lines: defaultLine, bars: defaultOther, label: labels[120][ Jget("lang") ], points:defaultOther } );
            //ns = $.extend(true, {}, opts.series, { data:[[x0,y0],[x1,y1]], lines: defaultLine, bars: defaultOther, label: "", points:defaultOther } );
            
				function toHex(d) {
    				return  ("0"+(Number(d).toString(16))).slice(-2).toUpperCase()
				}

				// generate a lighter color for the trendline
            var kleur = convertToHexColor(series[series.length-1].color).substring(1,7);
        		var R = parseInt(kleur.substring(0,2) ,16);
        		var G = parseInt(kleur.substring(2,4) ,16);
        		var B = parseInt(kleur.substring(4,6) ,16);
            var HSL = rgbToHsl(R, G, B);

            HSL[2] = HSL[2] + ((1-HSL[2])/100*60);
            var RGB = hslToRgb(HSL[0], HSL[1], HSL[2]);
				var newcolor = "#"+toHex(Math.round(RGB[0])) + toHex(Math.round(RGB[1])) + toHex(Math.round(RGB[2]));

            ns = $.extend(true, {}, opts.series, { data:[[x0,y0],[x1,y1]], label:'', bars:defaultOther, lines:defaultLine, points:defaultOther, color:newcolor } );
            series.push(ns);
        }
        
        plot.hooks.processOptions.push(checkEnabled);
    }

    var options = { trendline: { show:false, lineWidth:2, fill:false, fillColor:null, steps:false } };

    $.plot.plugins.push({
        init: init,
        options: options,
        name: "trendline",
        version: "0.1"
    });
})(jQuery);