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
        removeWord: function(w, options){
            var options = options || {};
            this._query_db.removeWord(w);
            if(!options.silent)
                this.trigger("update");
        },
        update: function(){
            var words = [];
            var it = this._query_db.wordIterator();
            //var count = 0;
            var found_current = false;
            while(it.hasNext()){
                var w = it.next();

                if(w.getDifferentDays()<3)
                    break;

                words.push(w);
                if(w==this.get('current_word'))
                    found_current = true;

                //if(++count>=10)
                //    break;
            }
            this.set('words', words);
            if(!found_current)
                this.set('current_word', null);
        }
});
});// define
