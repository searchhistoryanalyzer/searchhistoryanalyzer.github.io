define(["ui/ViewRoot", "model/QueryDbModel"], function() {
AppModel = Backbone.Model.extend({
		view_root: null,
        query_db_model: null,
        router: null,
		defaults:{
            current_screen: "WelcomeScreen"
		},
		initialize: function(){
            this.query_db_model = new QueryDbModel();
			this.view_root = new ViewRoot({model: this, el: $('.ViewRoot')});

            var self = this;
            this.router = new Backbone.Router();
            this.router.route("", "home", function(){
                self.set('current_screen', 'WelcomeScreen');
            });
            this.router.route(":screen", "screen", function(screen){
                if(screen=="results"){
                    // TODO Special way to mark HACKs like this? (move it to speial place)
                    if(self.query_db_model.get('words').length==0)
                        window.location.href = "/#";
                    else
                            self.set('current_screen', 'ResultsScreen');
                }
                else
                    assert(false);
            });

            this.on("change:current_screen", function(){
                var screen = this.get('current_screen');
                if(screen=="WelcomeScreen")
                    this.router.navigate("");
                else if(screen=="ResultsScreen")
                    this.router.navigate("results");
            });

            Backbone.history.start();
		}
});
});// define
