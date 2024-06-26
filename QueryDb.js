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
    var stopwords = new Set( ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "50", "100", "1000", "какие", "able","about","above","abroad","according","accordingly","across","actually","adj","after","afterwards","again","against","ago","ahead","ain't","all","allow","allows","almost","alone","along","alongside","already","also","although","always","am","amid","amidst","among","amongst","an","and","another","any","anybody","anyhow","anyone","anything","anyway","anyways","anywhere","apart","appear","appreciate","appropriate","are","aren't","around","as","a's","aside","ask","asking","associated","at","available","away","awfully","back","backward","backwards","be","became","because","become","becomes","becoming","been","before","beforehand","begin","behind","being","believe","below","beside","besides","best","better","between","beyond","both","brief","but","by","came","can","cannot","cant","can't","caption","cause","causes","certain","certainly","changes","clearly","c'mon","co","co.","com","come","comes","concerning","consequently","consider","considering","contain","containing","contains","corresponding","could","couldn't","course","c's","currently","dare","daren't","definitely","described","despite","did","didn't","different","directly","do","does","doesn't","doing","done","don't","down","downwards","during","each","edu","eg","eight","eighty","either","else","elsewhere","end","ending","enough","entirely","especially","et","etc","even","ever","evermore","every","everybody","everyone","everything","everywhere","ex","exactly","example","except","fairly","far","farther","few","fewer","fifth","first","five","followed","following","follows","for","forever","former","formerly","forth","forward","found","four","from","further","furthermore","get","gets","getting","given","gives","go","goes","going","gone","got","gotten","greetings","had","hadn't","half","happens","hardly","has","hasn't","have","haven't","having","he","he'd","he'll","hello","help","hence","her","here","hereafter","hereby","herein","here's","hereupon","hers","herself","he's","hi","him","himself","his","hither","hopefully","how","howbeit","however","hundred","i'd","ie","if","ignored","i'll","i'm","immediate","in","inasmuch","inc","inc.","indeed","indicate","indicated","indicates","inner","inside","insofar","instead","into","inward","is","isn't","it","it'd","it'll","its","it's","itself","i've","just","k","keep","keeps","kept","know","known","knows","last","lately","later","latter","latterly","least","less","lest","let","let's","like","liked","likely","likewise","little","look","looking","looks","low","lower","ltd","made","mainly","make","makes","many","may","maybe","mayn't","me","mean","meantime","meanwhile","merely","might","mightn't","mine","minus","miss","more","moreover","most","mostly","mr","mrs","much","must","mustn't","my","myself","name","namely","nd","near","nearly","necessary","need","needn't","needs","neither","never","neverf","neverless","nevertheless","new","next","nine","ninety","no","nobody","non","none","nonetheless","noone","no-one","nor","normally","not","nothing","notwithstanding","novel","now","nowhere","obviously","of","off","often","oh","ok","okay","old","on","once","one","ones","one's","only","onto","opposite","or","other","others","otherwise","ought","oughtn't","our","ours","ourselves","out","outside","over","overall","own","particular","particularly","past","per","perhaps","placed","please","plus","possible","presumably","probably","provided","provides","que","quite","qv","rather","rd","re","really","reasonably","recent","recently","regarding","regardless","regards","relatively","respectively","right","round","said","same","saw","say","saying","says","second","secondly","see","seeing","seem","seemed","seeming","seems","seen","self","selves","sensible","sent","serious","seriously","seven","several","shall","shan't","she","she'd","she'll","she's","should","shouldn't","since","six","so","some","somebody","someday","somehow","someone","something","sometime","sometimes","somewhat","somewhere","soon","sorry","specified","specify","specifying","still","sub","such","sup","sure","take","taken","taking","tell","tends","th","than","thank","thanks","thanx","that","that'll","thats","that's","that've","the","their","theirs","them","themselves","then","thence","there","thereafter","thereby","there'd","therefore","therein","there'll","there're","theres","there's","thereupon","there've","these","they","they'd","they'll","they're","they've","thing","things","think","third","thirty","this","thorough","thoroughly","those","though","three","through","throughout","thru","thus","till","to","together","too","took","toward","towards","tried","tries","truly","try","trying","t's","twice","two","un","under","underneath","undoing","unfortunately","unless","unlike","unlikely","until","unto","up","upon","upwards","us","use","used","useful","uses","using","usually","v","value","various","versus","very","via","viz","vs","want","wants","was","wasn't","way","we","we'd","welcome","well","we'll","went","were","we're","weren't","we've","what","whatever","what'll","what's","what've","when","whence","whenever","where","whereafter","whereas","whereby","wherein","where's","whereupon","wherever","whether","which","whichever","while","whilst","whither","who","who'd","whoever","whole","who'll","whom","whomever","who's","whose","why","will","willing","wish","with","within","without","wonder","won't","would","wouldn't","yes","yet","you","you'd","you'll","your","you're","yours","yourself","yourselves","you've","zero","a","how's","i","when's","why's","b","c","d","e","f","g","h","j","l","m","n","o","p","q","r","s","t","u","uucp","w","x","y","z","I","www","amount","bill","bottom","call","computer","con","couldnt","cry","de","describe","detail","due","eleven","empty","fifteen","fifty","fill","find","fire","forty","front","full","give","hasnt","herse","himse","interest","itse”","mill","move","myse”","part","put","show","side","sincere","sixty","system","ten","thick","thin","top","twelve","twenty","abst","accordance","act","added","adopted","affected","affecting","affects","ah","announce","anymore","apparently","approximately","aren","arent","arise","auth","beginning","beginnings","begins","biol","briefly","ca","date","ed","effect","et-al","ff","fix","gave","giving","heres","hes","hid","home","id","im","immediately","importance","important","index","information","invention","itd","keys","kg","km","largely","lets","line","'ll","means","mg","million","ml","mug","na","nay","necessarily","nos","noted","obtain","obtained","omitted","ord","owing","page","pages","poorly","possibly","potentially","pp","predominantly","present","previously","primarily","promptly","proud","quickly","ran","readily","ref","refs","related","research","resulted","resulting","results","run","sec","section","shed","shes","showed","shown","showns","shows","significant","significantly","similar","similarly","slightly","somethan","specifically","state","states","stop","strongly","substantially","successfully","sufficiently","suggest","thered","thereof","therere","thereto","theyd","theyre","thou","thoughh","thousand","throug","til","tip","ts","ups","usefully","usefulness","'ve","vol","vols","wed","whats","wheres","whim","whod","whos","widely","words","world","youd","youre", "а","е","и","ж","м","о","на","не","ни","об","но","он","мне","мои","мож","она","они","оно","мной","много","многочисленное","многочисленная","многочисленные","многочисленный","мною","мой","мог","могут","можно","может","можхо","мор","моя","моё","мочь","над","нее","оба","нам","нем","нами","ними","мимо","немного","одной","одного","менее","однажды","однако","меня","нему","меньше","ней","наверху","него","ниже","мало","надо","один","одиннадцать","одиннадцатый","назад","наиболее","недавно","миллионов","недалеко","между","низко","меля","нельзя","нибудь","непрерывно","наконец","никогда","никуда","нас","наш","нет","нею","неё","них","мира","наша","наше","наши","ничего","начала","нередко","несколько","обычно","опять","около","мы","ну","нх","от","отовсюду","особенно","нужно","очень","отсюда","в","во","вон","вниз","внизу","вокруг","вот","восемнадцать","восемнадцатый","восемь","восьмой","вверх","вам","вами","важное","важная","важные","важный","вдали","везде","ведь","вас","ваш","ваша","ваше","ваши","впрочем","весь","вдруг","вы","все","второй","всем","всеми","времени","время","всему","всего","всегда","всех","всею","всю","вся","всё","всюду","г","год","говорил","говорит","года","году","где","да","ее","за","из","ли","же","им","до","по","ими","под","иногда","довольно","именно","долго","позже","более","должно","пожалуйста","значит","иметь","больше","пока","ему","имя","пор","пора","потом","потому","после","почему","почти","посреди","ей","два","две","двенадцать","двенадцатый","двадцать","двадцатый","двух","его","дел","или","без","день","занят","занята","занято","заняты","действительно","давно","девятнадцать","девятнадцатый","девять","девятый","даже","алло","жизнь","далеко","близко","здесь","дальше","для","лет","зато","даром","первый","перед","затем","зачем","лишь","десять","десятый","ею","её","их","бы","еще","при","был","про","процентов","против","просто","бывает","бывь","если","люди","была","были","было","будем","будет","будете","будешь","прекрасно","буду","будь","будто","будут","ещё","пятнадцать","пятнадцатый","друго","другое","другой","другие","другая","других","есть","пять","быть","лучше","пятый","к","ком","конечно","кому","кого","когда","которой","которого","которая","которые","который","которых","кем","каждое","каждая","каждые","каждый","кажется","как","какой","какая","кто","кроме","куда","кругом","с","т","у","я","та","те","уж","со","то","том","снова","тому","совсем","того","тогда","тоже","собой","тобой","собою","тобою","сначала","только","уметь","тот","тою","хорошо","хотеть","хочешь","хоть","хотя","свое","свои","твой","своей","своего","своих","свою","твоя","твоё","раз","уже","сам","там","тем","чем","сама","сами","теми","само","рано","самом","самому","самой","самого","семнадцать","семнадцатый","самим","самими","самих","саму","семь","чему","раньше","сейчас","чего","сегодня","себе","тебе","сеаой","человек","разве","теперь","себя","тебя","седьмой","спасибо","слишком","так","такое","такой","такие","также","такая","сих","тех","чаще","четвертый","через","часто","шестой","шестнадцать","шестнадцатый","шесть","четыре","четырнадцать","четырнадцатый","сколько","сказал","сказала","сказать","ту","ты","три","эта","эти","что","это","чтоб","этом","этому","этой","этого","чтобы","этот","стал","туда","этим","этими","рядом","тринадцать","тринадцатый","этих","третий","тут","эту","суть","чуть","тысяч"]);

    var normalize_word = function(w){
        w = w.toLowerCase();
        if(stopwords.has(w))
            return undefined;
        return w.replace(/[^a-zA-Zа-яА-Я0-9:\.іїє]/g,'');
    }

    var remove_specials = function(text){
        text = text.replace(/site:.*\s$/, "");
        text = text.replace(/site:.*$/, "");
        text = text.replace(/\w*url:.*\s$/, "");
        text = text.replace(/\w*url:.*$/, "");
        text = text.replace(/link:.*\s$/, "");
        text = text.replace(/link:.*$/, "");
        text = text.replace(/filetype:.*\s$/, "");
        text = text.replace(/filetype:.*$/, "");
        return text;
    }

    var split_query_text = function(text){
        text = remove_specials(text);

        var arr = text.split(/[\s,.\\\/\|\[\]\(\)\!@#\$%\^&\*-+=:\"\']/);
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
    this.removeWord = function(str_or_word){
        var w;
        if(str_or_word instanceof Word)
            w = str_or_word;
        else{
            str = normalize_word(str);
            w = hashed_words[str];
        }
        if(!w)
            return;
        var queries = w.getQueries().slice();   // copy
        for(var i in queries){
            this.removeQuery(queries[i]);
        }// for
        delete hashed_words[w.word];
        sorted_words_ok = false;
    };
    this.wordIterator = function(){
        bring_sorted_words();
        var it = new (function(){
            var i = 0;
            this.hasNext = function(){
                var j = i;
                while(j<sorted_words.length && sorted_words[j].hidden)
                    j++;
                return j<sorted_words.length;
            };
            this.next = function(){
                var j = i;
                while(j<sorted_words.length && sorted_words[j].hidden)
                    j++;
                assert(j<sorted_words.length);
                var ret = sorted_words[j];
                i = j+1;
                return ret;
            };
        })();
        return it;
    }
}
});
