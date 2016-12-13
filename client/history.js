
var history_content = {
	contents: [
		m("div", {style: "height:41em; overflow:auto"},
			m("table#lijst", {width: "99%"}, [
				m("thead.header", [
					m("th", {style:"display:none"}, m("label", "ID")),
					["th.DATE","th.BATCHNR","th.PRODUCT","th.PSCORE","th.IRESULT"].map(function (label, idx) {
						return m(label, {nr:idx});
					})
				]), 
				m("tbody")		// the lines in the list
			])
		),
		m("div.buttonrow", [
			m("input[type=button].prev", {value: " <<< ", tabindex:"-1"}),
			m("input[type=button].next", {value: " >>> ", tabindex:"-1"})
		])
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
		
		$("#history .prev").click(function () {
			var options = $.jStorage.get("pline.historylist");
			
			$.getJSON("server/list_history.php",	{
				lang: options.lang,
				page: options.page+1,
				sort: options.sort,
				length: options.length,
				direction: options.direction
			}, function(data) {
				if (data.crc != options.crc) {
					options.crc = data.crc;
					options.page++;
					$.jStorage.set("pline.historylist", options);
					$('#history #lijst tbody').empty();
					$.each(data.records, function (key, regel) {
						$('#history #lijst tbody').append(regel);
					});
				}
			})
		});
		
		$("#history .next").click(function () {
			var options = $.jStorage.get("pline.historylist");
			
			$.getJSON("server/list_history.php",	{
				lang: options.lang,
				page: options.page-1,
				sort: options.sort,
				length: options.length,
				direction: options.direction
			}, function(data) {
				if (data.crc != options.crc) {
					options.crc = data.crc;
					options.page--;
					$.jStorage.set("pline.historylist", options);
					$('#history #lijst tbody').empty();
					$.each(data.records, function (key, regel) {
						$('#history #lijst tbody').append(regel);
					});
				}	
			})	
		});
		
		$("#history th").click(function () {
			var options = $.jStorage.get("pline.historylist");
			options.sort = $(this).attr("nr");
			options.direction = (options.direction == "ASC") ? "DESC" : "ASC";

			$.getJSON("server/list_history.php",	{
				lang: options.lang,
				page: options.page,
				sort: options.sort,
				length: options.length,
				direction: options.direction
			}, function(data) {
				$.jStorage.set("pline.historylist", options);
				$('#history #lijst tbody').empty();
				$.each(data.records, function (key, regel) {
					$('#history #lijst tbody').append(regel);
				})
			})	
		});		

	},
	view: function () {
		return m("#history", this.contents);
	}
}