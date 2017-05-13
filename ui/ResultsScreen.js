define_view("ui/ResultsScreen", ["ui/WordView", "ui/QueriesView"], {
    model: null,            // QueryDbModel
    queries_view: null,
    show_limit: 10,
    initialize: function(){
        this.queries_view = new QueriesView({el:this.$('.QueriesView')});
        this.model.on('update', this.render, this);
        this.model.on('change:current_word', function(){
            this.render_queries();
            this.fix_css();
        }, this);
		this.render();
        this.render_queries();
	},
	render: function(){
        var $word_list = this.$('.word-list');
        $word_list.empty();
        var words = this.model.get('words');
        var self = this;
        var counter = 0;
        for(var i in words){
            var view = new WordView(words[i]);
            // HACK?
            words[i].view = view;
            var self = this;
            view.on("open", function(view){
                self.model.set('current_word', view.word);
            });
            view.on("hide", function(view){
                view.word.hidden = true;
                self.model.trigger("update");
                //if(self.model.get('current_word')==view.word)
                //    self.model.set('current_word', null);
            });
            view.on("delete", function(view){
                self.model.removeWord(view.word);
            });
            $word_list.append(view.$el);
            if(++counter==this.show_limit)
                break;
        }

        if(this.show_limit >= this.model.get('words').length)
            this.$('.load_more').addClass('hidden');
        else
            this.$('.load_more').removeClass('hidden');

        this.render_queries();
        this.fix_css();
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
            if(w.view)
                w.view.setCurrent(false);
        });
        w.view.setCurrent(true);
    },
    fix_css: function(){
        if(this.model.get('current_word')){
            this.$el.addClass('open');
            // this.$('.left').css({
            //     'position': 'absolute',
            //     'overflow-y': 'scroll',
            //     'height': '100%'
            // });
            // this.$('footer').addClass('hidden');
            //this.$('.right').addClass('col-xs-offset-12 col-sm-offset-6 col-md-offset-4');
        }else{
            this.$el.removeClass('open');
            //this.$('.right').removeClass('col-xs-offset-12 col-sm-offset-6 col-md-offset-4');
        }// if no word
    },
	events:{
        "click #share-fb": "share_fb",
        "click .load_more": "show_more"
	},
    show_more: function(){
        if(this.show_limit >= this.model.get('words').length)
            return;
        switch(this.show_limit){
            case 10:
                this.show_limit = 100;
                break;
            case 100:
                this.show_limit = 1000;
                break;
            default:
                this.show_limit += 1000;
        }
        this.render();
    },
    show_less: function(){

    },
    get_text_for_sharing: function(){
        var words = this.model.get('words');
        var self = this;
        var arr = [];
        for(var i in words){
            var w = words[i];
            arr.push((+i+1)+') "'+w.word +'"');
        }
        return "My top-10 internet searches:   \n"+arr.join(" \n");
    },
    share_fb: function(evt){
        evt.preventDefault();
        evt.stopPropagation();
        var text = this.get_text_for_sharing();
        console.log(text);
        FB.ui({
            method: 'share',
            href: 'https://searchhistoryanalyzer.github.io',
            quote: text
        }, function(response){console.log(response);});
    }
});
