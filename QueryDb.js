define([], function(){

Word = function(word){
    this.word = word;
    this.hidden = false;

    var queries = [];
    var different_days = 0;     // -1 for nothing
    var sorted = false;

    this.getDifferentDays = function(){
        if(different_days < 0){
            different_days = 0;
            var hash = {};
        	for(var i=0; i<queries.length; i++){
        		hash[queries[i].date.toDateString()] = true;
        	}
        	different_days = Object.keys(hash).length;
        }// if not computed
        return different_days;
    }

    this.addQuery = function(q){
        queries.push(q);
        different_days = -1;
        sorted = false;
    }

    this.removeQuery = function(q){
        for(var i in queries){
            if(queries[i]==q){
                queries.splice(i, 1);
                break;
            }// if
        }
        different_days = -1;
    }

    this.getQueries = function(){
        if(!sorted){
            queries.sort(function(a,b){
                    return b.date.getTime() - a.date.getTime(); // newest to oldest
            });
            sorted = true;
        }
        return queries;         // not meant to be changed
    }
}

Query = function(str, date){
    this.query = str;
    this.date = date;
}

QueryDb = function(){
    var sorted_words = [];      // i->Word
    var sorted_words_ok = true;
    var hashed_words = {};      // str->Word
    var stopwords = {'to':1, 'of':1, 'in':1, 'for':1, 'not':1, 'the':1, 'and':1, 'on':1, 'from':1, 'is':1, 'a':1, 'or':1, 'no':1, 'an':1, 'by':1, 'with':1, 'as':1, 'at':1, 'you':1, 'set':1, 'в':1, 'на':1, 'и':1, 'для':1, 'как':1, 'по':1, 'с':1, 'из':1, 'не':1, 'от':1, 'к':1, 'что':1, 'porn': 1, 'порно':1, 'pornhub':1, 'xvideos':1, 'xrest':1, 'чкуые':1, 'ogli':1};

    var normalize_word = function(w){
        w = w.toLowerCase();
        if(w in stopwords)
            return undefined;
        return w.replace(/[^a-zA-Zа-яА-Я0-9:\.іїє]/g,'');
    }

    var split_query_text = function(text){
        var arr = text.split(/[\s,.\\\/\|\[\]\(\)\!@#\$%\^&\*-+=:]/);
        var arr2 = [];
        for(i in arr){
            var w = normalize_word(arr[i]);
            if(w)
                arr2.push(w);
        }
        return arr2;
    }

    var bring_sorted_words = function(){
        if(sorted_words_ok)
            return;
        sorted_words = [];
        for(k in hashed_words){
        	sorted_words.push(hashed_words[k]);
        }
        sorted_words.sort(function(a,b){
        	return b.getDifferentDays() - a.getDifferentDays();
        });
        sorted_words_ok = true;
    }

    this.addQuery = function(q){
        var arr = split_query_text(q.query);
        for(var i in arr){
            var w = arr[i];
            if(!hashed_words[w])
    	       hashed_words[w] = new Word(w);
    		hashed_words[w].addQuery(q);
        }// for
        sorted_words_ok = false;
    };
    this.removeQuery = function(q){
        var arr = split_query_text(q.query);
        for(var i in arr){
            var w = arr[i];
            hashed_words[w].removeQuery(q);
        }// for
        sorted_words_ok = false;
    };
    this.removeWord = function(str){
        str = normalize_word(str);
        var w = hashed_words[str];
        if(!w)
            return;
        var queries = w.getQueries().slice();   // copy
        for(var i in queries){
            this.removeQuery(queries[i]);
        }// for
        delete hashed_words[str];
        sorted_words_ok = false;
    };
    this.hideWord = function(str){
    };
    this.unhideWord = function(str){
    };
    this.wordIterator = function(){
        bring_sorted_words();
        var it = new (function(){
            var i = 0;
            this.hasNext = function(){
                var j = i+1;
                while(j<sorted_words.length && sorted_words[j].hidden)
                    j++;
                return j<sorted_words.length;
            };
            this.next = function(){
                var j = i+1;
                while(j<sorted_words.length && sorted_words[j].hidden)
                    j++;
                assert(j<sorted_words.length);
                var ret = sorted_words[i];
                i = j
                return ret;
            };
        })();
        return it;
    }
}
});
