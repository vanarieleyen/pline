
var evaluate_content = {
	contents: [
		m("#evaluate", {style: "width:100%"},
			m("span.flex-row", {style: "background-color:rgba(0,255,255,0.05)"},
				m("fieldset.fieldset_header", {style: "width:100%"}, [
					m("legend.SELECT"),
					m("table", {width: "100%"}, 
						m("tr", [
							m("td", 
								m("table", {width:"100%"}, [
									[	{label:"label.START_DATE", name:"start"},	{label:"label.END_DATE", name:"end"} ].map(function (a) {							
										return m("tr", [
														m("td",	m(a.label)),
														m("td",	m("input.datum[type:text]", {name: a.name}))
													])
									})
								])
							),
							m("td", 
								m("table", {width:"100%"}, [
									[
										{label:"label.PRODUCT", name:"product"},
										{label:"label.PRODUCTIONSTATUS", name:"prodStat"}
									].map(function (a) {							
										return m("tr", [
														m("td",	m(a.label)),
														m("td",	m("select", {name: a.name}))
													])
									})
								])
							),
							m("td", 
								m("table", {width:"100%"},  [
									[
										{label:"label.IRESULT", name:"result"},
										{label:"label.DISPOSAL", name:"disposal"}
									].map(function (a) {							
										return m("tr", [
														m("td",	m(a.label)),
														m("td",	m("select", {name: a.name}))
													])
									})
								])
							),
							m("td", 
								m("table", {width: "100%"}, [
									m("tr", [
										m("td",	m("input[type=button]", {class:"export", id:"export", style:"width:8em"}))
									])
								])
							)
						])
					)
				])
			)
		),
		m("#evaltabs.subtabs1", [
			m("ul", [
				[
					{label:"label.CHARTS", href:"#charts_tab"},
					{label:"label.CONTROLCHARTS", href:"#control_tab"},
					{label:"label.EXPORT", href:"#export_tab"}
				].map(function (a) {
					return m("li", 
									m("a", {href: a.href, tabindex:"-1", class: "last" }, [
										m(a.label)
									])
								)
				})
			]),
			[			// the tabs used by ui-tabs
				m("#charts_tab", m.component(charts_content)),
				m("#control_tab", m.component(control_content)),
				m("#export_tab", m.component(export_content))
			]
		])
	],
	controller: function (element, isInitialized) {		// only events and initialisation
		if (isInitialized) 
			return;

		$("#evaluate [name=disposal]").addClass("last");		// set the last field

		$('#evaluate #export').click(function() {
			var start = $('#evaluate [name=start]').val();
			var end = $('#evaluate [name=end]').val();
			var prodstat = $('#evaluate [name=prodStat]').val();
			var result = $('#evaluate [name=result]').val();
			var disposal = $('#evaluate [name=disposal').val();
			var product = $('#evaluate [name=product] option:selected').text();
			var src =	sprintf('server/export_sheets.php?start=%s&end=%s&prodstat=%s&result=%s&disposal=%s&product=%s',
										start, end, prodstat, result, disposal, product); 
			
			var xhr = new XMLHttpRequest();
			xhr.open('GET', src, true);
			xhr.responseType = 'blob';
			
			xhr.onload = function(e) {
			  if (this.status == 200) {
			    var blob = this.response;			// get binary data
			    saveAs(blob, "export.xls");		// save locally
			  }
			};
			xhr.send();
		});
						
		// default tab when page is first loaded
		var initialtab = $.jStorage.get("pline_evaluationtab");

		$( "#evaltabs" ).tabs({
			active: initialtab,
			activate: function( event, ui ) {
				show_evaluation();
				keus = ui.newPanel[0].id;
				switch (keus) {
					case "charts_tab":			
						$.jStorage.set("pline_evaluationtab", 0);
						break;
					case "export_tab": 	
						$.jStorage.set("pline_evaluationtab", 1);
						break;
				}
			},
			create: function( event, ui ) {
				show_evaluation();
			}
		});
		
		var nu = new Date();
		$('#evaluate [name=start]').val(nu.format("yyyy-MM-dd") );
		$('#evaluate [name=end]').val(nu.format("yyyy-MM-dd") );

		$("#evaluate select").change(function () {
			var start_date = $("#evaluate [name=start]").val();
			var end_date = $("#evaluate [name=end]").val();
			var product = $("#evaluate [name=product]").val();
			var prodStat = $("#evaluate [name=prodStat]").val();
			var result = $("#evaluate [name=result]").val();
			var disposal = $("#evaluate [name=disposal]").val();
			
			// fill the selectbox options
			$.getJSON('server/get_evalselect.php', {
				start: start_date,
				end: end_date,
				product: product,
				prodStat: prodStat,
				result: result,
				disposal: disposal,
				lang: $.jStorage.get("lang")
			},function(data) {	
				$('#evaluate [name=prodStat]').empty().append(data.prodStat);	
				$('#evaluate [name=product]').empty().append(data.product);
				$('#evaluate [name=result]').empty().append(data.result);
				$('#evaluate [name=disposal]').empty().append(data.disposal);		

				if ($.jStorage.get("pline_evaluationtab") == 1) {			
					createSheet();
				} else {	// charts tab: get the selected data
					var start = 	$('#evaluate [name=start]').val();
					var end = 		$('#evaluate [name=end]').val();
					var product = $('#evaluate [name=product] option:selected').val();
					var sql = sprintf("SELECT * FROM gwc_pline.inspection \
											WHERE (DATE(date) BETWEEN '%s' AND '%s') AND product='%s' ORDER BY date",
											start, end, product);
				
					$.ajax({
				   	type: "GET",
				    url: "server/get_range.php",
					  contentType: "application/x-www-form-urlencoded",
					  async: true,
				   	data: {query: sql},
				   	dataType: 'json',
				   	beforeSend: spin,	// start the spinner
						success: function(data) {
							$.jStorage.set("pline_rawdata", data);
							draw_chart("1");
							draw_chart("2");
						}
					});
				}					

			});
		})
		
	},
	view: function () {
		return m("div", this.contents);
	}
}