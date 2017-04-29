define_view("ui/WelcomeScreen", [], {
    model: null,            // QueryDbModel
	initialize: function(){
        // var self = this;
        // setTimeout(function(){self.debug_load_sample_data();}, 0);
        this.$('.panel').on('drag dragstart dragend dragenter', function(evt) {
          evt.preventDefault();
          evt.stopPropagation();
        });
		this.render();
	},
	render: function(){
	},
	events:{
        "change .choose": function(evt){
            this.on_choose_files(this.$('.choose')[0].files);
        },
        "click .next": function(){
            this.trigger("next");
        },
        "drop .panel": function(evt){
            evt.preventDefault();
            evt.stopPropagation();
            var files = evt.originalEvent.dataTransfer.files;
            this.on_choose_files(files);
        },
        "dragover .panel": function(evt){
            evt.preventDefault();
            evt.stopPropagation();
            this.$('.panel').addClass('dragover');
        },
        "dragleave .panel": function(evt){
            evt.preventDefault();
            evt.stopPropagation();
            //if(evt.target == this.$('.panel')[0])
            this.$('.panel').removeClass('dragover');
        }
	},
    on_choose_files: function(files){
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
    },
    debug_load_sample_data: function(){
        var event = sample_json.event;
        for(var i in event){
            var e = event[i];
            var date = new Date(+e.query.id[0].timestamp_usec/1000);
            var query_text = e.query.query_text;
            this.model.addQuery(new Query(query_text, date), {silent: true});
        }// for
        this.model.trigger("update");
        this.trigger("choose");
    }
});
