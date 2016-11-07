/*******************************************************************/
/*  Collection and item views for the Topic Cloud
/*******************************************************************/

/*******************************************************************/
/*    Topic Cloud item view
/*******************************************************************/

WordCloud.TopicCloudItemView = Backbone.Marionette.ItemView.extend({

  tagName: 'li',
  className: 'topic-item',

  template: WordCloud.Templates['topic-cloud-item'],

  ui: { 
    select: '.topic-select'
  },

  events: { 
    'click @ui.select': 'onTopicClicked'  
  },

  modelEvents: {
    // rerender the topic when the selected state changes
    'change': 'render'
  },

  onTopicClicked: function(e) {
    // send an event telling the top UI view that the topic has been clicked
    this.triggerMethod('topic:selected');
  }

});

/*******************************************************************/
/*    Topic Cloud collection view
/*    Use composite views instead of collection views because collection views don't have their own template
/*    children are inserted directly in a plain div, so awful for CSS
/*******************************************************************/

WordCloud.TopicCloudListView = Backbone.Marionette.CompositeView.extend({

  template: WordCloud.Templates['topic-cloud-list'],

  behaviors: {
    // prevent backbone from wrapping the template inside an extra div
    // only remove the wrapper if the template has one inbuilt (i.e. a single top child element)
    removeTemplateWrapperBehavior: {
      behaviorClass: RemoveTemplateWrapperBehavior
    }
  },

  childView: WordCloud.TopicCloudItemView,

  childViewContainer: '.topic-cloud-list'

});
