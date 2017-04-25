define(["ui/ViewRoot", "model/QueryDbModel"], function() {
AppModel = Backbone.Model.extend({
		view_root: null,
        query_db_model: null,
		defaults:{
            current_screen: "WelcomeScreen"
		},
		initialize: function(){
            this.query_db_model = new QueryDbModel();
			this.view_root = new ViewRoot({model: this, el: $('.ViewRoot')});
		}
});
});// define
