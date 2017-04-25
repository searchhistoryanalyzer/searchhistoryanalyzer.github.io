requirejs(["ui/ViewRoot"], function() {
App = Backbone.Model.extend({
		view_root: null,
		defaults:{
		},
		initialize: function(){
			this.view_root = new ViewRoot({model: this, el: $('.ViewRoot')});
		}
});

$(function(){
	app = new App();
});

});// requirejs
