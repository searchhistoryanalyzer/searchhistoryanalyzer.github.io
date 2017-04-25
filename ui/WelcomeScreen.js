define_view("ui/WelcomeScreen", [], {
    model: null,            // QueryDbModel
	initialize: function(){
		this.render();
	},
	render: function(){
	},
	events:{
        "change .choose": "on_choose_files",
        "click .next": function(){
            this.trigger("next");
        }
	},
    on_choose_files: function(){
        var files = this.$('.choose')[0].files;
        if(files.length==0)
            return;
        var self = this;
        var finished_count = 0;
        for(var i=0; i<files.length; i++){
    		var file = files[i];
            // TODO: handle errors and wrong file format
    		var fr = new FileReader();
    		fr.onload = function(evt){
    			var json = JSON.parse(evt.target.result);
    			var event = json.event;
    			for(var i in event){
    				var e = event[i];
                    var date = new Date(+e.query.id[0].timestamp_usec/1000);
                    var query_text = e.query.query_text;
                    // TODO: remove this dependency??
                    self.model.addQuery(new Query(query_text, date), {silent: true});
    			}// for
                finished_count++;
                if(finished_count == files.length){
                    self.model.trigger("update");
                    self.trigger("choose");
                }
    		};// onload
    		fr.readAsText(file);
    	}//for files
    }
});
