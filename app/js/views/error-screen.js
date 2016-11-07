/*******************************************************************/
/*   View: Error Screen
/*******************************************************************/

WordCloud.ErrorScreen = Backbone.Marionette.ItemView.extend({

  template: WordCloud.Templates['error-screen'],

  // error type passed on by app
  errorType: '',

  // display message explaining error type
  message: '',

  initialize: function(options) {

    this.errorType = options.errorType;

    if (this.errorType === 'server') {
      this.message = 'There was a problem getting data from the server. Please wait a few minutes and try reloading the app.'
    }
    else if (this.errorType === 'pageNotFound') {
      this.message = 'The page you requested was not found.'
    }
  },

  templateHelpers: function () {
    return {
      message: this.message
    };
  }

});
