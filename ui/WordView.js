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
        "click": "on_click_word"
	},
    setCurrent: function(flag){
        if(flag)
            this.$el.addClass('current');
        else
            this.$el.removeClass('current');
    },
    on_click_word: function(){
        this.trigger("open", this);
    }
});
