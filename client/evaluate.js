
var evaluate_content = {
	contents: [
		m("span.flex-row#data_header", {style: "background-color:rgba(0,255,255,0.05)"}, [
			m("fieldset.fieldset_header", {style: "width:40%"}, [
				m("legend.SELECT"),
				m("table", {width: "100%"}, [
					[	{label:"label.START_DATE", name:"start"},	{label:"label.END_DATE", name:"end"} ].map(function (a) {							
						return m("tr", [
										m("td",	m(a.label)),
										m("td",	m("input.datum[type:text]", {name: a.name}))
									])
					}),
					[
						{label:"label.STAGE", name:"stage"},
						{label:"label.PRODUCT", name:"product"},
						{label:"label.SAMPLINGPOINT", name:"sampling"}
					].map(function (a) {							
						return m("tr", [
										m("td",	m(a.label)),
										m("td",	m("select", {name: a.name}))
									])
					})
				])
			]),
			m("fieldset.summaries", {style: "width:60%"}, [
				m("legend.SUMMARY"), [
					m("table#rolling", {width: "100%", border: "0", style: "display:none"},
						m("tr", {style: "background-color: rgba(0,0,0,0.1)"}, 
							["", "AMOUNT", "CPK", "AVG", "DEVIATION", "VARIANCE", "OUTSPEC"].map(function(label) {
								return m("th."+label)
							})
						),
						[	{label:".LENGTH", field:"lengte"}, {label:".HANDMADE_CIRCUMFERENCE", field:"omtrek"}, 
							{label:".WEIGHT", field:"gewicht"}, {label:".PRESSUREDROP", field:"pd"}
						].map(function(a) {
							return m("tr", {name: a.field}, [
								m("td"+a.label),
								["amount", "cpk", "avg", "dev", "var", "out"].map(function(label) {
									return m("th", {name: label})
								})
							])
						})				
					),
					m("table#wrapping", {width: "100%", border: "0", style: "display:none"},
						m("tr", {style: "background-color: rgba(0,0,0,0.1)"}, 
							["", "AMOUNT", "CPK", "AVG", "DEVIATION", "VARIANCE", "OUTSPEC"].map(function(label) {
								return m("th."+label)
							})
						),
						[ {label:".MOISTURE", field:"moisture"}, {label:".WEIGHT", field:"weight"}
						].map(function(a) {
							return m("tr", {name: a.field}, [
								m("td"+a.label),
								["amount", "cpk", "avg", "dev", "var", "out"].map(function(label) {
									return m("th", {name: label})
								})
							])
						})				
					),
					m("table#storage", {width: "100%", border: "0", style: "display:none"},
						m("tr", {style: "background-color: rgba(0,0,0,0.1)"}, 
							["", "AMOUNT", "CPK", "AVG", "DEVIATION", "VARIANCE", "OUTSPEC"].map(function(label) {
								return m("th."+label)
							})
						),
						[ {label:".MOISTURE", field:"moisture"} 
						].map(function(a) {
							return m("tr", {name: a.field}, [
								m("td"+a.label),
								["amount", "cpk", "avg", "dev", "var", "out"].map(function(label) {
									return m("th", {name: label})
								})
							])
						})				
					)
				]
			])				
		])
	],
	controller: function (element, isInitialized) {		// only events and initialisation
		if (isInitialized) 
			return;
			
		// todo: set the last field
		$("#evaluate [name=empty]").addClass("last");		// set the last field
					
		var nu = new Date();
		$('#evaluate [name=start]').val(nu.format("yyyy-MM-dd") );
		$('#evaluate [name=end]').val(nu.format("yyyy-MM-dd") );

		$("#evaluate select").change(function () {
			var start_date = $("#evaluate [name=start]").val();
			var end_date = $("#evaluate [name=end]").val();
			var product = $("#evaluate [name=product]").val();
			var sampling = $("#evaluate [name=sampling]").val();
			var stage = $("#evaluate [name=stage]").val();
			
			$("#evaluate .summaries th[name]").each(function () {
				$(this).text("");		// clear all summaries
			});
			
			// fill the selectbox options
			$.getJSON('server/get_evalselect.php', {
				start: start_date,
				end: end_date,
				prod: product,
				samp: sampling,
				step: stage,
				lang: $.jStorage.get("lang")
			},function(data) {	
				$('#evaluate [name=sampling]').empty().append(data.sampling);	
				$('#evaluate [name=product]').empty().append(data.product);
				$('#evaluate [name=stage]').empty().append(data.stage);	

				$("#evaluate .summaries table").css("display","none");		// hide all summaries
				switch (stage) {
					case 'rolling': $("#evaluate #rolling").show();
						break;
					case 'wrapping': $("#evaluate #wrapping").show();
						break;
					case 'storage': $("#evaluate #storage").show();
						break;
				}
				showSummary();
			});


		})
		
	},
	view: function () {
		return m("#evaluate", this.contents);
	}
}