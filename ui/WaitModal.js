define_view("ui/WaitModal", [], {
	initialize: function(){
        this.$el.modal({
            backdrop:"static",
            show: false,
            keyboard: false
        });
	},
	events:{
        "click cancel": function(){
            this.trigger('cancel');
        }
	},
    show: function(){
        this.$('.modal').modal('show');
        //console.log('show');
    },
    hide: function(){
        this.$('.modal').modal('hide');
        //console.log('hide');
    },
    setProgress(val){
        var percent = parseInt(val*100)+"%";
        this.$('.progress-bar').css("width", percent);
        this.$('.progress-bar').html(percent);
        //console.log('progress = ' + percent);
    }
});
