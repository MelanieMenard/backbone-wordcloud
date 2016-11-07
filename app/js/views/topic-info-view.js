/*******************************************************************/
/*    Topic Info item view
/*******************************************************************/

WordCloud.TopicInfoItemView = Backbone.Marionette.ItemView.extend({

  template: WordCloud.Templates['topic-info'],

  behaviors: {
    // prevent backbone from wrapping the template inside an extra div
    // only remove the wrapper if the template has one inbuilt (i.e. a single top child element)
    removeTemplateWrapperBehavior: {
      behaviorClass: RemoveTemplateWrapperBehavior
    }
  },

  modelEvents: {
    // rerender the topic when the selected state changes
    'change': 'render'
  }

});