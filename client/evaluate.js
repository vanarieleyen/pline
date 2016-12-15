
var evaluate_content = {
	contents: [
		m("span.flex-row", {style: "background-color:rgba(0,255,255,0.05)"},
			m("fieldset.fieldset_header", {style: "width:100%"}, [
				m("legend.SELECT"),
				m("table", {width: "100%"}, 
					m("tr", [
						m("td", 
							m("table", {width:"100%"}, [
								[	{label:"label.START_DATE", name:"start"},	{label:"label.END_DATE", name:"end"} ].map(function (a) {							
									return m("tr", [
													m("td",	m(a.label)),
													m("td",	m("input.datum[type:text]", {name: a.name}))
												])
								})
							])
						),
						m("td", 
							m("table", {width:"100%"}, [
								[
									{label:"label.PRODUCT", name:"product"},
									{label:"label.PRODUCTIONSTATUS", name:"prodStat"}
								].map(function (a) {							
									return m("tr", [
													m("td",	m(a.label)),
													m("td",	m("select", {name: a.name}))
												])
								})
							])
						),
						m("td", 
							m("table", {width:"100%"},  [
								[
									{label:"label.IRESULT", name:"result"},
									{label:"label.DISPOSAL", name:"disposal"}
								].map(function (a) {							
									return m("tr", [
													m("td",	m(a.label)),
													m("td",	m("select", {name: a.name}))
												])
								})
							])
						),
						m("td", 
							m("table", {width: "100%"}, [
								["select", "export"].map(function (label) {							
									return m("tr", [
													m("td",	m("input[type=button]", {class:label, id:label, style:"width:8em"}))
												])
								})
							])
						)
						
					])
				)
			])
		)	
	],
	controller: function (element, isInitialized) {		// only events and initialisation
		if (isInitialized) 
			return;

		$("#evaluate [name=disposal]").addClass("last");		// set the last field
					
		var nu = new Date();
		$('#evaluate [name=start]').val(nu.format("yyyy-MM-dd") );
		$('#evaluate [name=end]').val(nu.format("yyyy-MM-dd") );

		$("#evaluate select").change(function () {
			var start_date = $("#evaluate [name=start]").val();
			var end_date = $("#evaluate [name=end]").val();
			var product = $("#evaluate [name=product]").val();
			var prodStat = $("#evaluate [name=prodStat]").val();
			var result = $("#evaluate [name=result]").val();
			var disposal = $("#evaluate [name=disposal]").val();
			
			// fill the selectbox options
			$.getJSON('server/get_evalselect.php', {
				start: start_date,
				end: end_date,
				product: product,
				prodStat: prodStat,
				result: result,
				disposal: disposal,
				lang: $.jStorage.get("lang")
			},function(data) {	
				$('#evaluate [name=prodStat]').empty().append(data.prodStat);	
				$('#evaluate [name=product]').empty().append(data.product);
				$('#evaluate [name=result]').empty().append(data.result);
				$('#evaluate [name=disposal]').empty().append(data.disposal);		
			});
		})
		
	},
	view: function () {
		return m("#evaluate", this.contents);
	}
}