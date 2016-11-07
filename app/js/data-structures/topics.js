/* ------------------------------------------------------------------------------ */
/*   Topics nested Models and Collections
/* ------------------------------------------------------------------------------ */

/* --- Models and collections nested within Topic model --- */

WordCloud.Sentiment = Backbone.Model.extend({

  defaults: {
    negative: 0,
    neutral: 0,
    positive: 0
  }
});

WordCloud.PageType = Backbone.Model.extend({

  defaults: {
    blog: 0,
    facebook: 0,
    forum: 0,
    general: 0,
    image: 0,
    news: 0,
    review: 0,
    twitter: 0,
    video: 0,
  }
});

WordCloud.Day = Backbone.Model.extend({

  defaults: {
    date: '',
    volume: 0
  }
});

WordCloud.Days = Backbone.Collection.extend({
  model: WordCloud.Day
});

WordCloud.Query = Backbone.Model.extend({

  defaults: {
    id: 0,
    name: '',
    volume: 0
  }
});

WordCloud.Queries = Backbone.Collection.extend({
  model: WordCloud.Query
});

/* --- Topic model --- */
WordCloud.Topic = Backbone.Model.extend(_.extend(

  // backone-nestify mixin defines the nested structure of models and collections
  nestify({

    'sentiment': WordCloud.Sentiment,
    'pageType': WordCloud.PageType,
    'days': WordCloud.Days,
    'queries': WordCloud.Queries

  }),

  // default attributes and properties not using nestify
  {
    defaults: {
      // theses attibutes are retrieved directly from the server data
      id: '',
      label: '',
      volume: 0,
      type: '',
      sentimentScore: 0,
      burst: 0,
      // theses attibutes are computed from the server data
      // sentiment class depends only on topic's own score so calculated on parse
      sentimentClass: 'neutral',
      // popularity class depends on topic volume relative to other topics in the collection
      // so calculated by the data manager, can't be calculated on individual item parse
      popularityClass: 0,
      // selected by user or not
      selected: false
    },

    // Format the raw data fetched from server
    parse : function(response, options){

      // sentimentClass is neutral by default if no sentiment score data available
      // set it to positive / negative if sentiment data is available
      if (response.sentimentScore) {
        if (response.sentimentScore > 60) {
          response.sentimentClass = 'positive';
        }
        else if (response.sentimentScore < 40) {
          response.sentimentClass = 'negative';
        }
      }
      return response;
    }

  }
));

/* --- Topics Collection --- */

// Topics collection as loaded from server
WordCloud.Topics = Backbone.Collection.extend({

  // Reference to this collection's model.
  model: WordCloud.Topic,

  initialize : function(models,options) {
    this.url = options.url;
  },

  // Parse backbone function allow to manipulate the raw data fetched from server
  parse : function(response, options){

    // in the JSON file the collection is inside a 'topics' wrapper so we extract it
    return response.topics;
  }

});

// collection of shuffled topics for local display only
WordCloud.ShuffledTopics = Backbone.Collection.extend({

  // Reference to this collection's model.
  model: WordCloud.Topic

});
