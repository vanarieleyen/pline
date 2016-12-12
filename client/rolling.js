var options= {id: "test2", "data-type":"radial-gauge"};

var rolling_content = {
	header: [
		m("span.flex-row#data_header", {style: "background-color:rgba(0,255,255,0.05)"}, 
			m("fieldset.fieldset_header", {style: "width:98%"}, [
				m("legend.MEASUREMENTS"),
				m("table", {width: "100%", border: "0"}, 
					m("tr", [
						m("td",
							m("table", {width: "100%"}, [
								[
									{label:"label.HANDMADE_DATE", soort:"input.datum", field:"date"},
									{label:"label.PRODUCT", soort:"select", field:"product"},
									{label:"label.SAMPLINGPOINT", soort:"select", field:"name"}
								].map(function (a) {							
									return m("tr", [
													m("td",	m(a.label)),
													m("td",	m(a.soort, {type: "text", name: a.field}))
												])
								})
							])
						),
						m("td",
							m("table", {width: "100%"}, [
								[	{label:"label.BATCH_SCORE", field:"score"},	{label:"label.BATCH_QUALITY", field:"quality"} ].map(function (a) {
									return m("tr", [
													m("td",	m(a.label)),
													m("td",	m("div", {name: a.field}, "--"))
												])
								}),
								m("tr", [
									m("td",	m("label.INSPECTOR")),
									m("td",	m("select[name=inspector]"))
								])
							])						
						),
						m("td", {valign: "top"},
							m("table", {width: "100%"}, [
								m("tr", [
									m("td",	m("label.REMARK")),
									m("td",	m("textarea", {style: "height:4em; width:15em; resize:none", name: "remarks"}))
								])
							])
						)					
					])
				)
			])			
		)
	],
	contents: [
		m("span.flex-row", {style: "background-color:rgba(0,255,255,0.05)"}, [
			m("fieldset.fieldset_header", {style: "width:50%"}, [
				m("legend.LENGTH"),
				m("table", {width: "100%", border: "0"}, [
					m("tr", [1,2,3,4,5].map(function(n) {
						return m("td",	m("input.number", {name: "l"+n}))
					})), 
					m("tr", [6,7,8,9,10].map(function(n) {
						return m("td",	m("input.number", {name: "l"+n}))
					})),
					m("tr", [
						m("td",	{colspan:"5"}, m("hr"))
					]),
					m("tr", [
						m("td",	{colspan:"4"}, 
							m("#minichart-lengte.minichart",	m("canvas.flot-base"))
						),
						m("td",	{colspan:"1"}, 
							m("canvas#r-lengte", {style:"width:100px"})
						)		
					])
				])
			]),
			m("fieldset.fieldset_header", {style: "width:50%"}, [
				m("legend.HANDMADE_CIRCUMFERENCE"),
				m("table", {width: "100%", border: "0"}, [
					m("tr", [1,2,3,4,5].map(function(n) {
						return m("td",	m("input.number", {name: "c"+n}))
					})), 
					m("tr", [6,7,8,9,10].map(function(n) {
						return m("td",	m("input.number", {name: "c"+n}))
					})),
					m("tr", [
						m("td",	{colspan:"5"}, m("hr"))
					]),
					m("tr", [
						m("td",	{colspan:"4"}, 
							m("#minichart-omtrek.minichart",	m("canvas.flot-base"))
						),
						m("td",	{colspan:"1"}, 
							m("canvas#r-omtrek", {style:"width:100px"})
						)	
					])
				])
			])
		]),
		m("span.flex-row", {style: "background-color:rgba(0,255,255,0.05)"}, [
			m("fieldset.fieldset_header", {style: "width:50%"}, [
				m("legend.WEIGHT"),
				m("table", {width: "100%", border: "0"}, [
					m("tr", [1,2,3,4,5].map(function(n) {
						return m("td",	m("input.number", {name: "w"+n}))
					})), 
					m("tr", [6,7,8,9,10].map(function(n) {
						return m("td",	m("input.number", {name: "w"+n}))
					})),
					m("tr", [
						m("td",	{colspan:"5"}, m("hr"))
					]),
					m("tr", [
						m("td",	{colspan:"4"}, 
							m("#minichart-gewicht.minichart", m("canvas.flot-base"))
						),
						m("td",	{colspan:"1"}, 
							m("canvas#r-gewicht", {style:"width:100px"})
						)	
					])
				])
			]),
			m("fieldset.fieldset_header", {style: "width:50%"}, [
				m("legend.PRESSUREDROP"),
				m("table", {width: "100%", border: "0"}, [
					m("tr", [1,2,3,4,5].map(function(n) {
						return m("td",	m("input.number", {name: "p"+n}))
					})), 
					m("tr", [6,7,8,9,10].map(function(n) {
						return m("td",	m("input.number", {name: "p"+n}))
					})),
					m("tr", [
						m("td",	{colspan:"5"}, m("hr"))
					]),
					m("tr", [
						m("td",	{colspan:"4"}, 
							m("#minichart-pd.minichart", m("canvas.flot-base"))
						),
						m("td",	{colspan:"1"}, 
							m("canvas#r-pd", {style:"width:100px"})
						)	
					])
				])
			])
		]),
		m("fieldset.fieldset_header", {style: "width:50%"}, [
			m("table", {width: "100%", border: "0"}, [
				m("tr", [
					[
						{label:"label.SURFACE_OUT", field:"surfout"},
						{label:"label.TIGHTNESS_OUT", field:"tightout"},
						{label:"label.BLEND_ACC", field:"blendacc"},
						{label:"label.PD_ACC", field:"pdacc"}
					].map(function (a) {
						return [m("td",	m(a.label)), m("td",	m("input.number", {name: a.field}))]
					})
				])
			])
		]),
		m("div.buttonrow", [
			m("input[type=button].prev", {value: " <<< ", tabindex:"-1"}),
			m("input[type=button].next", {value: " >>> ", tabindex:"-1"}),
			m("input[type=button].new", {tabindex:"-1"}),
		])
	],
	controller: function (element, isInitialized) {		// only events and initialisation
		if (isInitialized) 
			return;

		$("#rolling [name=pdacc]").addClass("last");		// set the last field

		// save data
		$("#rolling input:text").blur(function () {
			current = $.jStorage.get("handmade.current.rolling");	
			date = $("#rolling [name=date]").val();
			product = $("#rolling [name=product]").val();
			field = $(this).attr('name');
			this.value = $(this).val();
			
			var sql = sprintf('UPDATE gwc_handmade.rolling SET %s="%s" WHERE id=%s', field, this.value, current );
			$.getJSON('server/send_query.php', {query: sql}, function (data) {
				$.getJSON('server/calc_scores.php', {
					id: current, 
					table: "rolling"
				}, function (data) {
					var spec = getSpec(product, date);
					
					$("#rolling [name=score]").html(data.score);
					$("#rolling [name=quality]").html(data.quality);
					
					["surfout","tightout","blendacc","pdacc"].map(function (label) {
						setColor("#rolling", label, spec);
					});
					
					switch(field[0]) {
						case "l": choice="lengte";	break;
						case "w": choice="gewicht";	break;
						case "c": choice="omtrek";	break;
						case "p": choice="pd";	break;
						default: return;
					}
					
					mini_chart("rolling", choice, current);		// update the minichart
					colorSeries("rolling", choice, spec);
					
					if (spec != null) { // calculate and show the cpk
						var serie = [];
						db.rolling[choice].field.map(function (field) {
							var waarde = parseFloat($("#rolling [name="+field+"]").val());
							if (!isNaN(waarde))
								serie.push(waarde);
						});
						var result = cpk(spec[db.rolling[choice].spec.min], spec[db.rolling[choice].spec.max], serie);
						gauge = document.gauges.get("r-"+choice);
						if (gauge != null) {
							gauge.value = Math.min(Math.max(result, 0), 1);
							gauge.update();
						}
					} else {	// product is not filled, so no specs
						gauge = document.gauges.get("r-"+choice);
						if (gauge != null) {
							gauge.value = 0.0;
							gauge.update();
						}
					}

				});
			});	
		})

		$("#rolling textarea").blur(function () {
			this.current = $.jStorage.get("handmade.current.rolling");	
			this.remarks = $("#rolling [name=remarks]").val();
			
			sql = sprintf('UPDATE gwc_handmade.rolling SET remarks="%s" WHERE id=%s', this.remarks, this.current );
			$.getJSON('server/send_query.php', {	query: sql	});			
		})
		
		$("#rolling select").on("blur", function () {
			this.current = $.jStorage.get("handmade.current.rolling");
			this.field = $(this).attr('name');
			this.value = $(this).val();

			sql = sprintf('UPDATE gwc_handmade.rolling SET %s="%s" WHERE id=%s', this.field, this.value, this.current );	
			$.getJSON('server/send_query.php', {	query: sql	});	
		})
		
		$("#rolling .new").click(function() {
			new_rec("gwc_handmade.rolling", "#rolling");
		})

		$('#rolling .next').click(function() {
			next_rec("gwc_handmade.rolling");
		});
	
		$('#rolling .prev').click(function() {
			prev_rec("gwc_handmade.rolling");
		});

	},
	view: function () {
		return m("#rolling", [this.header, this.contents]);
	}
}

