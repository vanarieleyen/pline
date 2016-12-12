
var sleevedefects_content = {
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
						[	{label:"label.JOBNR", field:"bjob"}, {label:"label.DETERMINATION", field:"judge"} ].map(function (a) {
							return [m("td",	m(a.label)), m("td",	m("input.number", {name: a.field}))]
						}),
						m("td",	m("label.REMARK")),
						m("td",	m("textarea", {style: "height:1.5em; width:20em; resize:none", name: "bremarks"})),
						m("td", {colspan: "2"})
					])
				]),
				m("table", {width: "100%"}, [
					m('tr', [
						m("td",	m("fieldset.fieldset_header", [
								m("legend.SLEEVE_QUALITY"),
								m("table", {width: "100%"}, [1,2,3].map(function(n) {
									return m('tr', m("td", [m("select", {name: "bsd"+n}), m("span", " "), m("input.number", {name: "bsd"+n+"_nr"}) ])	)
								}))
							])
						),
						m("td",	m("fieldset.fieldset_header", [
								m("legend.BOX_QUALITY"),
								m("table", {width: "100%"}, [1,2,3].map(function(n) {
									return m('tr', m("td", [m("select", {name: "bb"+n}), m("span", " "), m("input.number", {name: "bb"+n+"_nr"}) ])	)
								}))
							])
						),
						m("td",	m("fieldset.fieldset_header", [
								m("legend.PACKING_MARK"),
								m("table", {width: "100%"}, [1,2,3].map(function(n) {
									return m('tr', m("td", [m("select", {name: "bm"+n}), m("span", " "), m("input.number", {name: "bm"+n+"_nr"}) ])	)
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

		$("#boxDefects [name=bm3_nr]").addClass("last");		// set the last field
		
		// save data
		$("#boxDefects input:text").blur(function () {
			this.current = $.jStorage.get("handmade.current.boxDefects");	
			this.field = $(this).attr('name');
			this.value = $(this).val();
			
			sql = sprintf('UPDATE gwc_handmade.boxDefects SET %s="%s" WHERE id=%s', this.field, this.value, this.current );
			$.getJSON('server/send_query.php', {	
				query: sql	
			}, function () {		// color the fields
				var sum = 0;
				var allowed = 6;		// maximum allowed faults
				var fields = ["sleeveAmount","boxAmount","packAmount"];
				fields.map(function(label){
					db.boxDefects[label].field.map(function(field) {
						var el = $("#boxDefects [name="+field+"]");
						var val = el.val();
						sum += (val.trim()=="") ? 0 : parseInt(val);
					});
				});
				fields.map(function(label){
					db.boxDefects[label].field.map(function(field) {
						setColor("#boxDefects", field, Math.max(Math.min(allowed-sum+1, allowed+1), 0.1));
					});
				});
			});	
		})

		$("#boxDefects textarea").blur(function () {
			this.current = $.jStorage.get("handmade.current.boxDefects");	
			this.remarks = $("#boxDefects [name=remarks]").val();
			
			sql = sprintf('UPDATE gwc_handmade.boxDefects SET remarks="%s" WHERE id=%s', this.remarks, this.current );
			$.getJSON('server/send_query.php', {	query: sql	});			
		})
		
		$("#boxDefects select").on("blur", function () {
			this.current = $.jStorage.get("handmade.current.boxDefects");
			this.field = $(this).attr('name');
			this.value = $(this).val();

			sql = sprintf('UPDATE gwc_handmade.boxDefects SET %s="%s" WHERE id=%s', this.field, this.value, this.current );	
			$.getJSON('server/send_query.php', {	query: sql	});	
		});
		
		$("#boxDefects .new").click(function() {
			new_rec("gwc_handmade.boxDefects", "#defects");
		})
	
		$('#boxDefects .next').click(function() {
			next_rec("gwc_handmade.boxDefects");
		});
	
		$('#boxDefects .prev').click(function() {
			prev_rec("gwc_handmade.boxDefects");
		});		

	},
	view: function () {
		return m("#boxDefects", [this.header, this.contents]);
	}
}

