
var specs_content = {
	contents: [
		m("span.flex-row#data_header", {style: "background-color:rgba(0,255,255,0.05)"}, 
			m("span.flex-col", [
				m("fieldset.fieldset_header", {style: "width:95%"}, [
					m("legend.SPECS"),
					m("div", {style: "height:31em; overflow:auto"}, [
						m("table", {width:"100%"},
							m("tr", [
								m("td", {width:"50%"},
									m("table", {width:"100%"}, [
										[{label:"th.NAME", field:"name"},{label:"th.SPECSNR", field:"number"}].map(function (a) {
											return m("tr", [m(a.label), m("input", {name:a.field, style:"width:15em"}) ] )
										})
									])
								),
								m("th.REMARK"),
								m("td", {rowspan:"2"}, m("textarea[name=remark]", {style: "width:18em; resize:none"})	)
							])
						),
						m("table", {width:"100%"}, [
							m("tr", m("th.REGAIN_1", {colspan:"3"})),
							m("tr", {align:"left"}, [	m("td"), m("th.MIN"), m("th.MAX")	]),
							[	{th:"th.INPUTMOIST", field1:"1_matinMoistMin", field2:"1_matinMoistMax", unit:"(%)"},
								{th:"th.OUTPUTMOIST", field1:"1_matoutMoistMin", field2:"1_matoutMoistMax", unit:"(%)"},
								{th:"th.OUTPUTTEMP", field1:"1_matoutTempMin", field2:"1_matoutTempMax", unit:"(℃)"}
							].map(function (a) {
								return m("tr", {align:"left"}, [
													m(a.th), m("td", [m("input.number[name="+a.field1+"]"), m("span", a.unit)] ), 
													m("td", [m("input.number[name="+a.field2+"]"), m("span", a.unit)] )
												])
							}),
							m("tr", {align:"left"}, [
								m("th.CHARGE_ACCUR"), m("td", {colspan:"2"}, [m("input.number[name=1_accuracy]"), m("span", "(%)")] )
							]),
							m("tr", m("th.REGAIN_2", {colspan:"3"})),
							m("tr", {align:"left"}, [	m("td"), m("th.MIN"), m("th.MAX")	]),
							[	{th:"th.INPUTMOIST", field1:"2_matinMoistMin", field2:"2_matinMoistMax", unit:"(%)"},
								{th:"th.OUTPUTMOIST", field1:"2_matoutMoistMin", field2:"2_matoutMoistMax", unit:"(%)"},
								{th:"th.OUTPUTTEMP", field1:"2_matoutTempMin", field2:"2_matoutTempMax", unit:"(℃)"}
							].map(function (a) {
								return m("tr", {align:"left"}, [
													m(a.th), m("td", [m("input.number[name="+a.field1+"]"), m("span", a.unit)] ), 
													m("td", [m("input.number[name="+a.field2+"]"), m("span", a.unit)] )
												])
							}),
							m("tr", {align:"left"}, [
								m("th.CHARGE_ACCUR"), m("td", {colspan:"2"}, [m("input.number[name=2_accuracy]"), m("span", "(%)")] )
							]),
							m("tr", m("th.STORAGE", {colspan:"3"})),
							m("tr", {align:"left"}, [	m("td"), m("th.MIN"), m("th.MAX")	]),
							[	{th:"th.STORAGETIME", field1:"storTimeMin", field2:"storTimeMax", unit:"(h)"}	].map(function (a) {
								return m("tr", {align:"left"}, [
													m(a.th), m("td", [m("input.number[name="+a.field1+"]"), m("span", a.unit)] ), 
													m("td", [m("input.number[name="+a.field2+"]"), m("span", a.unit)] )
												])
							}),
							m("tr", m("th.CUT_STRIPS", {colspan:"3"})),
							m("tr", {align:"left"}, [	m("td"), m("th.MIN"), m("th.MAX")	]),
							[	{th:"th.CUT_WIDTH", field1:"cutWidthMin", field2:"cutWidthMax", unit:"(mm)"}	].map(function (a) {
								return m("tr", {align:"left"}, [
													m(a.th), m("td", [m("input.number[name="+a.field1+"]"), m("span", a.unit)] ), 
													m("td", [m("input.number[name="+a.field2+"]"), m("span", a.unit)] )
												])
							}),
							m("tr", m("th.MOIST_HEAT", {colspan:"3"})),
							m("tr", {align:"left"}, [	m("td"), m("th.MIN"), m("th.MAX")	]),
							[	{th:"th.INPUTMOIST", field1:"cyl_matinMoistMin", field2:"cyl_matinMoistMax", unit:"(%)"},
								{th:"th.OUTPUTMOIST", field1:"cyl_matoutMoistMin", field2:"cyl_matoutMoistMax", unit:"(%)"},
								{th:"th.OUTPUTTEMP", field1:"cyl_matoutTempMin", field2:"cyl_matoutTempMax", unit:"(℃)"}
							].map(function (a) {
								return m("tr", {align:"left"}, [
													m(a.th), m("td", [m("input.number[name="+a.field1+"]"), m("span", a.unit)] ), 
													m("td", [m("input.number[name="+a.field2+"]"), m("span", a.unit)] )
												])
							}),
							m("tr", m("th.AIR_DRYING", {colspan:"3"})),
							m("tr", {align:"left"}, [	m("td"), m("th.MIN"), m("th.MAX")	]),
							[	{th:"th.OUTPUTMOIST", field1:"dry_matoutMoistMin", field2:"dry_matoutMoistMax", unit:"(%)"},
								{th:"th.OUTPUTTEMP", field1:"dry_matoutTempMin", field2:"dry_matoutTempMax", unit:"(℃)"}
							].map(function (a) {
								return m("tr", {align:"left"}, [
													m(a.th), m("td", [m("input.number[name="+a.field1+"]"), m("span", a.unit)] ), 
													m("td", [m("input.number[name="+a.field2+"]"), m("span", a.unit)] )
												])
							}),
							m("tr", m("th.BLEND_CUT", {colspan:"3"})),
							m("tr", {align:"left"}, [
									m("th.BLEND_ACCUR"), m("td", [m("span", "≤"),  m("input.number[name=blendcutAccuracy]"), m("span", "(%)")] )
							]),
							m("tr", m("th.BLEND_EXP", {colspan:"3"})),
							m("tr", {align:"left"}, [
									m("th.BLEND_ACCUR"), m("td", [m("span", "≤"),  m("input.number[name=blendexpAccuracy]"), m("span", "(%)")] )
							]),
							m("tr", m("th.BLEND_STORAGE", {colspan:"3"})),
							m("tr", {align:"left"}, [	m("td"), m("th.MIN"), m("th.MAX")	]),
							[	{th:"th.MOIST_CONTENT", field1:"blendstorMoistMin", field2:"blendstorMoistMax", unit:"(%)"}	].map(function (a) {
								return m("tr", {align:"left"}, [
													m(a.th), m("td", [m("input.number[name="+a.field1+"]"), m("span", a.unit)] ), 
													m("td", [m("input.number[name="+a.field2+"]"), m("span", a.unit)] )
												])
							}),
							m("tr", m("th.FLAVORING", {colspan:"3"})),
							m("tr", {align:"left"}, [
									m("th.FLAVORING_ACCURACY"), m("td", [m("span", "≤"),  m("input.number[name=blendflavorAccuracy]"), m("span", "(%)")] )
							]),
							m("tr", {align:"left"}, [	m("td"), m("th.MIN"), m("th.MAX")	]),
							[	{th:"th.OUTPUTMOIST", field1:"flavor_matoutMoistMin", field2:"flavor_matoutMoistMax", unit:"(%)"}	].map(function (a) {
								return m("tr", {align:"left"}, [
													m(a.th), m("td", [m("input.number[name="+a.field1+"]"), m("span", a.unit)] ), 
													m("td", [m("input.number[name="+a.field2+"]"), m("span", a.unit)] )
												])
							}),
							m("tr", m("th.ADDITIONAL_INSPECTIONS", {colspan:"3"})),
							[	{th:"th.LONG_STEMS", field:"amountLongStems"},	{th:"th.SHORT_STEMS", field:"amountShortStems"}].map(function (a) {
								return m("tr", {align:"left"}, [
													m(a.th), m("td", [m("input.number[name="+a.field+"]")] )
												])
							}),
							m("tr", {align:"left"},m("th.FILLING_POWER"), m("td", [m("input.number[name=fillingPower]"), m("span", "(cm³/g)")] ))
						])
					])

				])
			]),
			m("span.flex-col#data_header",
				m("fieldset.fieldset_header", {style: "width:95%"}, [
					m("legend.PRODUCT"),
					m("div", {style: "height:20em; overflow:auto"}, 
						m("table#products", {width: "100%"}, [
							m("thead.header", {valign: "top"}, [
								m("th", "ID"),
								m("th", m("label.PRODUCT")),
								m("th", m("label.SPECSNR"))
							]),
							m("tbody")					
						])
					),
					m("hr"),
					m("div", {style: "height:10em; overflow:auto"}, 
						m("table#history", {width: "100%"}, [
							m("thead.header", {valign: "top"}, [
								m("th", "ID"),
								m("th", m("label.START_DATE")),
								m("th", m("label.END_DATE"))
							]),
							m("tbody")					
						])
					)
				])
			)
		),
		m("div.buttonrow", [
			m("input[type=button].save", {tabindex:"-1"}),
			m("input[type=button].new", {tabindex:"-1"}),
			m("span#delete", {style: "display:none"}, [
				m("input[type=checkbox].toggle"),
				m("input[type=button].delete", {tabindex:"-1", disabled:"disabled"})
			])
		])
	],
	controller: function (element, isInitialized) {		// only events and initialisation
		if (isInitialized) 
			return;
	
		$("#specs [name=fillingPower]").addClass("last");		// set the last field
		
		// new spec
		$("#specs .new").click(function() {
			new_rec("gwc_pline.specs", "#specs");
			show_specs();
		})		
		
		// save the data
		$("#specs .save").click(function() {
			var id = $.jStorage.get("pline.current.specs");
			
			var val = {};
			fields = getFields(dbs);		// get all the field names from dbs
			fields.map(function(fieldname){
				switch (fieldname) {
					case "id":
					case "pid":	
					case "start":
					case "end": return;
				}
				val[fieldname] = $("#specs [name="+fieldname+"]").val();
			});
		
			$.getJSON('server/get_record.php', { 
				query: 'SELECT * FROM gwc_pline.specs WHERE id='+id
			}, function(data) {
				var pid = data.pid;
				if (data.pid != "-1") {		// de specs zijn al eens opgeslagen
					$.getJSON('server/send_query.php', {
						query: sprintf("UPDATE gwc_pline.specs SET end=NOW() WHERE pid=%s AND end='3000-01-01'",	pid)		// terminate the end-date
					}, function () {
						new_rec("gwc_pline.specs");
						id = $.jStorage.get("pline.current.specs");

						var sql = sprintf("UPDATE gwc_pline.specs SET pid='%s'", pid);
						$.each(val, function(field, value) {
							sql = sprintf("%s, %s='%s'", sql, field, value);
						})
						sql = sprintf("%s WHERE id=%s", sql, id);

						$.getJSON('server/send_query.php', {	query: sql	});
					});						
				} else {
					pid = data.id;
					
					var sql = sprintf("UPDATE gwc_pline.specs SET pid='%s'", pid);
					$.each(val, function(field, value) {
						sql = sprintf("%s, %s='%s'", sql, field, value);
					})
					sql = sprintf("%s WHERE id=%s", sql, id);
					$.getJSON('server/send_query.php', {	query: sql	});
				}
				
				// reload all product select-boxes with the new data
				$.get('server/get_products.php', function(data) {
					$('#data [name=product]').empty().append(data);
				});
			});
			
			$.getJSON('server/get_record.php', {		// refresh the specs in localstorage 
				query: 'SELECT * FROM gwc_pline.specs'
			}, function(data) {
				$.jStorage.set("pline.specs", data.row);
			});
			
			show_specs();
		})
		
		// select a product from the specifications list
		$('#specs #products tbody').on('click', 'td', function(e) {		
			$("#specs #products tbody tr").removeClass('row_selected');
			$(this).parent().addClass('row_selected');	// select the new row	
			
			// fill the spec history in the second list
			show_spec_history($(this).parent().find("td:first").text());
		});	
		
		// select a specification from the history
		$('#specs #history tbody').on('click', 'td', function(e) {		
			$("#specs #history tbody tr").removeClass('row_selected');
			$(this).parent().addClass('row_selected');	// select the new row	
			
			// display all the details of the selected specification
			show_spec_details($(this).parent().find("td:first").text());
		});	
		
		// enable/disable the delete button
		$('#specs .toggle').on('click', function(e) {		
			var state = $(this).prop('checked');
			if (state)
				$('#specs .delete').removeAttr('disabled');	
			else
				$('#specs .delete').attr('disabled', 'disabled');
		});	
		
		// delete a product (and its history)
		$('#specs .delete').on('click', function(e) {		
			var id = $("#specs #products .row_selected").parent().find("td:first").text();

			$.getJSON('server/get_record.php', {
				query: "SELECT pid FROM gwc_handmade.specs WHERE id="+id		
			}, function (data) {
				if (data.pid == -1) {
					var sql = "DELETE FROM gwc_handmade.specs WHERE id="+id
				} else {
					var sql = "DELETE FROM gwc_handmade.specs WHERE pid="+data.pid;
				}
				$.getJSON('server/send_query.php', {
					query: sql
				}, function () {
					$('#specs .delete').attr('disabled', 'disabled');
					show_specs();
				});
			});	
		});	
		
	},
	view: function () {
		return m("#specs", this.contents);
	}
}

