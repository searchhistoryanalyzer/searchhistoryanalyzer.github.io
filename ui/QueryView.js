define_view("ui/QueryView", [], {
    query: null,         // Query
	initialize: function(query){
        assert(query.query.trim()!="");
        this.query = query;
        this.render();
    },
    render: function(){
        this.$el.html(this.query.query+" - "+this.query.date.toDateString());
    },
    events:{
    }
});
