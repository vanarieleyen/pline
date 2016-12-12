
var formulas_content = {
	header: [
		m("span.flex-row#data_header", {style: "background-color:rgba(0,255,255,0.05)"}, 
			m("fieldset.fieldset_header", {style: "width:35%"}, [
				m("legend", "Cell"),
				m("div", {style: "height:35em; overflow-y:auto"},
					m("table", {width: "100%"}, [
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.ROLLING_PROCESS")) ),
						m("tr", [ m("td", {width: "20%"}, m("", "A1")),	m("td", m("label.L_OUTLOW" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A2")),	m("td", m("label.L_OUTHIGH" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A3")),	m("td", m("label.L_INSPEC" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A4")),	m("td", m("label.C_OUTLOW" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A5")),	m("td", m("label.C_OUTHIGH" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A6")),	m("td", m("label.C_INSPEC" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A7")),	m("td", m("label.W_OUTLOW" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A8")),	m("td", m("label.W_OUTHIGH" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A9")),	m("td", m("label.W_INSPEC" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A10")),	m("td", m("label.P_OUTLOW" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A11")),	m("td", m("label.P_OUTHIGH" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A12")),	m("td", m("label.P_INSPEC" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A13")),	m("td", m("label.SURFACE_OUT" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A14")),	m("td", m("label.BLEND_ACC" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A15")),	m("td", m("label.PD_ACC" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A16")),	m("td", m("label.TIGHTNESS" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "B1:B10")),	m("td", m("label.LENGTH" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "C1:C10")),	m("td", m("label.CIRCUMFERENCE" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "D1:D10")),	m("td", m("label.WEIGHT" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "E1:E10")),	m("td", m("label.PRESSUREDROP" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A17")),	m("td", m("label.BATCH_SCORE" )) ]),
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.WRAPPING_PROCESS")) ),
						m("tr", [	m("td", {width: "20%"}, m("", "A18")),	m("td", m("label.WRAPPER_COLOR" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A19")),	m("td", m("label.HEADEND" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A20")),	m("td", m("label.WRAPPED_OK" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A21")),	m("td", m("label.INCISSION" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A22")),	m("td", m("label.HEAD_EMPTY" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A23")),	m("td", m("label.TIGHTNESS" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A24")),	m("td", m("label.VEIN_LINES" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A25")),	m("td", m("label.CREASE" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A26")),	m("td", m("label.SPOTS" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A27")),	m("td", m("label.BLOTS" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A28")),	m("td", m("label.SEAMS" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A29")),	m("td", m("label.HOLES" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A30")),	m("td", m("label.CRACKS" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A31")),	m("td", m("label.SPLICES" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A32")),	m("td", m("label.BATCH_SCORE" )) ]),
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.MACHINE_CUTTING")) ),
						m("tr", [	m("td", {width: "20%"}, m("", "A33")),	m("td", m("label.HEADEND" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A34")),	m("td", m("label.INCISSION" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A35")),	m("td", m("label.HEAD_EMPTY" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A36")),	m("td", m("label.CREASE" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A37")),	m("td", m("label.BLOTS" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A38")),	m("td", m("label.SEAMS" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A39")),	m("td", m("label.CRACKS" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A40")),	m("td", m("label.BATCH_SCORE" )) ]),
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.STORAGE_PROCESS")) ),
						m("tr", [	m("td", {width: "20%"}, m("", "A41")),	m("td", m("label.DOPANT" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A42")),	m("td", m("label.HEADEND" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A43")),	m("td", m("label.HEAD_EMPTY" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A44")),	m("td", m("label.SEAMS" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A45")),	m("td", m("label.HOLES" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A46")),	m("td", m("label.CRACKS" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "A47")),	m("td", m("label.MILDEW_WORMS" )) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A48")),	m("td", m("label.M_OUTLOW" )) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A49")),	m("td", m("label.M_OUTHIGH" )) ]),
						
						m("tr", [	m("td", {width: "20%"}, m("", "A50")),	m("td", m("label.M_INSPEC" )) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A51")),	m("td", m("label.M_2INSPEC" )) ]),
						m("tr", [ m("td", {width: "20%"}, m("", "A52")),	m("td", m("label.BATCH_SCORE" )) ]),
						
						m("tr", [	m("td", {width: "20%"}, m("", "F1:F8")),		m("td", m("label.MOISTURE" )) ]),
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.SPECS")) ),
						m("tr", [	m("td", {width: "20%"}, m("", "S1 (min)")),	m("td", m("label.LENGTH" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "S2 (max)")),	m("td", m("label.LENGTH" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "S3 (min)")),	m("td", m("label.CIRCUMFERENCE" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "S4 (max)")),	m("td", m("label.CIRCUMFERENCE" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "S5 (min)")),	m("td", m("label.WEIGHT" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "S6 (max)")),	m("td", m("label.WEIGHT" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "S7 (min)")),	m("td", m("label.PRESSUREDROP" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "S8 (max)")),	m("td", m("label.PRESSUREDROP" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "S9 (min)")),	m("td", m("label.MOISTURE" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "S10 (max)")),m("td", m("label.MOISTURE" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "S11 (min)")), m("td", m("label.BLEND_ACC" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "S12 (max)")), m("td", m("label.BLEND_ACC" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "S13 (min)")), m("td", m("label.PD_ACC" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "S14 (max)")), m("td", m("label.PD_ACC" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "S15")), m("td", m("label.TIGHTNESS" )) ]),
						m("tr", [	m("td", {width: "20%"}, m("", "S16")), m("td", m("label.SURFACE_OUT" )) ]),
					])
				)
			]),
			m("fieldset.fieldset_header", {style: "width:65%"}, [
				m("legend", "Formula"),
				m("div", {style: "height:35em; overflow-y:auto"},
					m("table", {width: "100%"}, [
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.ROLLING_PROCESS")) ),
						m("tr", [ m("td", m("label.L_OUTLOW")),		m("td", m("input[name=l_outlow].formula" )) ]),
						m("tr", [	m("td", m("label.L_OUTHIGH")), 	m("td", m("input[name=l_outhigh].formula" )) ]),
						m("tr", [	m("td", m("label.L_INSPEC")),		m("td", m("input[name=l_inspec].formula" )) ]),
						m("tr", [ m("td", m("label.C_OUTLOW")),		m("td", m("input[name=c_outlow].formula" )) ]),
						m("tr", [	m("td", m("label.C_OUTHIGH")), 	m("td", m("input[name=c_outhigh].formula" )) ]),
						m("tr", [	m("td", m("label.C_INSPEC")),		m("td", m("input[name=c_inspec].formula" )) ]),
						m("tr", [ m("td", m("label.W_OUTLOW")),		m("td", m("input[name=w_outlow].formula" )) ]),
						m("tr", [	m("td", m("label.W_OUTHIGH")), 	m("td", m("input[name=w_outhigh].formula" )) ]),
						m("tr", [	m("td", m("label.W_INSPEC")),		m("td", m("input[name=w_inspec].formula" )) ]),
						m("tr", [ m("td", m("label.P_OUTLOW")),		m("td", m("input[name=p_outlow].formula" )) ]),
						m("tr", [	m("td", m("label.P_OUTHIGH")), 	m("td", m("input[name=p_outhigh].formula" )) ]),
						m("tr", [	m("td", m("label.P_INSPEC")),		m("td", m("input[name=p_inspec].formula" )) ]),
						m("tr", [	m("td", m("label.BATCH_SCORE")),		m("td", m("input[name=r_batch_score].formula" )) ]),
						m("tr", [	m("td", m("label.BATCH_QUALITY")),	m("td", m("input[name=r_batch_quality].formula" )) ]),
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.WRAPPING_PROCESS")) ),
						m("tr", [	m("td", m("label.BATCH_SCORE")),		m("td", m("input[name=w_batch_score].formula" )) ]),
						m("tr", [	m("td", m("label.BATCH_QUALITY")),	m("td", m("input[name=w_batch_quality].formula" )) ]),
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.MACHINE_CUTTING")) ),
						m("tr", [	m("td", m("label.BATCH_SCORE")),		m("td", m("input[name=c_batch_score].formula" )) ]),
						m("tr", [	m("td", m("label.BATCH_QUALITY")),	m("td", m("input[name=c_batch_quality].formula" )) ]),
						m("tr", m("td[colspan=2]", {align:"center"}, m("label.STORAGE_PROCESS")) ),
						m("tr", [ m("td", m("label.M_OUTLOW")),		m("td", m("input[name=m_outlow].formula" )) ]),
						m("tr", [	m("td", m("label.M_OUTHIGH")), 	m("td", m("input[name=m_outhigh].formula" )) ]),
						m("tr", [	m("td", m("label.M_INSPEC")),		m("td", m("input[name=m_inspec].formula" )) ]),
						m("tr", [	m("td", m("label.M_2INSPEC")),	m("td", m("input[name=m_2inspec].formula" )) ]),
						m("tr", [	m("td", m("label.BATCH_SCORE")),		m("td", m("input[name=s_batch_score].formula" )) ]),
						m("tr", [	m("td", m("label.BATCH_QUALITY")),	m("td", m("input[name=s_batch_quality].formula" )) ])
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
			
		$("#formulas [name=s_batch_quality]").addClass("last");		// set the last field
		
		// make sure the id of the formulas is set to 1
		$.jStorage.set("handmade.current.formulas", 1);		// only one fixed record with id=1
		
		// save the data
		$("#formulas .save").click(function() {
			var l_outlow = 				$("#formulas [name=l_outlow]").val();
			var l_outhigh = 			$("#formulas [name=l_outhigh]").val();
			var l_inspec = 				$("#formulas [name=l_inspec]").val();
			var c_outlow = 				$("#formulas [name=c_outlow]").val();
			var c_outhigh = 			$("#formulas [name=c_outhigh]").val();
			var c_inspec = 				$("#formulas [name=c_inspec]").val();
			var w_outlow = 				$("#formulas [name=w_outlow]").val();
			var w_outhigh = 			$("#formulas [name=w_outhigh]").val();
			var w_inspec = 				$("#formulas [name=w_inspec]").val();
			var p_outlow = 				$("#formulas [name=p_outlow]").val();
			var p_outhigh = 			$("#formulas [name=p_outhigh]").val();
			var p_inspec = 				$("#formulas [name=p_inspec]").val();
			var m_outlow = 				$("#formulas [name=m_outlow]").val();
			var m_outhigh = 			$("#formulas [name=m_outhigh]").val();
			var m_inspec = 				$("#formulas [name=m_inspec]").val();
			var m_2inspec = 			$("#formulas [name=m_2inspec]").val();
			var r_batch_score = 	$("#formulas [name=r_batch_score]").val();
			var r_batch_quality = $("#formulas [name=r_batch_quality]").val();
			var w_batch_score = 	$("#formulas [name=w_batch_score]").val();
			var w_batch_quality = $("#formulas [name=w_batch_quality]").val();
			var c_batch_score = 	$("#formulas [name=c_batch_score]").val();
			var c_batch_quality = $("#formulas [name=c_batch_quality]").val();
			var s_batch_score = 	$("#formulas [name=s_batch_score]").val();
			var s_batch_quality = $("#formulas [name=s_batch_quality]").val();

			sql = sprintf("UPDATE gwc_handmade.formulas SET l_outlow='%s', l_outhigh='%s', l_inspec='%s', c_outlow='%s', c_outhigh='%s', c_inspec='%s', \
					w_outlow='%s', w_outhigh='%s', w_inspec='%s', p_outlow='%s', p_outhigh='%s', p_inspec='%s', m_outlow='%s', m_outhigh='%s', m_inspec='%s', m_2inspec='%s', \
					r_batch_score='%s', r_batch_quality='%s', w_batch_score='%s', w_batch_quality='%s', c_batch_score='%s', c_batch_quality='%s', \
					s_batch_score='%s', s_batch_quality='%s' WHERE id=1",
					l_outlow, l_outhigh, l_inspec, c_outlow, c_outhigh, c_inspec, w_outlow, w_outhigh, w_inspec,  p_outlow, p_outhigh, p_inspec,
					m_outlow, m_outhigh, m_inspec, m_2inspec, r_batch_score, r_batch_quality, w_batch_score, w_batch_quality,
					c_batch_score, c_batch_quality, s_batch_score, s_batch_quality );

			$.getJSON('server/send_query.php', {	query: sql	});	
		})
		
	},
	view: function () {
		return m("#formulas", [this.header, this.contents]);
	}
}

