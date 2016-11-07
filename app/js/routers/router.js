
WordCloud.Router = Backbone.Marionette.AppRouter.extend({

  appRoutes: {
    // show a spinning wheel while the core data has not been fetched yet
    'loading(/)': 'showLoadingScreen',
    // set the default root screen here
    '(/)': 'showTopicsScreen',
    // top level routes (from navbar or other clickable links)
    'topics(/)': 'showTopicsScreen',
    // error screen if server error
    'error(/)': 'showErrorScreen',
    // error screen if page not found
    // call it ourselves
    'pagenotfound(/)': 'showPageNotFound',
    // or the user types wrong link in navbar of link contains non-existent route
    '*path'  : 'showPageNotFound'
  },

  // keep track whether the app core data has been fetched
  // this is to handle the case when the user is trying to reload on a specific view, we need to fetche the data and wait before rendering the view
  appDataFetched: false,

  // list all the routes that are allowed before data is fetched
  // MM: !!! in execute method 'name' is not the name of the route but the name of the callback method!!! so test on it
  routesAllowedBeforeDataFetched: [
    'showLoadingScreen',
    'showErrorScreen',
    'showPageNotFound'
  ],

  // called directly main app when app core data has been fetched
  // from then on, it's OK to navigate to content views
  // needs to be called by main itself when it catched the event from data controller rather than wait for router to catch event in its own time
  // because staight after the main app will try to navigate to content view, so navigation needs to be unlocked in router.
  onDataFetched: function() {
    this.appDataFetched = true;
  },

  // method is called internally within the router, whenever a route matches and its corresponding callback is about to be executed
  // Return false from execute to cancel the current transition.
  // MM: !!! 'name' is not the name of the route but the name of the callback method!!! so test on it
  execute: function(callback, args, name, test) {

    // if data has not been fetched, check wether the route is allowed or block it otherwise
    if (!this.appDataFetched) {

      var routeAllowed = false;
      for (var i=0; i<this.routesAllowedBeforeDataFetched.length; i++) {
        if (name.match(this.routesAllowedBeforeDataFetched[i])) {
          routeAllowed = true;
          break;
        }
      }

      if (!routeAllowed) {
        // returning false prevents the route from executing
        return false;
      }
    }

    if (callback) callback.apply(this, args);
  }

});
