/*******************************************************************/
/*   View: Header View
/*   here the header is minimal, just a title, so it could be put directly in the app layout without being a child view
/*   however, a separate header view makes the app easily extensible if we wanted to add a navbar to switch between views
/*******************************************************************/

WordCloud.HeaderView = Backbone.Marionette.ItemView.extend({

  template: WordCloud.Templates['header'],

  appData: null,

  behaviors: {
    // prevent backbone from wrapping the template inside an extra div]
    // only remove the wrapper if the template has one inbuilt (i.e. a single top child element)
    removeTemplateWrapperBehavior: {
      behaviorClass: RemoveTemplateWrapperBehavior
    }
  },

  initialize: function(options) {
    this.appData = options.appData;
  },

  templateHelpers: function() {
    return {
      appTitle: this.appData.appTitle
    };
  }

});
