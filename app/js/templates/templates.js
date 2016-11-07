this["WordCloud"] = this["WordCloud"] || {};
this["WordCloud"]["Templates"] = this["WordCloud"]["Templates"] || {};

this["WordCloud"]["Templates"]["app-layout"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<header id=\"header\"></header>\n<main id=\"main\"></main>";
},"useData":true});

this["WordCloud"]["Templates"]["error-screen"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<section id=\"error\" class=\"page-content\">\n  <div class=\"error-notice\">\n    <p class=\"error-message\">"
    + container.escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"message","hash":{},"data":data}) : helper)))
    + "</p>\n  </div>\n</section>\n";
},"useData":true});

this["WordCloud"]["Templates"]["header"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div id=\"header-inner\" class=\"header-inner\">\n\n  <div class=\"brand\">\n    <h1 class=\"brand-title\">"
    + container.escapeExpression(((helper = (helper = helpers.appTitle || (depth0 != null ? depth0.appTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"appTitle","hash":{},"data":data}) : helper)))
    + "</h1>\n  </div>\n\n</div>\n";
},"useData":true});

this["WordCloud"]["Templates"]["loading-screen"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<section id=\"loading\">\n  <div class=\"loader\">Loading...</div>\n</section>\n";
},"useData":true});

this["WordCloud"]["Templates"]["topic-cloud-item"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " is-selected";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a class=\"topic-select\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n  <span class=\"topic-name sentiment-"
    + alias4(((helper = (helper = helpers.sentimentClass || (depth0 != null ? depth0.sentimentClass : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sentimentClass","hash":{},"data":data}) : helper)))
    + " popularity-"
    + alias4(((helper = (helper = helpers.popularityClass || (depth0 != null ? depth0.popularityClass : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"popularityClass","hash":{},"data":data}) : helper)))
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.selected : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "</span>\n</a>\n";
},"useData":true});

this["WordCloud"]["Templates"]["topic-cloud-list"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<section class=\"topic-cloud\">\n  <ul class=\"topic-cloud-list\">\n  </ul>\n</section>\n                                                                                       ";
},"useData":true});

this["WordCloud"]["Templates"]["topic-info"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<section class=\"topic-info\">\n  <p class=\"topic-info-title\">Information on topic: "
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "</p>\n  <p class=\"topic-info-total-mentions\">Total mentions: "
    + alias4(((helper = (helper = helpers.volume || (depth0 != null ? depth0.volume : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"volume","hash":{},"data":data}) : helper)))
    + "</p>\n  <p class=\"topic-info-sentiment-count\">Positive mentions: <span class=\"sentiment-positive\">"
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? depth0.sentiment : depth0)) != null ? stack1.attributes : stack1)) != null ? stack1.positive : stack1), depth0))
    + "</span></p>\n  <p class=\"topic-info-sentiment-count\">Neutral mentions: "
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? depth0.sentiment : depth0)) != null ? stack1.attributes : stack1)) != null ? stack1.neutral : stack1), depth0))
    + "</p>\n  <p class=\"topic-info-sentiment-count\">Negative mentions: <span class=\"sentiment-negative\">"
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? depth0.sentiment : depth0)) != null ? stack1.attributes : stack1)) != null ? stack1.negative : stack1), depth0))
    + "</span></p>\n</section>\n";
},"useData":true});

this["WordCloud"]["Templates"]["topics-screen"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<section id=\"topics\" class=\"page-content\">\n\n  <div id=\"topic-cloud\" class=\"screen-left\">\n  </div>\n\n  <div id=\"topic-detail\" class=\"screen-right\">\n  </div>\n\n</section>\n";
},"useData":true});