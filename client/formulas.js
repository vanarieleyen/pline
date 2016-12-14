
var formulas_content = {
	header: [
		m("span.flex-row#data_header", {style: "background-color:rgba(0,255,255,0.05)"}, 
			m("fieldset.fieldset_header", {style: "width:35%"}, [
				m("legend", "Cell"),
				m("div", {style: "height:35em; overflow-y:auto"},
					m("table", {width: "100%"}, [
						m("tr", [	m("td", {width: "20%"}, m("", "A1")),	m("td", m("label.RAWMATOK" )) ]),
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.REGAIN_1")) ),
						m("tr", [ m("td", {width: "20%"}, m("", "A2")),	m("td", [m("span.MAXSPECS"), m("span", ": "), m("label.INPUTMOIST" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A3")),	m("td", [m("span.MINSPECS"), m("span", ": "), m("label.INPUTMOIST" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A4")),	m("td", [m("label.INPUTMOIST" ), m("span", " (1)") ]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A5")),	m("td", [m("label.INPUTMOIST" ), m("span", " (2)") ]) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A6")),	m("td", m("label.MOISTSTAT" )) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A7")),	m("td", [m("label.OUTPUTMOIST" ), m("span", " (1)") ]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A8")),	m("td", [m("span.MINSPECS"), m("span", ": "), m("label.OUTPUTMOIST" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A9")),	m("td", [m("span.MAXSPECS"), m("span", ": "), m("label.OUTPUTMOIST" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A10")),	m("td", [m("label.OUTPUTMOIST" ), m("span", " (2)") ]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A11")),	m("td", [m("label.OUTPUTTEMP" ), m("span", " (1)") ]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A12")),	m("td", [m("span.MINSPECS"), m("span", ": "), m("label.OUTPUTTEMP" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A13")),	m("td", [m("span.MAXSPECS"), m("span", ": "), m("label.OUTPUTTEMP" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A14")),	m("td", [m("label.OUTPUTTEMP" ), m("span", " (2)") ]) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A15")),	m("td", m("label.CHARGE_ACCUR" )) ]),
						
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.REGAIN_2")) ),
						m("tr", [ m("td", {width: "20%"}, m("", "A16")),	m("td", [m("label.INPUTMOIST" ), m("span", " (1)") ]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A17")),	m("td", [m("span.MINSPECS"), m("span", ": "), m("label.INPUTMOIST" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A18")),	m("td", [m("span.MAXSPECS"), m("span", ": "), m("label.INPUTMOIST" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A19")),	m("td", [m("label.INPUTMOIST" ), m("span", " (2)") ]) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A20")),	m("td", m("label.MOISTSTAT" )) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A21")),	m("td", [m("label.OUTPUTMOIST" ), m("span", " (1)") ]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A22")),	m("td", [m("span.MINSPECS"), m("span", ": "), m("label.OUTPUTMOIST" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A23")),	m("td", [m("span.MAXSPECS"), m("span", ": "), m("label.OUTPUTMOIST" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A24")),	m("td", [m("label.OUTPUTMOIST" ), m("span", " (2)") ]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A25")),	m("td", [m("label.OUTPUTTEMP" ), m("span", " (1)") ]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A26")),	m("td", [m("span.MINSPECS"), m("span", ": "), m("label.OUTPUTTEMP" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A27")),	m("td", [m("span.MAXSPECS"), m("span", ": "), m("label.OUTPUTTEMP" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A28")),	m("td", [m("label.OUTPUTTEMP" ), m("span", " (2)") ]) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A29")),	m("td", m("label.CHARGE_ACCUR" )) ]),						
						
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.STORAGE")) ),
						m("tr", [	m("td", {width: "20%"}, m("", "A30")),	m("td", m("label.STORAGETIME" )) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A31")),	m("td", [m("span.MINSPECS"), m("span", ": "), m("label.STORAGETIME" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A32")),	m("td", [m("span.MAXSPECS"), m("span", ": "), m("label.STORAGETIME" )]) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A33")),	m("td", m("label.MATERIAL" )) ]),
						
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.CUT_STRIPS")) ),
						m("tr", [	m("td", {width: "20%"}, m("", "A34")),	m("td", m("label.CUT_WIDTH" )) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A35")),	m("td", [m("span.MINSPECS"), m("span", ": "), m("label.CUT_WIDTH" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A36")),	m("td", [m("span.MAXSPECS"), m("span", ": "), m("label.CUT_WIDTH" )]) ]),

						m("tr", m("td[colspan=2]", {align:"center"}, m("label.MOIST_HEAT")) ),
						m("tr", [ m("td", {width: "20%"}, m("", "A37")),	m("td", [m("label.INPUTMOIST" ), m("span", " (1)") ]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A38")),	m("td", [m("span.MINSPECS"), m("span", ": "), m("label.INPUTMOIST" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A39")),	m("td", [m("span.MAXSPECS"), m("span", ": "), m("label.INPUTMOIST" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A40")),	m("td", [m("label.INPUTMOIST" ), m("span", " (2)") ]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A41")),	m("td", [m("label.OUTPUTMOIST" ), m("span", " (1)") ]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A42")),	m("td", [m("span.MINSPECS"), m("span", ": "), m("label.OUTPUTMOIST" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A43")),	m("td", [m("span.MAXSPECS"), m("span", ": "), m("label.OUTPUTMOIST" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A44")),	m("td", [m("label.OUTPUTMOIST" ), m("span", " (2)") ]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A45")),	m("td", [m("label.OUTPUTTEMP" ), m("span", " (1)") ]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A46")),	m("td", [m("span.MINSPECS"), m("span", ": "), m("label.OUTPUTTEMP" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A47")),	m("td", [m("span.MAXSPECS"), m("span", ": "), m("label.OUTPUTTEMP" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A48")),	m("td", [m("label.OUTPUTTEMP" ), m("span", " (2)") ]) ]),
	
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.AIR_DRYING")) ),
						m("tr", [ m("td", {width: "20%"}, m("", "A49")),	m("td", [m("label.OUTPUTMOIST" ), m("span", " (1)") ]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A50")),	m("td", [m("span.MINSPECS"), m("span", ": "), m("label.OUTPUTMOIST" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A51")),	m("td", [m("span.MAXSPECS"), m("span", ": "), m("label.OUTPUTMOIST" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A52")),	m("td", [m("label.OUTPUTMOIST" ), m("span", " (2)") ]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A53")),	m("td", [m("label.OUTPUTTEMP" ), m("span", " (1)") ]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A54")),	m("td", [m("span.MINSPECS"), m("span", ": "), m("label.OUTPUTTEMP" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A55")),	m("td", [m("span.MAXSPECS"), m("span", ": "), m("label.OUTPUTTEMP" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A56")),	m("td", [m("label.OUTPUTTEMP" ), m("span", " (2)") ]) ]),
						
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.BLEND_CUT")) ),
						m("tr", [	m("td", {width: "20%"}, m("", "A57")),	m("td", m("label.MATERIAL" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A58")),	m("td", m("label.BLEND_ACCUR" )) ]),
						
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.BLEND_EXP")) ),
						m("tr", [	m("td", {width: "20%"}, m("", "A59")),	m("td", m("label.MATERIAL" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A60")),	m("td", m("label.BLEND_ACCUR" )) ]),
						
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.BLEND_RECYCLED")) ),
						m("tr", [	m("td", {width: "20%"}, m("", "A61")),	m("td", m("label.MATERIAL" )) ]),
						
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.FLAVORING")) ),
						m("tr", [	m("td", {width: "20%"}, m("", "A62")),	m("td", m("label.MATERIAL" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A63")),	m("td", m("label.FLAVORING_ACCURACY" )) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A64")),	m("td", [m("label.OUTPUTMOIST" ), m("span", " (1)") ]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A65")),	m("td", [m("span.MINSPECS"), m("span", ": "), m("label.OUTPUTMOIST" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A66")),	m("td", [m("span.MAXSPECS"), m("span", ": "), m("label.OUTPUTMOIST" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A67")),	m("td", [m("label.OUTPUTMOIST" ), m("span", " (2)") ]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A68")),	m("td", [m("label.OUTPUTMOIST" ), m("span", " (3)") ]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A69")),	m("td", [m("label.OUTPUTMOIST" ), m("span", " (4)") ]) ]),
						
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.BLEND_STORAGE")) ),
						m("tr", [	m("td", {width: "20%"}, m("", "A70")),	m("td", m("label.MATERIAL" )) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A71")),	m("td", [m("label.MOIST_CONTENT" ), m("span", " (1)") ]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A72")),	m("td", [m("span.MINSPECS"), m("span", ": "), m("label.MOIST_CONTENT" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A73")),	m("td", [m("span.MAXSPECS"), m("span", ": "), m("label.MOIST_CONTENT" )]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A74")),	m("td", [m("label.MOIST_CONTENT" ), m("span", " (2)") ]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A75")),	m("td", [m("label.MOIST_CONTENT" ), m("span", " (3)") ]) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A76")),	m("td", [m("label.MOIST_CONTENT" ), m("span", " (4)") ]) ]),
						
						m("tr", [	m("td", {width: "20%"}, m("", "A77")),	m("td", m("label.LONG_STEMS" )) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A78")),	m("td", [m("span.SPECS"), m("span", ": "), m("label.LONG_STEMS" )]) ]),
						
						m("tr", [	m("td", {width: "20%"}, m("", "A79")),	m("td", m("label.SHORT_STEMS" )) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A80")),	m("td", [m("span.SPECS"), m("span", ": "), m("label.SHORT_STEMS" )]) ]),
						
						m("tr", [	m("td", {width: "20%"}, m("", "A81")),	m("td", m("label.FILLING_POWER" )) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A82")),	m("td", [m("span.SPECS"), m("span", ": "), m("label.FILLING_POWER" )]) ])
					])
				)
			]),
			m("fieldset.fieldset_header", {style: "width:65%"}, [
				m("legend", "Formula"),
				m("div", {style: "height:35em; overflow-y:auto"},
					m("table", {width: "100%"}, [
						m("tr", [ m("td.RAWMATOK"), m("td", m("input.formula", {number: "1"} )) ]),
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.REGAIN_1")) ),
						["INPUTMOIST","MOISTSTAT","OUTPUTMOIST","OUTPUTTEMP","CHARGE_ACCUR"].map(function (label, idx) {
							return m("tr", [ m("td."+label), m("td", m("input.formula", {number: idx+2} )) ])
						}),
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.REGAIN_2")) ),
						["INPUTMOIST","MOISTSTAT","OUTPUTMOIST","OUTPUTTEMP","CHARGE_ACCUR"].map(function (label, idx) {
							return m("tr", [ m("td."+label), m("td", m("input.formula", {number: idx+7} )) ])
						}),
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.STORAGE")) ),
						["STORAGETIME","MATERIAL"].map(function (label, idx) {
							return m("tr", [ m("td."+label), m("td", m("input.formula", {number: idx+12} )) ])
						}),
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.CUT_STRIPS")) ),
						["CUT_WIDTH"].map(function (label, idx) {
							return m("tr", [ m("td."+label), m("td", m("input.formula", {number: idx+14} )) ])
						}),
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.MOIST_HEAT")) ),
						["INPUTMOIST","OUTPUTMOIST","OUTPUTTEMP"].map(function (label, idx) {
							return m("tr", [ m("td."+label), m("td", m("input.formula", {number: idx+15} )) ])
						}),
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.AIR_DRYING")) ),
						["OUTPUTMOIST","OUTPUTTEMP"].map(function (label, idx) {
							return m("tr", [ m("td."+label), m("td", m("input.formula", {number: idx+18} )) ])
						}),
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.BLEND_CUT")) ),
						["MATERIAL","BLEND_ACCUR"].map(function (label, idx) {
							return m("tr", [ m("td."+label), m("td", m("input.formula", {number: idx+20} )) ])
						}),
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.BLEND_EXP")) ),
						["MATERIAL","BLEND_ACCUR"].map(function (label, idx) {
							return m("tr", [ m("td."+label), m("td", m("input.formula", {number: idx+22} )) ])
						}),
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.BLEND_RECYCLED")) ),
						["MATERIAL"].map(function (label, idx) {
							return m("tr", [ m("td."+label), m("td", m("input.formula", {number: idx+24} )) ])
						}),
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.FLAVORING")) ),
						["MATERIAL","FLAVORING_ACCURACY","OUTPUTMOIST"].map(function (label, idx) {
							return m("tr", [ m("td."+label), m("td", m("input.formula", {number: idx+25} )) ])
						}),
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.BLEND_STORAGE")) ),
						["MATERIAL","MOIST_CONTENT"].map(function (label, idx) {
							return m("tr", [ m("td."+label), m("td", m("input.formula", {number: idx+28} )) ])
						}),
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.ADDITIONAL_INSPECTIONS")) ),
						["LONG_STEMS","SHORT_STEMS","FILLING_POWER"].map(function (label, idx) {
							return m("tr", [ m("td."+label), m("td", m("input.formula", {number: idx+30} )) ])
						})

					])
				)
			])
		),
		m("div.buttonrow", [
			m("input[type=button].save", {tabindex:"-1"})
		])
	],
	controller: function (element, isInitialized) {		// only events and initialisation
		if (isInitialized) 
			return;
			
		$("#formulas [number=32]").addClass("last");		// set the last field
		
		// set modified when there is a change
		$('#formulas input').not(':input[type=button]').on('keyup', function () {
			$(this).attr("modified", true);
		});
		
		// save changes
		$('#formulas .save').on('click', function () {
			$('#formulas input').each(function () {
				if ($(this).attr("modified")=='true') {
					val = $(this).val();
					sql = sprintf("UPDATE gwc_pline.formulas SET formula='%s' WHERE id=%s", val, $(this).attr("number") );
					$.getJSON('server/send_query.php', {query: sql});		
				}
			})
		});
		
	},
	view: function () {
		return m("#formulas", [this.header, this.contents]);
	}
}

