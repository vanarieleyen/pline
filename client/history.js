
var history_content = {
	contents: [
		m("div", {style: "height:41em; overflow:auto"},
			m("table#lijst", {width: "99%"},
				[
					m("thead.header"), 	// head of the list
					m("tbody")		// the lines in the list
				]
			)
		)
	],
	controller: function (element, isInitialized) {		// only events and initialisation
		if (isInitialized) 
			return;

		$('#history #lijst tbody').on('click', 'td', function(e) {		// open the selected row
			var id = parseInt($(this).parent().find("td:first").text());
			var table = $.jStorage.get("handmade_lasttab").split('_')[0];
			
			if (table=="defects") // defects are split into different tables
				table = Array("stickDefects", "packDefects", "boxDefects")[$.jStorage.get("handmade_defectstab")];

			$.jStorage.set("handmade.current."+table, id);
			show_data(table);		// update the data in the tab before it is selected
			$('.PACKING50').click();
		});

	},
	view: function () {
		return m("#history", this.contents);
	}
}