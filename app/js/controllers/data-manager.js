/**********************************************************************************/
/*  Top level Controller responsible from getting data form server, and formatting it in a more useful way when necessary
/**********************************************************************************/

WordCloud.DataManager = Backbone.Marionette.Object.extend({

  // store in a app object all the data that needs to be shared with several modules (to reduce init boilerplate code)
  // empty object created by root app with this structure
  // the data manager is responsible for population the 'data' sub-object from the endpoints
  appData : null,

  // Backbone data radio channel
  // Data Manager uses it to broadcast a message that all data have been retrieved, or there was an error
  dataChannel: null,

  // these booleans keep track of which collections/models have been fetched successfully
  // when all data has been fetched, then we can tell the main app to show the main screen
  topicsFetched: false,

  // check that all core data amongst the above have been fetched
  coreDataFetched: false,

  // MM: when an error happens on data fetch, it is likely to happen several times (on each collection or model)
  // only do error handling once once
  errorHandlingInProgress: false,


/* --- Initialisation code  --- */

  initialize: function(config) {
    this.appData = config.appData;

    // Backbone data radio channel
    this.dataChannel = Backbone.Radio.channel('data');

    // create data structures (collections and models) with endpoint urls
    this.initData();

    // fetch data from server
    this.fetchData();
  },

  initData: function() {

    // create data collections with endpoint url for topics
    this.appData.topics = new WordCloud.Topics(
      null,
      { url: this.appData.endpoints.topic }
    );
  },

  fetchData: function() {

    this.errorHandlingInProgress = false;

    // capture 'this' for callbacks
    var me = this;

    // get topics
    this.appData.topics.fetch({
      reset: true,
      // comment out request header as we are fetching JSON from a local file
      //headers: this.appData.requestHeader,
      success: function(model, response, options) {
        var dataName = "topics";
        me.dataFetchSuccess(model, response, options, dataName);
      },
      error: function(model, response, options) {
        var dataName = "topics";
        me.dataFetchError(model, response, options, dataName);
      }
    });


  },

  dataFetchSuccess: function(model, response, options, dataName) {

    // mark the collection that was fetched
    if (dataName === "topics") {
      this.topicsFetched = true;
      // calculate topic popularity relative to other topics in collection
      this.calculateTopicPopularity();
    }
    
    // check whether all core data have been fetched (unless it's already set and we're fetching additional data)
    // Core data means the data we need to show any content screen, that it's not possible to fail gracefully if it does not get fetched
    if (!this.coreDataFetched) {
      this.checkCoreDataFetched();
    }

  },

  dataFetchError: function(model, response, options, dataName) {

    // MM: when an error happens on data fetch, it is likely to happen several times (on each collection or model)
    // only do error handling once once
    if (!this.errorHandlingInProgress) {

      this.errorHandlingInProgress = true;

      // formatErrorMessage method is on ErrorHandlerMixin
      var formattedError = this.formatErrorMessage(response);

      // emit an event telling the data fetch error on the data channel
      this.dataChannel.trigger('data:fetch:error', formattedError);
    }
  },

  checkCoreDataFetched: function() {

    // check the individual boolean for each collection that is part of core data
    if (this.topicsFetched) {
      this.coreDataFetched = true;
    }
      
    // tell the main app all data have been fetched, so it can route to the main screen
    this.dataChannel.trigger('data:fetched');
  },

  // calculate topic popularity relative to other topics in collection
  calculateTopicPopularity: function() {

    var topics = this.appData.topics;

    // find the maximum and minimum popularity value
    var volumeArray = topics.pluck('volume');
    var volumeMax = _.max(volumeArray);
    var volumeMin = _.min(volumeArray);

    // linear scale is the default choice to plot unknown data
    //var popularityScale = d3.scaleLinear();
    // however here we have one topic which is much more popular than other which skews the distribution
    // and the brief said to use 6 font sizes
    // mapping the data on a log scale allows all font sizes except band 5 to be actually used in the cloud
    // so I choose it for this example
    // however it's only a suitable choice because of this partcular data set and the brief to use 6 font sizes
    // if we were pulling real data from an API that would change over time
    // then I think it is likely we would use a linear scale
    var popularityScale = d3.scaleLog();
    popularityScale.domain([volumeMin, volumeMax]).range([1,6]);

    // set each topic popularity based on its relative volume compared to all other topics
    topics.each(function (topic) {

      var topicVolume = topic.get('volume');
      var topicPopularity = Math.round (popularityScale(topicVolume));
      topic.set({popularityClass: topicPopularity});

    });

  }

});

// Copy the errorHandler mixin methods to WordCloud.DataManager
_.extend(WordCloud.DataManager.prototype, ErrorHandlerMixin);
