
var specs_content = {
	contents: [
		m("span.flex-row#data_header", {style: "background-color:rgba(0,255,255,0.05)"}, 
			m("span.flex-col", [
				m("fieldset.fieldset_header", {style: "width:95%"}, [
					m("legend.PRODUCT"),
					m("table", {width: "100%"}, [
						[ {label:"label.NAME", field:"name"}, {label:"label.PRODNR", field:"nr"} ].map(function (a) {
							return m("tr", [
											m("td",	m(a.label)),
											m("td",	m("input[type=text]", {name: a.field, style:"width:20em"}))
										])
						})
					])
				]),
				m("fieldset.fieldset_header", {style: "width:95%"}, [
					m("legend.ROLLING_PROCESS"),						
					m("table", {width: "100%"}, [
						m("tr", {align: "center"}, [
							m("td",	m("label.LENGTH")),
							m("td",	m("input[type=text].number", {name: "rol_l_min"})),
							m("td",	 m("hr")),
							m("td",	m("input[type=text].number", {name: "rol_l_max"}))
						]),
						m("tr", {align: "center"}, [
							m("td",	m("label.CIRCUMFERENCE")),
							m("td",	m("input[type=text].number", {name: "rol_c_min"})),
							m("td",	 m("hr")),
							m("td",	m("input[type=text].number", {name: "rol_c_max"}))
						]),
						m("tr", {align: "center"}, [
							m("td",	m("label.WEIGHT")),
							m("td",	m("input[type=text].number", {name: "rol_w_min"})),
							m("td",	 m("hr")),
							m("td",	m("input[type=text].number", {name: "rol_w_max"}))
						]),
						m("tr", {align: "center"}, [
							m("td",	m("label.PRESSUREDROP")),
							m("td",	m("input[type=text].number", {name: "rol_p_min"})),
							m("td",	 m("hr")),
							m("td",	m("input[type=text].number", {name: "rol_p_max"}))
						]),
						m("tr", {align: "center"}, [
							m("td",	m("label.BLEND_ACC")),
							m("td",	m("input[type=text].number", {name: "rol_blendacc_min"})),
							m("td",	 m("hr")),
							m("td",	m("input[type=text].number", {name: "rol_blendacc_max"}))
						]),
						m("tr", {align: "center"}, [
							m("td",	m("label.PD_ACC")),
							m("td",	m("input[type=text].number", {name: "rol_pdacc_min"})),
							m("td",	 m("hr")),
							m("td",	m("input[type=text].number", {name: "rol_pdacc_max"}))
						]),
						[	
							{label:"label.SURFACE_OUT", field:"rol_surfout"},	
							{label:"label.TIGHTNESS_OUT", field:"rol_tightout"}
						].map(function (a) {
							return m("tr",  {align: "center"}, [
											m("td",	m(a.label)),
											m("td",	{colspan: "3"}, m("input[type=text].number", {name: a.field}))
										])
						})
					])
				]),
				m("fieldset.fieldset_header", {style: "width:95%"}, [
					m("legend.WRAPPING_PROCESS"),
					m("table", {width: "100%"}, [
						m("tr", {align: "center"}, [
							m("td",	m("label.WEIGHT")),
							m("td",	m("input[type=text].number", {name: "weight_w_min"})),
							m("td",	 m("hr")),
							m("td",	m("input[type=text].number", {name: "weight_w_max"}))
						]),
						m("tr", {align: "center"}, [
							m("td",	m("label.MOISTURE")),
							m("td",	m("input[type=text].number", {name: "moist_w_min"})),
							m("td",	 m("hr")),
							m("td",	m("input[type=text].number", {name: "moist_w_max"}))
						])
					])
				]),
				m("fieldset.fieldset_header", {style: "width:95%"}, [
					m("legend.MACHINE_CUTTING"),
					m("div", {style: "height: 4em"})
				]),
				m("fieldset.fieldset_header", {style: "width:95%"}, [
					m("legend.STORAGE_PROCESS"),
					m("div"),
					m("table", {width: "100%"}, [
						m("tr", {align: "center"}, [
							m("td",	m("label.MOISTURE")),
							m("td",	m("input[type=text].number", {name: "moist_s_min"})),
							m("td",	 m("hr")),
							m("td",	m("input[type=text].number", {name: "moist_s_max"}))
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
	
		$("#specs [name=moist_s_max]").addClass("last");		// set the last field
		
		// new spec
		$("#specs .new").click(function() {
			new_rec("gwc_handmade.specs", "#specs");
			show_specs();
		})		
		
		// save the data
		$("#specs .save").click(function() {
			var id = $.jStorage.get("handmade.current.specs");
			
			var name = $("#specs [name=name]").val();
			var nr = $("#specs [name=nr]").val();
			var rol_l_min = $("#specs [name=rol_l_min]").val();
			var rol_l_max = $("#specs [name=rol_l_max]").val();
			var rol_c_min = $("#specs [name=rol_c_min]").val();
			var rol_c_max = $("#specs [name=rol_c_max]").val();
			var rol_w_min = $("#specs [name=rol_w_min]").val();
			var rol_w_max = $("#specs [name=rol_w_max]").val();
			var rol_p_min = $("#specs [name=rol_p_min]").val();
			var rol_p_max = $("#specs [name=rol_p_max]").val();
			var moist_s_min = $("#specs [name=moist_s_min]").val();
			var moist_s_max = $("#specs [name=moist_s_max]").val();
			var rol_blendacc_min = $("#specs [name=rol_blendacc_min]").val();
			var rol_blendacc_max = $("#specs [name=rol_blendacc_max]").val();
			var rol_pdacc_min = $("#specs [name=rol_pdacc_min]").val();
			var rol_pdacc_max = $("#specs [name=rol_pdacc_max]").val();
			var rol_surfout = $("#specs [name=rol_surfout]").val();
			var rol_tightout = $("#specs [name=rol_tightout]").val();
			var moist_w_min = $("#specs [name=moist_w_min]").val();
			var moist_w_max = $("#specs [name=moist_w_max]").val();
			var weight_w_min = $("#specs [name=weight_w_min]").val();
			var weight_w_max = $("#specs [name=weight_w_max]").val();
		
			$.getJSON('server/get_record.php', { 
				query: 'SELECT * FROM gwc_handmade.specs WHERE id='+id
			}, function(data) {
				var pid = data.pid;
				if (data.pid != "-1") {		// de specs zijn al eens opgeslagen
					//console.log("add new record");
					$.getJSON('server/send_query.php', {
						query: sprintf("UPDATE gwc_handmade.specs SET end=NOW() WHERE pid=%s AND end='3000-01-01'",	pid)		// terminate the end-date	
					}, function () {
						new_rec("gwc_handmade.specs", "#specs");
						id = $.jStorage.get("handmade.current.specs");
						
						var sql = sprintf("UPDATE gwc_handmade.specs SET pid='%s', name='%s', nr='%s', rol_l_min='%s', rol_l_max='%s', rol_c_min='%s', rol_c_max='%s', \
							rol_w_min='%s', rol_w_max='%s', moist_s_min='%s', moist_s_max='%s', rol_surfout='%s', rol_tightout='%s', rol_p_min='%s', rol_p_max='%s', \
							rol_blendacc_min='%s', rol_blendacc_max='%s', rol_pdacc_min='%s', rol_pdacc_max='%s', \
							moist_w_min='%s', moist_w_max='%s', weight_w_min='%s', weight_w_max='%s' WHERE id=%s",	
							pid, name, nr, rol_l_min, rol_l_max, rol_c_min, rol_c_max, rol_w_min, rol_w_max, moist_s_min, moist_s_max, rol_surfout, rol_tightout, 
							rol_p_min, rol_p_max, rol_blendacc_min, rol_blendacc_max, rol_pdacc_min, rol_pdacc_max, moist_w_min, moist_w_max, weight_w_min, weight_w_max, id);
						$.getJSON('server/send_query.php', {	query: sql	});
					});						
				} else {
					//console.log("update existing record");
					pid = data.id;
					
					var sql = sprintf("UPDATE gwc_handmade.specs SET pid='%s', name='%s', nr='%s', rol_l_min='%s', rol_l_max='%s', rol_c_min='%s', rol_c_max='%s', \
						rol_w_min='%s', rol_w_max='%s', moist_s_min='%s', moist_s_max='%s', rol_surfout='%s', rol_tightout='%s', rol_p_min='%s', rol_p_max='%s', \
						rol_blendacc_min='%s', rol_blendacc_max='%s', rol_pdacc_min='%s', rol_pdacc_max='%s', \
						moist_w_min='%s', moist_w_max='%s', weight_w_min='%s', weight_w_max='%s' WHERE id=%s",	
						pid, name, nr, rol_l_min, rol_l_max, rol_c_min, rol_c_max, rol_w_min, rol_w_max, moist_s_min, moist_s_max, rol_surfout, rol_tightout, 
						rol_p_min, rol_p_max, rol_blendacc_min, rol_blendacc_max, rol_pdacc_min, rol_pdacc_max, moist_w_min, moist_w_max, weight_w_min, weight_w_max, id);
					$.getJSON('server/send_query.php', {	query: sql	});
				}
				
				// reload all product select-boxes with the new data
				$.get('server/get_products.php', function(data) {
					Array("#stickDefects","packDefects","#boxDefects","#rolling","#wrapping","#cutting","#storage").map(function(element){
						$(element+' [name=product]').empty().append(data);
					});
				});
			});
			
			$.getJSON('server/get_record.php', {		// refresh the specs in localstorage 
				query: 'SELECT * FROM gwc_handmade.specs'
			}, function(data) {
				$.jStorage.set("handmade.specs", data.row);
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

