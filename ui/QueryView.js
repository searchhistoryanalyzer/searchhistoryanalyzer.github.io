define_view("ui/QueryView", [], {
    query: null,         // Query
	initialize: function(query){
        assert(query.query.trim()!="");
        this.query = query;
		this.render();
	},
	render: function(){
        var $a = this.$('.query');
        $a.html(this.query.query+" - "+this.query.date.toDateString());
        $a.attr('href', 'http://www.google.com/#q='+encodeURIComponent(this.query.query));
	},
	events:{
	}
});
