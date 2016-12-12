
var wrapping_content = {
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
		m("span.flex-row", {style: "background-color:rgba(0,255,255,0.05); width:100%"}, [
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
							m("#minichart-gewicht.minichart",	m("canvas.flot-base"))
						),
						m("td",	{colspan:"1"}, 
							m("canvas#w-gewicht", {style:"width:100px"})
						)	
					])
				])
			]),
			m("fieldset.fieldset_header", {style: "width:50%"}, [
				m("legend.MOISTURE"),
				m("table", {width: "100%", border: "0"}, [
					m("tr", [1,2,3,4,5].map(function(n) {
						return m("td",	m("input.number", {name: "m"+n}))
					})), 
					m("tr", [6,7,8,9,10].map(function(n) {
						return m("td",	m("input.number", {name: "m"+n}))
					})),
					m("tr", [
						m("td",	{colspan:"5"}, m("hr"))
					]),
					m("tr", [
						m("td",	{colspan:"4"}, 
							m("#minichart-moisture.minichart",	m("canvas.flot-base"))
						),
						m("td",	{colspan:"1"}, 
							m("canvas#w-moisture", {style:"width:100px"})
						)	
					])
				])
			])
		]),
		m("span.flex-row", {style: "background-color:rgba(0,255,255,0.05)"}, 
			m("fieldset.fieldset_header", {style: "width:50%"}, [
				m("legend.WRAPPING_FINISH"),
				m("table", {width: "100%"}, [
					m("tr", [
						[	{label:"label.INCISSION", field:"incision"}, {label:"label.HEAD_EMPTY", field:"empty"} ].map(function (a) {
							return [m("td",	m(a.label)), m("td",	m("input.number", {name: a.field}))]
						})
					]),
					m("tr", [
						[	{label:"label.SEAMS", field:"seam"}, {label:"label.HOLES", field:"hole"} ].map(function (a) {
							return [m("td",	m(a.label)), m("td",	m("input.number", {name: a.field}))]
						})
					])
				])
			]),
			m("fieldset.fieldset_header", {style: "width:50%"}, [
				m("legend.WRAPPER_INTEGRITY"),
				m("table", {width: "100%"}, [
					m("tr", [
						[	{label:"label.TIGHTNESS", field:"tightness"},	{label:"label.VEIN_LINES", field:"veins"} ].map(function (a) {
							return [m("td",	m(a.label)), m("td",	m("input.number", {name: a.field}))]
						})
					]),
					m("tr", [
						[	{label:"label.CRACKS", field:"crack"}, {label:"label.SPLICES", field:"splice"} ].map(function (a) {
							return [m("td",	m(a.label)), m("td",	m("input.number", {name: a.field}))]
						})
					])
				])
			])
		),
		m("span.flex-row", {style: "background-color:rgba(0,255,255,0.05)"}, 
			m("fieldset.fieldset_header", {style: "width:50%"}, [
				m("legend.CIGAR_APPEARANCE"),
				m("table", {width: "100%"}, [
					m("tr", [
						[	{label:"label.WRAPPER_COLOR", field:"color"}, {label:"label.HEADEND", field:"headend"} ].map(function (a) {
							return [m("td",	m(a.label)), m("td",	m("input.number", {name: a.field}))]
						})
					]),
					m("tr", [
						[	{label:"label.WRAPPED_OK", field:"wrapok"},	{label:"label.CREASE", field:"crease"} ].map(function (a) {
							return [m("td",	m(a.label)), m("td",	m("input.number", {name: a.field}))]
						})
					]),
					m("tr", [
						[	{label:"label.SPOTS", field:"spot"},	{label:"label.BLOTS", field:"blot"} ].map(function (a) {
							return [m("td",	m(a.label)), m("td",	m("input.number", {name: a.field}))]
						})
					])
				])
			])
		),
		m("div.buttonrow", [
			m("input[type=button].prev", {value: " <<< ", tabindex:"-1"}),
			m("input[type=button].next", {value: " >>> ", tabindex:"-1"}),
			m("input[type=button].new", {tabindex:"-1"}),
		])
	],
	controller: function (element, isInitialized) {		// only events and initialisation
		if (isInitialized) 
			return;
		
		$("#wrapping [name=blot]").addClass("last");		// set the last field
		
		// save data
		$("#wrapping input:text").blur(function () {
			current = $.jStorage.get("handmade.current.wrapping");	
			date = $("#wrapping [name=date]").val();
			product = $("#wrapping [name=product]").val();
			field = $(this).attr('name');
			this.value = $(this).val();
			
			var sql = sprintf('UPDATE gwc_handmade.wrapping SET %s="%s" WHERE id=%s', field, this.value, current );
			$.getJSON('server/send_query.php', {query: sql}, function (data) {
				$.getJSON('server/calc_scores.php', {
					id: current, 
					table: "wrapping"
				}, function (data) {
					var spec = getSpec(product, date);
					
					$("#wrapping [name=score]").html(data.score);
					$("#wrapping [name=quality]").html(data.quality);
					
					switch(field[0]) {
						case "w": choice="gewicht";	break;
						case "m": choice="moisture";	break;
						default: return;
					}

					mini_chart("wrapping", choice, current);		// update the minichart
					colorSeries("wrapping", choice, spec);
					
					if (spec != null) { // calculate and show the cpk
						var serie = [];
						db.wrapping[choice].field.map(function (field) {
							var waarde = parseFloat($("#wrapping [name="+field+"]").val());
							if (!isNaN(waarde))
								serie.push(waarde);
						});
						var result = cpk(spec[db.wrapping[choice].spec.min], spec[db.wrapping[choice].spec.max], serie);
						gauge = document.gauges.get("w-"+choice);
						if (gauge != null) {
							gauge.value = Math.min(Math.max(result, 0), 1);
							gauge.update();
						}
					} else {	// product is not filled, so no specs
						gauge = document.gauges.get("w-"+choice);
						if (gauge != null) {
							gauge.value = 0.0;
							gauge.update();
						}
					}

					var sum = 0;	// faults total
					var allowed = 9;		// maximum allowed faults
					var fields = ["incision","seam","empty","hole","tightness","veins","crack","splice","color","headend","wrapok","crease","spot","blot"];
					fields.map(function (label) {
						var el = $("#wrapping [name="+label+"]");
						var val = el.val();
						sum += (val.trim()=="") ? 0 : parseInt(val);
					});
					fields.map(function (label) {
						setColor("#wrapping", label, Math.max(Math.min(allowed-sum+1, allowed+1), 0.1));
					});
				});
			});	
		})
		
		$("#wrapping select").on("blur", function () {
			this.current = $.jStorage.get("handmade.current.wrapping");
			this.field = $(this).attr('name');
			this.value = $(this).val();

			sql = sprintf('UPDATE gwc_handmade.wrapping SET %s="%s" WHERE id=%s', this.field, this.value, this.current );	
			$.getJSON('server/send_query.php', {	query: sql	});	
		})

		$("#wrapping textarea").blur(function () {
			this.current = $.jStorage.get("handmade.current.wrapping");	
			this.remarks = $("#wrapping [name=remarks]").val();
			
			sql = sprintf('UPDATE gwc_handmade.wrapping SET remarks="%s" WHERE id=%s', this.remarks, this.current );
			$.getJSON('server/send_query.php', {	query: sql	});			
		})
		
		$("#wrapping .new").click(function() {
			new_rec("gwc_handmade.wrapping", "#wrapping");
		})
		
		$('#wrapping .next').click(function() {
			next_rec("gwc_handmade.wrapping");
		});
	
		$('#wrapping .prev').click(function() {
			prev_rec("gwc_handmade.wrapping");
		});


	},
	view: function () {
		return m("#wrapping", [this.header, this.contents]);
	}
}

