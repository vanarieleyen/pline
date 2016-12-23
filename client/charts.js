
var charts_content = {
	contents: [
		m("table", {style:"width:100%"}, [
			m("tr", {style:"height:300px"}, [
				m("td", {valign:"top"},
					m("table", {style:"background-color:rgba(0,255,255,0.1)"}, [
						m("tr", m("td", {colspan:"2"} )),
						m("tr", [
							m("td.CHARTS"),
							m("td", m("select#group1", {style:"width:13em"} ))
						]),
						m("tr", [
							m("td"),
							m("td", m("select#choice1", {style:"width:13em"} ))
						]),
						m("tr", [
							m("td.TYPE"),
							m("td#type1")
						])
					])
				),
				m("td", {width:"100%"}, 
					m("span.flex-row", {style:"-webkit-justify-content:flex-start !important"}, [
							m("#graph1", {style:"width:870px; height:300px"}),
							m("#dist1", {style:"width:230px; height:150px"})
					])
				)
			]),
			m("tr", {style:"height:300px"}, [
				m("td", {valign:"top"},
					m("table", {style:"background-color:rgba(0,255,255,0.1)"}, [
						m("tr", m("td", {colspan:"2"} )),
						m("tr", [
							m("td.CHARTS"),
							m("td", m("select#group2", {style:"width:13em"} ))
						]),
						m("tr", [
							m("td"),
							m("td", m("select#choice2", {style:"width:13em"} ))
						]),
						m("tr", [
							m("td.TYPE"),
							m("td#type2")
						])
					])
				),
				m("td", {width:"100%"}, m("#graph2", {style:"width:1000px; height:300px"}))
			])
		])
	],
	controller: function (element, isInitialized) {
		if (isInitialized)
			return;

		$("#charts #type2").addClass("last");		// set the last field
	
		// get the data that can be displayed in a chart (length, circumference, hardness, etc...)	
		$.get('server/get_groups.php?lang='+$.jStorage.get("lang"), function(data) {$('#charts #group1').append(data);	});
		$.get('server/get_groups.php?lang='+$.jStorage.get("lang"), function(data) {$('#charts #group2').append(data);	});
		$.get('server/get_choice.php?lang='+$.jStorage.get("lang")+"&group=regain1", function(data) {$('#charts #choice1').empty().append(data);	});
		$.get('server/get_choice.php?lang='+$.jStorage.get("lang")+"&group=regain1", function(data) {$('#charts #choice2').empty().append(data);	});
		
		// get the chart types that can be displayed (raw, average, distribution etc..)	
		$.get('server/get_types.php?lang='+$.jStorage.get("lang")+'&name=type1', 
			function(data) {$('#charts #type1').append(data);	});
		$.get('server/get_types.php?lang='+$.jStorage.get("lang")+'&name=type2', 
			function(data) {$('#charts #type2').append(data);	});
		$('#charts #type2 [Value=Raw]').prop('checked', 'checked');
		
		function generate_charts() {
			spin();
			window.setTimeout(function(){
				draw_chart();
				$( "#waiting" ).remove();	// remove the spinner
			}, 100); 
		}
		
		$('#charts #group1').on('change', function () {
			$.get('server/get_choice.php?lang='+$.jStorage.get("lang")+"&group="+$(this).val(), 
				function(data) {$('#charts #choice1').empty().append(data);	});
		});
		
		$('#charts #group2').on('change', function () {
			$.get('server/get_choice.php?lang='+$.jStorage.get("lang")+"&group="+$(this).val(), 
				function(data) {$('#charts #choice2').empty().append(data);	});
		});
		
		$('#charts #type1').on('change', function () {
			generate_charts()
		});
		
		$('#charts #type2').on('change', function () {
			generate_charts()
		});
		
		$('#charts select').on('change', function () {
			generate_charts()
		});		
		
		generate_charts();

	},
	view: function () {
		return m("#charts", this.contents);
	}
}
