/*///////////////////////////////////////////////////////////////////////////////////////////////////////////
	popup plugin v1
	usage:
		$(element).popup()		open popup
		$(element).popdown() 	close popup
		element: any div/span/form that contains the html for the popup (requires style="display:none")
/*///////////////////////////////////////////////////////////////////////////////////////////////////////////

;(function($){

 	$.fn.extend({ 

 		popup: function() {
    								
			//Iterate over the current set of matched elements
    		return this.each(function() {
    			var overlay = jQuery('<div id="_pop_over_" style="position:absolute; top:0; left:0; width:100%; height:100%; background-color:black;\
								filter:alpha(opacity=50); -moz-opacity:0.5; -khtml-opacity:0.5; opacity:0.5;	z-index:1000;"> </div>');
				overlay.appendTo(document.body);		// place the overlay to make sure the popup is modal

				$(this).css({					// set the popup shape and color
    				'position': 'absolute', 
    				'padding': '10px',
    				'background': 'white',
    				'border-radius': '15px',
    				'z-index': '10000'
				});
				$(this).fadeIn(500);						// show the popup on the center of the screen
				var left = ($(document).width() - $(this).width() - 60)/2;
				var top = ($(document).height() - $(this).height() - 60)/2;
	
				$(this).css('left', left);
				$(this).css('top', top);
				$('input:visible:first').focus();
				
				$(this).on('keydown', function(e) {
					if (e.which == 9) 
						e.preventDefault();		// disable tab-key in popup
				});
    		});	
    	},
    	
    	// close popup and remove overlay
		popdown: function() {
			$(this).fadeOut(500);
			$("#_pop_over_").remove();
    	}

	});
	

})(jQuery);

