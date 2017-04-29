define_view("ui/ResultsScreen", ["ui/WordView", "ui/QueriesView"], {
    model: null,            // QueryDbModel
    queries_view: null,
    initialize: function(){
        this.queries_view = new QueriesView({el:this.$('.QueriesView')});
        this.model.on('update', this.render, this);
        this.model.on('change:current_word', this.render_queries, this);
		this.render();
        this.render_queries();
	},
	render: function(){
        var $word_list = this.$('.word-list');
        $word_list.empty();
        var words = this.model.get('words');
        var self = this;
        for(var i in words){
            var view = new WordView(words[i]);
            // HACK?
            words[i].view = view;
            var self = this;
            view.on("open", function(view){
                self.model.set('current_word', view.word);
            });
            $word_list.append(view.$el);
        }
	},
    render_queries: function(){
        this.queries_view.clear();
        var w = this.model.get('current_word');
        if(!w){
            this.$('.QueriesView').addClass('hidden');
            // make wide
            this.$('.left').removeClass("col-xs-12 col-sm-6 col-md-4");
            // make narrow
            this.$('.panel-col').addClass("col-xs-12 col-sm-6 col-md-4 col-sm-offset-3 col-md-offset-4");
            return;
        }
        else{
            this.$('.left').addClass("col-xs-12 col-sm-6 col-md-4");
            this.$('.panel-col').removeClass("col-xs-12 col-sm-6 col-md-4 col-sm-offset-3 col-md-offset-4");
        }
        this.$('.QueriesView').removeClass('hidden');

        var qs = w.getQueries();
        for(var i=0; i<qs.length; i++){
            this.queries_view.addQuery(qs[i]);
        }// for

        _.each(this.model.get('words'),function(w){
            w.view.setCurrent(false);
        });
        w.view.setCurrent(true);
    },
	events:{
	}
});
