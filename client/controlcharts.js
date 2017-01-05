
var control_content = {
	contents: [
		m("table", {style:"width:100%"}, [
			m("tr", {style:"height:300px"}, [
				m("td", {valign:"top"},
					m("table", {style:"background-color:rgba(0,255,255,0.1)"}, [
						m("tr", m("td", {colspan:"2"} )),
						m("tr", [
							m("td.CHARTS"),
							m("td", m("select#group", {style:"width:13em"} ))
						]),
						m("tr", [
							m("td"),
							m("td", m("select#choice", {style:"width:13em"} ))
						]),
						m("tr", [
							m("td.TYPE"),
							m("td#soort")
						]),
						m("tr", [
							m("td.SAMPLESIZE"),
							m("td", m("select#samplesize", {style:"width:13em"} ))
						])
					])
				),
				m("td", {width:"100%"}, 
					m("span.flex-row", {style:"-webkit-justify-content:flex-start !important"}, [
							m("#graph1", {style:"width:870px; height:300px"}),
							m("#dist1", {style:"width:140px; height:200px"})
					])
				)
			]),
			m("tr", {style:"height:300px"}, [
				m("td"),
				m("td", {width:"100%"}, 
					m("span.flex-row", {style:"-webkit-justify-content:flex-start !important"}, [
							m("#graph2", {style:"width:870px; height:300px"}),
							m("#dist2", {style:"width:140px; height:200px"})
					])
				)
			])
		])
	],
	controller: function (element, isInitialized) {
		if (isInitialized)
			return;

		$("#control #samplesize").addClass("last");		// set the last field

		// get the data that can be displayed in a chart (length, circumference, hardness, etc...)	
		$.get('server/get_groups.php?lang='+$.jStorage.get("lang"), function(data) {$('#control #group').append(data);	});
		$.get('server/get_choice.php?lang='+$.jStorage.get("lang")+"&group=regain1", function(data) {$('#control #choice').empty().append(data);	});

		
		// get the chart types that can be displayed (raw, average, distribution etc..)	
		$.get('server/get_controltypes.php?name=soort', 
			function(data) {$('#control #soort').append(data);	});
		$.get('server/get_samplesizes.php?name=samplesize', 
			function(data) {$('#control #samplesize').append(data);	});

		$('#control select').on('change', function () {
			draw_controlchart();
		});	
		
		$('#control #soort').on('change', function () {
			draw_controlchart();
		});
		
	},
	view: function () {
		return m("#control", this.contents);
	}
}
