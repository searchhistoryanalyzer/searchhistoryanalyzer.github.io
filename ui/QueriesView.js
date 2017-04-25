define_view("ui/QueriesView", ["ui/QueryView"], {
	initialize: function(){
	},
	events:{
	},
    clear: function(){
        this.$('.query-list').empty();
    },
    addQuery(q){
        var query_list = this.$('.query-list');
        var view = new QueryView(q);
        query_list.append(view.$el);
    }
});
