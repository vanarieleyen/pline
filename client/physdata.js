
	
var physdata_content = {
	contents: [
		m("span.flex-row", {style: "background-color:rgba(0,255,255,0)"}, [	
			m("span.flex-col", {style: "background-color:rgba(0,255,255,0.05)"},
				m("fieldset", [
					m("legend.MAT_INPUT"),
					m("table", m("tr", [
						m("td.MATERIAL"),	m("td", {colspan: "2"}, m("select[name=rawMatOK]"))
					]))
				]),
				m("fieldset", [
					m("legend.REGAIN_1"),
					m("table", [
						m("tr", [
							m("td",[m("label.INPUTMOIST"), m("span", "(%)")]), ["1_matinMoistA","1_matinMoistB"].map(function(field) {
								return m("td", m("input.number", {name:field}))
							})
						]),
						m("tr", [
							m("td.MOISTSTAT"), m("td", {colspan:"2"}, m("select[name=1_moistOK]"))
						]),
						m("tr", [
							m("td",[m("label.OUTPUTMOIST"), m("span", "(%)")]), ["1_matoutMoistA","1_matoutMoistB"].map(function(field) {
								return m("td", m("input.number", {name:field}))
							})
						]),
						m("tr", [
							m("td",[m("label.OUTPUTTEMP"), m("span", "(°C)")]), ["1_matoutTempA","1_matoutTempB"].map(function(field) {
								return m("td", m("input.number", {name:field}))
							})
						]),
						m("tr", [
							m("td",[m("label.CHARGE_ACCUR"), m("span", "(%)")]), m("td", {colspan:"2"}, m("input.number[name=1_accuracy]"))
						])
					])
				]),
				m("fieldset", [
					m("legend.REGAIN_2"),
					m("table", [
						m("tr", [
							m("td",[m("label.INPUTMOIST"), m("span", "(%)")]), ["2_matinMoistA","2_matinMoistB"].map(function(field) {
								return m("td", m("input.number", {name:field}))
							})
						]),
						m("tr", [
							m("td.MOISTSTAT"), m("td", {colspan:"2"}, m("select[name=2_moistOK]"))
						]),
						m("tr", [
							m("td",[m("label.OUTPUTMOIST"), m("span", "(%)")]), ["2_matoutMoistA","2_matoutMoistB"].map(function(field) {
								return m("td", m("input.number", {name:field}))
							})
						]),
						m("tr", [
							m("td",[m("label.OUTPUTTEMP"), m("span", "(°C)")]), ["2_matoutTempA","2_matoutTempB"].map(function(field) {
								return m("td", m("input.number", {name:field}))
							})
						]),
						m("tr", [
							m("td",[m("label.CHARGE_ACCUR"), m("span", "(%)")]), m("td", {colspan:"2"}, m("input.number[name=2_accuracy]"))
						])
					])
				])
			),
			m("span.flex-col", {style: "background-color:rgba(0,255,255,0.05)"}, [
				m("fieldset", [
					m("legend.STORAGE"),
					m("table", [
						m("tr", [m("td",[m("label.STORAGETIME"), m("span", "(h)")]), m("td", m("input.number[name=storageTime]")) ]),
						m("tr", [m("td.MATERIAL"),	m("td", {colspan: "2"}, m("select[name=rawMatOK]"))])	
					])
				]),
				m("fieldset", [
					m("legend.CUT_STRIPS"),
					m("table", [
						m("tr", m("td",[m("label.CUT_WIDTH"), m("span", "(mm)")]), m("input.number[name=cutWidth]")	)
					])
				]),
				m("fieldset", [
					m("legend.MOIST_HEAT"),
					m("table", [
						m("tr", [
							m("td",[m("label.INPUTMOIST"), m("span", "(%)")]), ["cyl_matinMoistA","cyl_matinMoistB"].map(function(field) {
								return m("td", m("input.number", {name:field}))
							})
						]),
						m("tr", [
							m("td",[m("label.OUTPUTMOIST"), m("span", "(%)")]), ["cyl_matoutMoistA","cyl_matoutMoistB"].map(function(field) {
								return m("td", m("input.number", {name:field}))
							})
						]),
						m("tr", [
							m("td",[m("label.OUTPUTTEMP"), m("span", "(°C)")]), ["cyl_matoutTempA","cyl_matoutTempB"].map(function(field) {
								return m("td", m("input.number", {name:field}))
							})
						])
					])
				]),
				m("fieldset", [
					m("legend.AIR_DRYING"),
					m("table", [
						m("tr", [
							m("td",[m("label.OUTPUTMOIST"), m("span", "(%)")]), ["dry_matoutMoistA","dry_matoutMoistB"].map(function(field) {
								return m("td", m("input.number", {name:field}))
							})
						]),
						m("tr", [
							m("td",[m("label.OUTPUTTEMP"), m("span", "(°C)")]), ["dry_matoutTempA","dry_matoutTempB"].map(function(field) {
								return m("td", m("input.number", {name:field}))
							})
						])
					])
				]),
				m("fieldset", [
					m("legend.FLAVORING"),
					m("table", [
						m("tr", [
							m("td", {colspan:"2"}, [m("label.MATERIAL"),  m("select[name=flavorOK]")]),
							m("td", {colspan:"3"}, [m("label.FLAVORING_ACCURACY"), m("input.number[name=flavorAccuracy]")])
						]),
						m("tr", [
							m("td",[m("label.OUTPUTMOIST"), m("span", "(%)")]), ["flavor_matoutMoistA","flavor_matoutMoistB","flavor_matoutMoistC","flavor_matoutMoistD"].map(function(field) {
								return m("td", m("input.number", {name:field}))
							})
						])
					])
				])
			]),
			m("span.flex-col", {style: "background-color:rgba(0,255,255,0.05)"}, [
				m("fieldset", [
					m("legend.BLEND_CUT"),
					m("table", [
						m("tr", [
							m("td", {colspan:"2"}, [m("label.MATERIAL"),  m("select[name=blendcutMatOK]")]),
							m("td",[m("label.BLEND_ACCUR"), m("span", "(%)")]), 
							m("td", m("input.number[name=blendcutAccuracy]"))
						])
					])
				]),
				m("fieldset", [
					m("legend.BLEND_EXP"),
					m("table", [
						m("tr", [
							m("td", {colspan:"2"}, [m("label.MATERIAL"),  m("select[name=blendexpMatOK]")]),
							m("td",[m("label.BLEND_ACCUR"), m("span", "(%)")]), 
							m("td", m("input.number[name=blendexpAccuracy]"))
						])
					])
				]),
				m("fieldset", [
					m("legend.BLEND_RECYCLED"),
					m("table", [
						m("tr", [
							m("td.BLEND_RECYCLED_NR"), m("td", m("input.number[name=blendreID]")),
							m("td.BLEND_RECYCLED_OK"),  m("td", {colspan:"2"}, m("select[name=blendreOK]"))
						])
					])
				]),
				m("fieldset", [
					m("legend.BLEND_STORAGE"),
					m("table", [
						m("tr", [
							m("td", {colspan:"5"}, [m("label.MATERIAL"),  m("select[name=blendstorMix]")])
						]),
						m("tr", [
							m("td",[m("label.MOIST_CONTENT"), m("span", "(%)")]), 
							["blendstorMoistA","blendstorMoistB","blendstorMoistC","blendstorMoistD"].map(function(field) {
								return m("td", m("input.number", {name:field}))
							})
						])
					])
				]),
				m("fieldset", [
					m("legend.ADDITIONAL_INSPECTIONS"),
					m("table", [
						m("tr", [m("td.LONG_STEMS"), m("td", m("input.number[name=amountLongStems]"))]),
						m("tr", [m("td.SHORT_STEMS"), m("td", m("input.number[name=amountShortStems]"))]),
						m("tr", [
							m("td", [m("label.FILLING_POWER"), m("span", "(cm³/g)")]), 
							m("td", m("input.number[name=fillingPower]"))
						])
					])
				]),
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
		
		$("#physdata [name=fillingPower]").addClass("last");		// set the last field

		$("#physdata .new").click(function() {
			new_rec("gwc_pline.inspection");
		})
		
		$('#physdata .next').click(function() {
			next_rec("gwc_pline.inspection");
		});
	
		$('#physdata .prev').click(function() {
			prev_rec("gwc_pline.inspection");
		});		
		
			// update database after input is changed 
		$("#physdata input:text").blur(function () {
			var current = $.jStorage.get("pline.current");
			var field = $(this).attr('name');
			var value = $(this).val();
			sql = sprintf('UPDATE gwc_pline.inspection SET %s="%s" WHERE id=%s', field, value, current );
			$.getJSON('server/send_query.php', {query: sql}, function (data) {
				$.getJSON('server/calc_penalties.php', {id: current});
			});
			show_data("inspection");
		});
		
		$("#physdata select").blur(function () {
			var current = $.jStorage.get("pline.current");
			var field = $(this).attr('name');
			var value = $(this).val();
			sql = sprintf('UPDATE gwc_pline.inspection SET %s="%s" WHERE id=%s', field, value, current );	
			$.getJSON('server/send_query.php', {query: sql}, function (data) {
				$.getJSON('server/calc_penalties.php', {id: current});
			});
			show_data("inspection");
		});
		

		
	},
	view: function () {
		return m("#physdata", {style: "background-color:rgba(0,255,255,0)"},  this.contents);
	}
}