jq(document).ready(function() {
    jq('.dynatree-atwidget').each(function () {
		// get parameters
		var jqthis = jq(this);
		var valuetarget = jq(this)
		var rawparams = jq(this).find('.dynatree_parameters').text().split('/');
		var params = new Array();
		for (var idx=0; idx<rawparams.length; idx++) {
			var pair = rawparams[idx].split(',');
			var value = pair[1].trim();
            if (!isNaN(value)) { value = parseInt(value); };
            if (value=='True') { value = true; };
            if (value=='False') { value = false; };		
			params[pair[0].trim()] = value;
		}
		// get json url       
        params['initAjax'] = {
			'url': jqthis.find('.dynatree_ajax_vocabulary').text()
		};
		// activation/ deactivation
		params['onSelect'] = function(flag, dtnode) {
			var sel_nodes = jq(dtnode.tree.$tree).dynatree('getSelectedNodes');
			var newvalue = '';
			for (var idx=0; idx<sel_nodes.length; idx++) { 
				newvalue = newvalue + sel_nodes[idx].data.key + '|';
			};  
			jq(dtnode.tree.$tree).siblings('input').val(newvalue);
		};
		// init tree
		jqthis.find('.collective-dynatree-tree').dynatree(params);
	});
});