define_view("ui/ViewRoot", ["ui/WelcomeScreen", "ui/ResultsScreen"], {
	model: null,						// AppModel
	welcome_screen: null,
    results_screen: null,
	initialize: function(){
		this.welcome_screen = new WelcomeScreen({el:this.$('.WelcomeScreen'), model:this.model.query_db_model});
        this.results_screen = new ResultsScreen({el:this.$('.ResultsScreen'), model:this.model.query_db_model});
        //this.welcome_screen = new WelcomeScreen();
        this.model.on('change:current_screen', this.render, this);

        this.welcome_screen.on("next choose", function(){
            this.model.set('current_screen', "ResultsScreen");
        }, this);

		this.render();
	},
	render: function(){
        //this.$('.screens-list').empty();
        //this.$('.screens-list').append(this.welcome_screen.$el);
        this.$('.screen').removeClass('current');
        this.$('.'+this.model.get('current_screen')).addClass('current');
	},
	events:{
	}
});
