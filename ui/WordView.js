define_view("ui/WordView", [], {
    word: null,         // Word
    current: false,
	initialize: function(word){
        assert(word.word.trim()!="");
        this.word = word;
		this.render();
	},
	render: function(){
        this.$('.word').html(this.word.word);
        this.$('.metadata').html(this.word.getDifferentDays()+' days '+this.word.getQueries().length+' queries');
	},
	events:{
        "click .word": "on_click_word",
        "click #link-view-queries": "on_click_word",
        "mouseover .btn-group": function(){
            this.$('.btn-group>button').addClass('btn-default');
            this.$('.btn-group>button').removeClass('btn-link');
        },
        "mouseout .btn-group": function(){
            this.$('.btn-group>button').addClass('btn-link');
            this.$('.btn-group>button').removeClass('btn-default');
        },
        "click #link-hide": "on_hide",
        "click #link-delete": "on_delete",
        "click #link-ignore": "on_ignore"
	},
    setCurrent: function(flag){
        if(flag)
            this.$el.addClass('current');
        else
            this.$el.removeClass('current');
    },
    on_click_word: function(evt){
        evt.preventDefault();
        this.trigger("open", this);
    },
    on_hide: function(evt){
        evt.preventDefault();
        this.trigger('hide', this);
    },
    on_delete: function(evt){
        evt.preventDefault();
        this.trigger("delete", this);
    },
    on_ignore: function(evt){
        evt.preventDefault();
        this.trigger("ignore", this);
    }
});
