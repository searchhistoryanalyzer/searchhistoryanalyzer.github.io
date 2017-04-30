
function assert(cond, text){
	if(cond)
		return;
	if (typeof Error !== "undefined"){
		var e = new Error(text);
		//console.log(e);
		throw e;
	}
	else
		throw text;
}

function basename(path){
	path = path.split(/[\\\/]/);
	var file = path[path.length-1];
	file = file.split(".");
	if(file.length==1)
		return file[0];
	file.pop();
	return file.join("");
}

function define_view(path, depends, extend){
	define(["text!"+path+".html", "text!"+path+".css"].concat(depends), function(html, css){
		var name = basename(path);
		add_html(name+".html", html);
		add_css(name+".css", css);

		extend.name = name;
		window[name] = Backbone.View.extend(extend);
	});// define
}


add_html = function(name, html){
	var el = $("<script type='text/template' id='"+name+"'>"+html+"</script>");
	$('head').append(el);
}

add_css = function(name, css){
	var el = $("<style type=\"text/css\" id=\""+name+"\">\n" + css + "</style>\n");
	$('head').append(el);
	var sheet =el[0].sheet;
	var basename = (name.split('.'))[0];

	// get all rules
	var all = [];
	var r = false;
	var i = 0;
	try{
		if(sheet.cssRules){
			for(var j=0; j<sheet.cssRules.length; j++){
				r = sheet.cssRules[j];
				all.push({selectorText: r.selectorText, cssText: r.cssText});
			}
		}
	}catch(e){
		console.log("Exception:");
		console.log(e);
		return;
	}	// HACK: strange exception here in firefox...
	//remove all rules
	for(var i=all.length-1; i>=0; i--){
		sheet.deleteRule(i);
	}
	// add new rules
	for(var i=0; i<all.length; i++){
		var rules = all[i].cssText.replace(all[i].selectorText, "");
		var selectors = all[i].selectorText.split(",");
		selectors.forEach(function(el, j){
			if(el.indexOf("."+basename) == -1)
				selectors[j] = "."+basename+" "+el;
		});
		var new_selector = selectors.join(',');
		sheet.insertRule(new_selector+rules, i);
	}

}

copy_attributes_from_to = function(from, to){
    // copy general attributes
    var attrs = from.attributes;
    for(var i=0; i<from.attributes.length; i++){
        var attr = attrs[i];
        if(attr.name != 'class' && attr.name != 'style')
            to.setAttribute(attr.name, attr.value);
    }// for

    // merge classes
    var classes_from = from.classList;
    var classes_to = to.classList;
    for(var i=0; i<classes_from.length; i++){
        classes_to.add(classes_from[i]);
    }

    // merge styles
    var styles_from = from.style;
    var styles_to = to.style;
    for(var k in styles_from){
        styles_to[k] = styles_from[k];
    }
}

Backbone.View = Backbone.View.extend({
		constructor:function(options){
			// copied from Backbone
			this.cid = _.uniqueId('view');
			_.extend(this, _.pick(options, ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events']));
			this._ensureElement();
			// end

			// add html
			if(this.name){
				var $js_el = $("#"+this.name+"\\.html");
				var html = $js_el.html();
				var el = $(html);
                // TODO: join here attributes and styles from original element - or warn about their removal!?
                copy_attributes_from_to(this.el, el.filter('*')[0]);
				this.$el.replaceWith(el);
				this.setElement(el);
			}

			this.initialize.apply(this, arguments);
		}
});
