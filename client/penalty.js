
var penalty_content = {
	contents: [
		m("span.flex-row", {style: "background-color:rgba(0,255,255,0)"}, [	
			m("span.flex-col", {style: "background-color:rgba(0,255,255,0.05)"},
				m("fieldset", [
					m("legend.MAT_INPUT"),
					m("table", {width:"100%"}, [
						m("tr", 
							[{td:"td.MATREQUIREMENTS", label:"label.FeedMatID"}].map(function(a) {
								return [m(a.td), m("td", {align:"right"}, m(a.label))]
							})
						)
					])
				]),
				m("fieldset", [
					m("legend.REGAIN_1"),
					m("table", {width:"100%"}, [
						[
							{td:"td.INPUTMOIST", 	label:"label.1_matinMoist"},
							{td:"td.MOISTOK", 		label:"label.1_matMoistID"},
							{td:"td.OUTPUTMOIST", label:"label.1_matoutMoist"},
							{td:"td.OUTPUTTEMP", 	label:"label.1_matoutTemp"},
							{td:"td.CHARGE_ACCUR",label:"label.1_accuracy"}
						].map(function(a) {
							return m("tr", [m(a.td), m("td", {align:"right"}, m(a.label))])
						})
					])
				]),
				m("fieldset", [
					m("legend.REGAIN_2"),
					m("table", {width:"100%"}, [
						[
							{td:"td.INPUTMOIST", 	label:"label.2_matinMoist"},
							{td:"td.MOISTOK", 		label:"label.2_matMoistID"},
							{td:"td.OUTPUTMOIST", label:"label.2_matoutMoist"},
							{td:"td.OUTPUTTEMP", 	label:"label.2_matoutTemp"},
							{td:"td.CHARGE_ACCUR",label:"label.2_accuracy"}
						].map(function(a) {
							return m("tr", [m(a.td), m("td", {align:"right"}, m(a.label))])
						})
					])
				])
			),
			m("span.flex-col", {style: "background-color:rgba(0,255,255,0.05)"},
				m("fieldset", [
					m("legend.STORAGE"),
					m("table", {width:"100%"}, [
						m("tr", [m("td.STORAGETIME"), m("td", {align:"right"}, m("label.storTime"))]),
						m("tr", [m("td", [m("label.MATERIAL"), m("span"," ("), m("label.BATCHNOTMIXED"), m("span",")")]), m("td", {align:"right"}, m("label.stormatOK"))] ) 
					])
				]),
				m("fieldset", [
					m("legend.CUT_STRIPS"),
					m("table", {width:"100%"}, [
						m("tr", [m("td.CUT_WIDTH"), m("td", {align:"right"}, m("label.cutWidth"))])
					])
				]),
				m("fieldset", [
					m("legend.MOIST_HEAT"),
					m("table", {width:"100%"}, [
						[
							{td:"td.INPUTMOIST", 	label:"label.cyl_matinMoist"},
							{td:"td.OUTPUTMOIST", label:"label.cyl_matoutMoist"},
							{td:"td.OUTPUTTEMP", 	label:"label.cyl_matoutTemp"}
						].map(function(a) {
							return m("tr", [m(a.td), m("td", {align:"right"}, m(a.label))])
						})
					])
				]),
				m("fieldset", [
					m("legend.AIR_DRYING"),
					m("table", {width:"100%"}, [
						[
							{td:"td.OUTPUTMOIST", label:"label.dry_matoutMoist"},
							{td:"td.OUTPUTTEMP", 	label:"label.dry_matoutTemp"}
						].map(function(a) {
							return m("tr", [m(a.td), m("td", {align:"right"}, m(a.label))])
						})
					])
				]),
				m("fieldset", [
					m("legend.FLAVORING"),
					m("table", {width:"100%"}, [
						[
							{td:"td.MOISTOK", 	label:"label.blendflavorMatOK"},
							{td:"td.FLAVORING_ACCURACY", label:"label.blendflavorAccuracy"},
							{td:"td.OUTPUTMOIST", label:"label.blendflavorMoist"}
						].map(function(a) {
							return m("tr", [m(a.td), m("td", {align:"right"}, m(a.label))])
						})
					])
				])				
			),
			m("span.flex-col", {style: "background-color:rgba(0,255,255,0.05)"},
				m("fieldset", [
					m("legend.BLEND_CUT"),
					m("table", {width:"100%"}, [
						m("tr", [m("td", [m("label.MATERIAL"), m("span"," ("), m("label.CUTREQUIREMENTS"), m("span",")")]), m("td", {align:"right"}, m("label.blendcutStemID"))]),
						m("tr", [m("td.BLEND_ACCUR"), m("td", {align:"right"}, m("label.blendcutAccuracy"))])
					])
				]),
				m("fieldset", [
					m("legend.BLEND_EXP"),
					m("table", {width:"100%"}, [
						m("tr", [m("td", [m("label.MATERIAL"), m("span"," ("), m("label.EXPREQUIREMENTS"), m("span",")")]), m("td", {align:"right"}, m("label.blendexpMatOK"))]),
						m("tr", [m("td.BLEND_ACCUR"), m("td", {align:"right"}, m("label.blendexpAccuracy"))])
					])
				]),
				m("fieldset", [
					m("legend.BLEND_RECYCLED"),
					m("table", {width:"100%"}, [
						m("tr", [m("td.BLEND_RECYCLED_OK"), m("td", {align:"right"}, m("label.blendreMatOK"))])
					])
				]),
				m("fieldset", [
					m("legend.BLEND_STORAGE"),
					m("table", {width:"100%"}, [
						[
							{td:"td.MATERIAL", 	label:"label.blendstorMatOK"},
							{td:"td.MOIST_CONTENT", label:"label.blendstorMoist"}
						].map(function(a) {
							return m("tr", [m(a.td), m("td", {align:"right"}, m(a.label))])
						})
					])
				]),
				m("fieldset", [
					m("legend.ADDITIONAL_INSPECTIONS"),
					m("table", {width:"100%"}, [
						[
							{td:"td.LONG_STEMS", 	label:"label.amountLongStems"},
							{td:"td.SHORT_STEMS", 	label:"label.amountShortStems"},
							{td:"td.FILLING_POWER", label:"label.fillingPower"}
						].map(function(a) {
							return m("tr", [m(a.td), m("td", {align:"right"}, m(a.label))])
						})
					])
				])
			)
		]),
		m("div.buttonrow", [
			m("input[type=button].prev", {value: " <<< ", tabindex:"-1"}),
			m("input[type=button].next", {value: " >>> ", tabindex:"-1"})
		])
	],
	controller: function (element, isInitialized) {		// only events and initialisation
		if (isInitialized) 
			return;
		
		$('#penalties .next').click(function() {
			next_rec("gwc_pline.inspection");
		});
	
		$('#penalties .prev').click(function() {
			prev_rec("gwc_pline.inspection");
		});		
	},
	view: function () {
		return m("#penalties", this.contents);
	}
}