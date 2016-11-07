/**********************************************************************************/
/*  Top level Controller, works at same level as router.
/**********************************************************************************/

WordCloud.RouterController = Backbone.Marionette.Object.extend({

  // appData for all other screens
  appData: null,

  // Backbone router radio channel
  // used to tell the header which landing page should be active in the nav
  routerChannel: null,

  // top app Layout containing the views
  appLayout: null,

/* --- Initialisation code: init modules and pass them the data they need  --- */

  initialize: function(config) {

    // main app passes data to router controller
    this.appData = config.appData;

    // radio channel used to tell the header which landing page should be active in the nav
    this.routerChannel = Backbone.Radio.channel('router');

    // init applayout that contains all the main views, depending of which route is requested
    this.appLayout = new WordCloud.AppLayout({
      appData: this.appData
    });
  },

/* --- Renders the app layout  --- */

  // this is called by the main app before showing the first view
  initialRender: function() {
    this.appLayout.render();
  },

/* --- the router tells the app layout to show a specific child view in the 'main' region, depending of which route is requested --- */

  showLoadingScreen: function() {
    this.appLayout.showLoadingScreen();
  },

  showErrorScreen: function() {
    this.appLayout.showErrorScreen('server');
  },

  showPageNotFound: function() {
    this.appLayout.showErrorScreen('pageNotFound');
  },

  showTopicsScreen: function() {
    this.appLayout.showTopicsScreen();
  }
});
