
var stickdefects_content = {
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
									{label:"label.SAMPLING_FREQ", soort:"input", field:"sample"}
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
								m("tr", [
									m("td",	m("label.INSPECTOR")),
									m("td",	m("select[name=inspector]"))
								]),
								m("tr", [
									m("td",	m("label.REMARK")),
									m("td",	m("textarea", {style: "height:3em; width:15em; resize:none", name: "remarks"}))
								])
							])						
						),
						m("td", {valign: "top"},
							m("table", {width: "100%"}, 
								m("tr", [	
									m("td",	m("label.SCORE")),	
									m("td",	m("div[name=score]", "--"))	
								])
							)
						)					
					])
				)
			])			
		)
	],
	contents: [
		m("span.flex-col#data_length", {style: "background-color:rgba(0,255,255,0.05)"}, 
			m("fieldset.fieldset_header", {style: "width:97%"}, [
				m("legend.DEFECTS"),
				m("table", {width: "100%"}, [
					m('tr', [
						[	{label:"label.JOBNR", field:"sjob"}, {label:"label.DETERMINATION", field:"judge"} ].map(function (a) {
							return [m("td",	m(a.label)), m("td",	m("input.number", {name: a.field}))]
						}),
						m("td",	m("label.REMARK")),
						m("td",	m("textarea", {style: "height:1.5em; width:20em; resize:none", name: "sremarks"})),
						m("td", {colspan: "2"})
					])
				]),
				m("table", {width: "100%"}, [
					m('tr', [
						m("td",	m("fieldset.fieldset_header", [
								m("legend.RING"),
								m("table", {width: "100%"}, [1,2,3].map(function(n) {
									return m('tr', m("td", [m("select", {name: "srd"+n}), m("span", " "), m("input.number", {name: "srd"+n+"_nr"}) ])	)
								}))
							])
						),
						m("td",	m("fieldset.fieldset_header", [
								m("legend.CELLOPHANE"),
								m("table", {width: "100%"}, [1,2,3].map(function(n) {
									return m('tr', m("td", [m("select", {name: "scd"+n}), m("span", " "), m("input.number", {name: "scd"+n+"_nr"}) ])	)
								}))
							])
						),
						m("td",	m("fieldset.fieldset_header", [
								m("legend.CIGAR_SET"),
								m("table", {width: "100%"}, [1,2,3].map(function(n) {
									return m('tr', m("td", [m("select", {name: "ssd"+n}), m("span", " "), m("input.number", {name: "ssd"+n+"_nr"}) ])	)
								}))
							])
						),
						m("td",	m("fieldset.fieldset_header", [
								m("legend.PACKING_MARK"),
								m("table", {width: "100%"}, [1,2,3].map(function(n) {
									return m('tr', m("td", [m("select", {name: "spd"+n}), m("span", " "), m("input.number", {name: "spd"+n+"_nr"}) ])	)
								}))
							])
						)
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
			
		$("#stickDefects [name=spd3_nr]").addClass("last");		// set the last field

		// save data
		$("#stickDefects input:text").blur(function () {
			this.current = $.jStorage.get("handmade.current.stickDefects");	
			this.field = $(this).attr('name');
			this.value = $(this).val();
			
			sql = sprintf('UPDATE gwc_handmade.stickDefects SET %s="%s" WHERE id=%s', this.field, this.value, this.current );
			$.getJSON('server/send_query.php', {	
				query: sql	
			}, function () {	// color the fields
				var sum = 0;
				var allowed = 6;		// maximum allowed faults
				var fields = ["ringAmount","cellAmount","setAmount","packAmount"];
				fields.map(function(label){
					db.stickDefects[label].field.map(function(field) {
						var el = $("#stickDefects [name="+field+"]");
						var val = el.val();
						sum += (val.trim()=="") ? 0 : parseInt(val);
					});
				});
				fields.map(function(label){
					db.stickDefects[label].field.map(function(field) {
						setColor("#stickDefects", field, Math.max(Math.min(allowed-sum+1, allowed+1), 0.1));
					});
				});
			});			
		})

		$("#stickDefects textarea").blur(function () {
			this.current = $.jStorage.get("handmade.current.stickDefects");	
			this.remarks = $("#stickDefects [name=remarks]").val();
			
			sql = sprintf('UPDATE gwc_handmade.stickDefects SET remarks="%s" WHERE id=%s', this.remarks, this.current );
			$.getJSON('server/send_query.php', {	query: sql	});			
		})
		
		$("#stickDefects select").on("blur", function () {
			this.current = $.jStorage.get("handmade.current.stickDefects");
			this.field = $(this).attr('name');
			this.value = $(this).val();

			sql = sprintf('UPDATE gwc_handmade.stickDefects SET %s="%s" WHERE id=%s', this.field, this.value, this.current );	
			$.getJSON('server/send_query.php', {	query: sql	});	
		});
		
		$("#stickDefects .new").click(function() {
			new_rec("gwc_handmade.stickDefects", "#stickDefects");
		})
	
		$('#stickDefects .next').click(function() {
			next_rec("gwc_handmade.stickDefects");
		});
	
		$('#stickDefects .prev').click(function() {
			prev_rec("gwc_handmade.stickDefects");
		});		

	},
	view: function () {
		return m("#stickDefects", [this.header, this.contents]);
	}
}

