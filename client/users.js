//console.log("users.js processed");

// the users page

var users_content = {
	header: [
		m("span.flex-row#data_header", {style: "background-color:rgba(0,255,255,0.05)"}, 
			m("fieldset.fieldset_header", {style: "width:98%"}, [
				m("legend", "Details"),
				m("table", {width: "100%"}, [
					[
						{label:"Name", field:"name", type:"text"}, 
						{label:"Password", field:"login", type:"password"},
						{label:"Specifications", field:"specs", type:"checkbox"},
						{label:"Formulas", field:"formulas", type:"checkbox"},
						{label:"Administrator", field:"admin", type:"checkbox"},
						{label:"Readonly", field:"readonly", type:"checkbox"},
						{label:"Names", field:"names", type:"checkbox"}
					].map(function (a) {
						return m("tr", [
										m("td",	a.label),	
										m("td",	m("input[type="+a.type+"]", {name: a.field}))	
									])
					}),
					[
						{label:"Last Login", field:"date"},
						{label:"Login IP", field:"identity"}, 
						{label:"Logins", field:"gebruik"} 
					].map(function (a) {
						return m("tr", [
										m("td",	a.label),
										m("td",	m("span", {name: a.field}, "--"))
									])
					})
				])
			]),
			m("fieldset.fieldset_header", {style: "width:98%"}, [
				m("legend", "Users"),
				m("div", {style: "height:20em; overflow_y:auto"}, 
					m("table#userlist", {width: "100%"}, [
						m("thead.header", {valign: "top"}, [
							["ID", "DATE", "NAME", "USAGE"].map(function (a) {
								return m("th", a)
							})
						]),
						m("tbody", {style:"height:20em; overflow:auto"})					
					])
				)
			])
		),
		m("div.buttonrow", [
			m("input[type=button].save", {tabindex:"-1"}),
			m("input[type=button].new", {tabindex:"-1"}),
			m("span", [
				m("input[type=checkbox].toggle"),
				m("input[type=button].delete", {tabindex:"-1", disabled:"disabled"})
			])
		])
	],
	controller: function (element, isInitialized) {		// only events and initialisation
		if (isInitialized) 
			return;

		$("#users [name=names]").addClass("last");		// set the last field
		
		// select a product from the specifications list
		$('#users #userlist tbody').on('click', 'td', function(e) {		
			$("#users #userlist tbody tr").removeClass('row_selected');
			$(this).parent().addClass('row_selected');	// select the new row	
			
			// fill the spec history in the second list
			show_user_details($(this).parent().find("td:first").text());
		});
		
		// show login on hover
		$('#users [name=login').hover(function() {
			var lbl = '#users [name='+ this.name + ']';
			$(lbl).attr('type', '');
			$(lbl).css('width', '148');
		}, function(){
			var lbl = '#users [name='+ this.name + ']';
			$(lbl).attr('type', 'password');
			$(lbl).css('width', '150');
		});
		
		// enable/disable the delete button
		$('#users .toggle').on('click', function(e) {		
			var state = $(this).prop('checked');
			if (state)
				$('#users .delete').removeAttr('disabled');	
			else
				$('#users .delete').attr('disabled', 'disabled');
		});	
		
		// new user
		$("#users .new").click(function() {
			new_rec("gwc_handmade.users", "#users");
			show_users();
		});
		
		// delete a user
		$('#users .delete').on('click', function(e) {		
			var id = $.jStorage.get("handmade.current.users");

			$.getJSON('server/send_query.php', {
				query: "DELETE FROM gwc_handmade.users WHERE id="+id	
			}, function () {
				$('#users .delete').attr('disabled', 'disabled');
				show_users();
			});	
		});	

		// save the data
		$("#users .save").click(function() {
			var name = 			$("#users [name=name]").val();
			var login = 		$("#users [name=login]").val();
			var specs = 		$('#users [name=specs]').prop('checked') ? 1 : 0;
			var formulas = 	$('#users [name=formulas]').prop('checked') ? 1 : 0;
			var admin = 		$('#users [name=admin]').prop("checked") ? 1 : 0;
			var names = 		$('#users [name=names]').prop("checked") ? 1 : 0;
			var readonly =	$('#users [name=readonly]').prop("checked") ? 1 : 0;
			var id = 				$.jStorage.get("handmade.current.users");

			sql = sprintf("UPDATE gwc_handmade.users SET name='%s', login='%s', specs='%s', formulas='%s', admin='%s', names='%s', readonly='%s' WHERE id=%s",
					name, login, specs, formulas, admin, names, readonly, id );

			$.getJSON('server/send_query.php', {	query: sql	});	
			show_users();
		})

	},
	view: function () {
		return m("#users", [this.header, this.contents]);
	}
}

