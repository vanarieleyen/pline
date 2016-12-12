
var names_content = {
	contents: [
		m("span.flex-row#data_header", {style: "background-color:rgba(0,255,255,0.05)"}, [	
			m("fieldset.fieldset_header", {style: "width:98%"}, [
				m("legend.INSPECTOR"),
				m("table", [
					m("tr", 
						m("td",
							m("textarea[name=inspector]", {style: "resize:none; width:100%; height:20em"})
						)
					)
				])
			]),
			m("fieldset.fieldset_header", {style: "width:98%"}, [
				m("legend.SAMPLINGPOINT"),
				m("table", [
					m("tr", 
						m("td",
							m("textarea[name=sampling]", {style: "resize:none; width:100%; height:20em"})
						)
					)
				])
			]),
			m("fieldset.fieldset_header", {style: "width:98%"}, [
				m("legend.IN_CHARGE"),
				m("table", [
					m("tr", 
						m("td",
							m("textarea[name=incharge]", {style: "resize:none; width:100%; height:20em"})
						)
					)
				])
			])
		]),
		m("div.buttonrow", [
			m("input[type=button].save", {tabindex:"-1"})
		])
	],
	controller: function (element, isInitialized) {		// only events and initialisation
		if (isInitialized) 
			return;
		
		$("#names [name=incharge]").addClass("last");		// set the last field
		
		// save the data
		$("#names .save").click(function() {
			var inspectors = $("#names [name=inspector]").val();
			var sampling = $("#names [name=sampling]").val();
			var incharge = $("#names [name=incharge]").val();
			var sql = sprintf('UPDATE gwc_handmade.names SET inspector="%s",name="%s",incharge="%s" WHERE id=1', inspectors, sampling, incharge );
			$.getJSON('server/send_query.php', {
				query: sql
			}, function () {
				// reload all inspector select-boxes with the new data
				$.get('server/get_names.php', function(data) {
					Array("#stickDefects","packDefects","#boxDefects","#rolling","#wrapping","#cutting","#storage").map(function(element){
						$(element+' [name=inspector]').empty().append(data.inspectors);
						$(element+' [name=name]').empty().append(data.sampling);
						$(element+' [name=incharge]').empty().append(data.incharge);
					});
				});
			});	
		});
		
	},
	view: function () {
		return m("#names", this.contents);
	}
}