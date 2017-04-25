define(["QueryDb"], function() {
QueryDbModel = Backbone.Model.extend({
        _query_db: new QueryDb(),
		defaults:{
            words: [],
            current_word: null
		},
		initialize: function(){
            this.on('update', this.update, this);
            this.update();
		},
        addQuery: function(q, options){
            var options = options || {};
            this._query_db.addQuery(q);
            if(!options.silent)
                this.trigger("update");
        },
        removeQuery: function(q, options){
            var options = options || {};
            this._query_db.removeQuery(q);
            if(!options.silent)
                this.trigger("update");
        },
        update: function(){
            var words = [];
            var it = this._query_db.wordIterator();
            var count = 0;
            while(it.hasNext()){
                var w = it.next();
                words.push(w);
                if(++count>=100)
                    break;
            }
            this.set('words', words);
        }
});
});// define
