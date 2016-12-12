
var data_content = {
	header: [
		m("span.flex-row", {style: "background-color:rgba(0,255,255,0.05)"}, [
			m("fieldset.fieldset_header", {style: "width:70%"}, [
				m("legend.MEASUREMENTS"),
				m("table", {width: "100%", border: "0"}, 
					m("tr", [
						m("td",
							m("table", {width: "100%"}, [
								[
									{label:"label.DATE", soort:"input.datum", field:"date"},
									{label:"label.BATCHNR", soort:"input", field:"batchNr"},
									{label:"label.PRODUCT", soort:"select", field:"product"},
									{label:"label.SPECSNR", soort:"select", field:"number"},
									{label:"label.PRODUCTIONSTATUS", soort:"select", field:"prodStat"},
									{label:"label.INSPECTOR", soort:"select", field:"inspector"}
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
								m("tr", [	m("td.PSCORE"),	m("td.score") ]),
								m("tr", [	m("td.IRESULT"),	m("td",	m("select[name=result]")) ]),
								m("tr",	m("td.PREMARK",	{colspan: "2"})),
								m("tr",	m("td",	{colspan: "2"}, 
									m("textarea[name=pendingReason]", {style: "display:table-cell; width:99%; height:3.5em; outline:none; resize:none;"} )))
								
							])						
						),
					])
				)
			]),
			m("fieldset.fieldset_header", {style: "width:30%"}, [
				m("legend.DISPOSAL"),
				m("table", {width: "100%"}, [
					[
						{label:"label.DISPOSAL", soort:"select", field:"disposal"},
						{label:"label.HANDLINGNR", soort:"input", field:"matNotNR"},
						{label:"label.INSPECTOR", soort:"select", field:"inspectorDis"}
					].map(function (a) {							
						return m("tr", [
										m("td",	m(a.label)),
										m("td",	m(a.soort, {type: "text", name: a.field}))
									])
					})
				])
			])
		])
	],
	contents: [
		m("#tabs3.subtabs1", [
			m("ul", [
				[
					{label:"label.PHYSDATA", href:"#physdata_tab"},
					{label:"label.PENALTY", href:"#penalty_tab"}
				].map(function (a) {
					return m("li", 
									m("a", {href: a.href, tabindex:"-1", class: "last" }, [
										m(a.label)
									])
								)
				})
			]),
			[			// the tabs used by ui-tabs
				m("#physdata_tab", m.component(physdata_content)),
				m("#penalty_tab", m.component(penalty_content))
			]
		])	
	],
	controller: function (element, isInitialized) {		// only events and initialisation
		if (isInitialized) 
			return;
		
		$( "#tabs3" ).tabs();
		
	},		
	view: function () {
		return m("#data", [this.header, this.contents]);
	}
}

