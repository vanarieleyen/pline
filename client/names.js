
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
			])
		]),
		m("div.buttonrow", [
			m("input[type=button].save", {tabindex:"-1"})
		])
	],
	controller: function (element, isInitialized) {		// only events and initialisation
		if (isInitialized) 
			return;
		
		$("#names [name=inspector]").addClass("last");		// set the last field
		
		// save the data
		$("#names .save").click(function() {
			var inspectors = $("#names [name=inspector]").val();
			var sql = sprintf('UPDATE gwc_pline.names SET inspector="%s" WHERE id=1', inspectors );
			$.getJSON('server/send_query.php', {
				query: sql
			}, function () {
				// reload all inspector select-boxes with the new data
				$.get('server/get_names.php', function(data) {
					$(element+'#data [name=inspector]').empty().append(data.inspectors);
				});
			});	
		});
		
	},
	view: function () {
		return m("#names", this.contents);
	}
}