define_view("ui/WordView", [], {
    word: null,         // Word
	initialize: function(word){
        assert(word.word.trim()!="");
        this.word = word;
		this.render();
	},
	render: function(){
        this.$('.word').html(this.word.word+' - '+this.word.getDifferentDays()+' days '+this.word.getQueries().length+' queries');
	},
	events:{
        "click .word": "on_click_word"
	},
    on_click_word: function(){
        this.trigger("open", this);
    }
});
