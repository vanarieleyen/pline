
var charts_content = {
	contents: [
		m("table", {style:"width:100%"}, [
			m("tr", {style:"height:300px"}, [
				m("td", {valign:"middle"},
					m("table", {style:"background-color:rgba(0,255,255,0.1)"}, [
						m("tr", m("td", {colspan:"2"} )),
						m("tr", [
							m("td.CHARTS"),
							m("td", m("select#chart1", {style:"width:13em"} ))
						]),
						m("tr", [
							m("td.TYPE"),
							m("td#type1")
						])
					])
				),
				m("td", {width:"100%"}, m("#graph1", {style:"width:800px; height:300px"}))
			]),
			m("tr", {style:"height:300px"}, [
				m("td", {valign:"middle"},
					m("table", {style:"background-color:rgba(0,255,255,0.1)"}, [
						m("tr", m("td", {colspan:"2"} )),
						m("tr", [
							m("td.CHARTS"),
							m("td", m("select#chart2", {style:"width:13em"} ))
						]),
						m("tr", [
							m("td.TYPE"),
							m("td#type2")
						])
					])
				),
				m("td", {width:"100%"}, m("#graph2", {style:"width:800px; height:300px"}))
			])
		])
	],
	controller: function (element, isInitialized) {
		if (isInitialized)
			return;

		$("#charts #type2").addClass("last");		// set the last field
	
		// get the data that can be displayed in a chart (length, circumference, hardness, etc...)	
		$.get('server/get_charts.php?lang='+$.jStorage.get("lang"), function(data) {$('#charts #chart1').append(data);	});
		$.get('server/get_charts.php?lang='+$.jStorage.get("lang"), function(data) {$('#charts #chart2').append(data);	});
		
		// get the chart types that can be displayed (raw, average, distribution etc..)	
		$.get('server/get_types.php?lang='+$.jStorage.get("lang")+'&name=type1', 
			function(data) {$('#charts #type1').append(data);	});
		$.get('server/get_types.php?lang='+$.jStorage.get("lang")+'&name=type2', 
			function(data) {$('#charts #type2').append(data);	});
		$('#charts #type2 [Value=Raw]').prop('checked', 'checked');
		
		$('#charts #chart1').on('change', function () {
			spin();
			window.setTimeout(function(){
				draw_chart();
				$( "#waiting" ).remove();	// remove the spinner
			}, 100);
		});
		
		$('#charts #chart2').on('change', function () {
			spin();
			window.setTimeout(function(){
				draw_chart();
				$( "#waiting" ).remove();	// remove the spinner
			}, 100);
		});
		
		$('#charts #type1').on('change', function () {
			spin();
			window.setTimeout(function(){
				draw_chart();
				$( "#waiting" ).remove();	// remove the spinner
			}, 100);
		});
		
		$('#charts #type2').on('change', function () {
			spin();
			window.setTimeout(function(){
				draw_chart();
				$( "#waiting" ).remove();	// remove the spinner
			}, 100);
		});		
		
		window.setTimeout(function(){
			draw_chart();
			$( "#waiting" ).remove();	// remove the spinner
		}, 100);

	},
	view: function () {
		return m("#charts", this.contents);
	}
}
