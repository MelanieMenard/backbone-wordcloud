/*******************************************************************/
/*   use Marionette.Application to namespace to avoid creating an empty object
/*******************************************************************/

var WordCloud = Backbone.Marionette.Application.extend({

  // store in a appData object all the data that needs to be shared with generic modules [to reduce init boilerplate code]
  // it's only 'leaf views' (with no child views) which get passed only the data they need
  appData: {

    // app title
    appTitle: null,

    // API data endpoints
    endpoints: {
      topic: null
    },

    // data fetched by data manager is stored in appData shared object, so all modules in app can access it
    topics: null,

    // request header to use in all the XHR requests (depends what the server of the API where the app gets the data needs)
    requestHeader: null

  },

  // top level controller responsible for getting the data from server
  dataManager: null,

  // app top level controller and router
  routerController: null,
  router: null,

  // Backbone data radio channel
  // Data Manager uses it to broadcast a message that all data have been retrieved, or there was an error
  dataChannel: null,

  // Backbone router radio channel
  // this is used by views to trigger navigation to a different route
  routerChannel: null,

  // when the user reloads on a bookmarked view, we need to load the data first
  // then redirect to the view once the data is loaded
  redirectTo: {
    // path will be used if history pushstate is enabled
    pathname: null,
    // hash will be use for old style # internal links
    hash: null
  },

  // variable to hold server setTimeout
  serverTimeout: null,


/* --- Initialisation code: init modules and pass them the data they need  --- */

  initialize: function(config) {

    // init AppData object
    this.initAppData(config);

    // radio channel to tell when data has been loaded from server
    this.dataChannel = Backbone.Radio.channel('data');

    // data fetch error is sent by data manager when there was a XHR error fetching data
    // in that case we need to clear the login/token and log in from scratch
    this.listenTo(this.dataChannel, 'data:fetch:error', this.onDataFetchError);

    // sent by Data manager when all data have been fetched, so the app can route to the main screen
    this.listenTo(this.dataChannel, 'data:fetched', this.onDataFetched);

    // radio channel used by views to trigger navigation to a different route
    this.routerChannel = Backbone.Radio.channel('router');

    // views send an event telling main app to navigate to another view
    this.listenTo(this.routerChannel, 'navigate:to:page', this.navigateToPage);

    // top level controller responsible for getting the data from server
    this.dataManager = new WordCloud.DataManager({
      appData: this.appData
    });

    // app top level controller and router
    this.routerController = new WordCloud.RouterController({
      appData: this.appData
    });

    this.router = new WordCloud.Router({
      controller: this.routerController
    });
  },

  // init AppData object
  initAppData: function(config) {

    this.appData.appTitle = config.appTitle;

    // set data endpoints from config on main app object
    this.appData.endpoints.topic = config.baseUrl + config.topicEndpoint;

    /// init request header for all XHR requests (depend what the API needs)
    this.appData.requestHeader = {
      'Content-Type': 'application/json'
    };
  },


/* --- Start code: start app once all submodules have been created  --- */

  onStart: function() {

    // to detect if the user is trying to load a specific page
    this.detectUrl();

    // render the base layout before allowing routing to any view
    this.routerController.initialRender();

    // start router history
    // MM: {pushState: true} enables url without # but the server needs to be able to cope with them and serve the app
    //Backbone.history.start({pushState: true});
    Backbone.history.start();

    // fetch the data asynchronously
    this.dataManager.fetchData();

    // set a timeout where we just assume a server error after 30 seconds if the server does not return a response itself
    var me = this;
    this.serverTimeout = setTimeout(function(){ me.onServerTimeout(me); }, 30000);

    // navigate to the first screen
    this.router.navigate('loading', {trigger: true});

  },

/* --- Code dealing with router urls  --- */

  // detect if the user is trying to load a specific page
  detectUrl: function() {

    // path will be used if history pushstate is enabled
    // do not store is pathname is just root '/'
    if (window.location.pathname && window.location.pathname !== '/' && !window.location.pathname.match(/login/)) {
      this.redirectTo.pathname = window.location.pathname;
    }
    // hash will be use for old style  internal links
    if (window.location.hash && !window.location.hash.match(/login/)) {
      this.redirectTo.hash = window.location.hash;
    }
  },

  // clear the redirect once we have navigated to it
  clearRedirect: function() {
    this.redirectTo.pathname = null;
    this.redirectTo.hash = null;
  },

/* --- Code waiting for messages from data manager module  --- */

  // set a timeout where we just assume a server error after 3 seconds if the server does not return a response itself
  onServerTimeout: function(me) {

    // clear serverTimeout
    clearTimeout(me.serverTimeout);

    // redirect to server error screen
    me.router.navigate('error', {trigger: true});
  },

  // data fetch error is sent by data manager when there was a XHR error fetching data
  onDataFetchError: function(formattedError) {

    // clear serverTimeout
    clearTimeout(this.serverTimeout);

    // redirect to server error screen
    me.router.navigate('error', {trigger: true});

  },

  // data fetched is sent by Data manager when all data have been fetched, so the app can route to the main screen
  onDataFetched: function() {

    // clear serverTimeout
    clearTimeout(this.serverTimeout);

    // tell router that data has been fetched, so it stops blocking navigation to content views
    this.router.onDataFetched();

    // if the user originally tried to load a specific page, redirect to it
    if (this.redirectTo.pathname) {
      this.router.navigate(this.redirectTo.pathname, {trigger: true});
    }
    else if (this.redirectTo.hash) {
      this.router.navigate(this.redirectTo.hash, {trigger: true});
    }
    // otherwise show the topics page by default
    else {
      this.router.navigate('topics', {trigger: true});
    }

    // clear the redirect now that we've navigated to the desired page
    this.clearRedirect();

  },

  /* --- Code waiting for messages from views asking to route to another view  --- */

  // views send an event telling main app to navigate to another view
  // - routeBase: mandatory
  // - routeParam: optional
  navigateToPage: function(routeBase, routeParam) {

    var  fullRoute = routeBase;

    if (routeParam) {
      // add / separator if not already trailing end of base route
      if (fullRoute.slice(-1) !== '/') {
        fullRoute += '/';
      }
      fullRoute += routeParam;
    }

    this.router.navigate(fullRoute, {trigger: true});
  }

});

// Copy the errorHandler mixin methods to WordCloud app
_.extend(WordCloud.prototype, ErrorHandlerMixin);
