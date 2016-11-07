/*******************************************************************/
/*   Topics Screen Layout View
/*******************************************************************/

WordCloud.TopicsLayoutView = Backbone.Marionette.LayoutView.extend({

  template: WordCloud.Templates['topics-screen'],

  behaviors: {
    // prevent backbone from wrapping the template inside an extra div]
    // only remove the wrapper if the template has one inbuilt (i.e. a single top child element)
    removeTemplateWrapperBehavior: {
      behaviorClass: RemoveTemplateWrapperBehavior
    }
  },

  regions: {
    topicList: '#topic-cloud',
    topicDetail: '#topic-detail'
  },

  // data passed on by root app, shared between views
  appData: null,

  // children views
  topicsListView: null,
  topicInfoView: null,

  childEvents: {
    // event fired when the user click a topic in the cloud
    'topic:selected': 'onTopicSelected'
  },
  
  // collection of shuffled topics for local display only
  shuffledTopics: null, 

  selectedTopicId: null,


  initialize: function(options) {

    this.appData = options.appData;

    // randomly shuffle the topics to display the cloud
    this.shuffledTopics = new WordCloud.ShuffledTopics(_.shuffle(this.appData.topics.models));

    // initialise the topic cloud child view
    this.topicsListView = new WordCloud.TopicCloudListView({
      collection: this.shuffledTopics
    });
  },

  onShow: function() {
    // show the topic cloud child view
    this.showChildView('topicList', this.topicsListView);
  },

  onBeforeDestroy: function() {
    // deselect previously selected topic if any, otherwise it would show as selected by default next time a view uses the data
    this.resetSelectedTopic();
  },

  // user clicked on a topic in the cloud
  onTopicSelected: function(childView) {

    var selectedTopic = childView.model;
    var selectedTopicId = selectedTopic.get('id');

    // if the user clicks on the already selected topic, nothing happens 
    if (this.selectedTopicId === selectedTopicId) {
      return;
    }

    // deselect previously selected topic if any
    this.resetSelectedTopic();

    // set new selected topic
    this.selectedTopicId = selectedTopicId;
    // set the topic as selected
    selectedTopic.set({selected: true});

    // show the new selected topic detail in the child view
    // initialise the topic cloud child view
    this.topicInfoView = new WordCloud.TopicInfoItemView({
      model: selectedTopic
    });
    this.showChildView('topicDetail', this.topicInfoView);

  },

  // deselect previously selected topic if any
  resetSelectedTopic: function() {

    if (this.selectedTopicId) {
      var previousTopic = this.shuffledTopics.findWhere({ id: this.selectedTopicId });
      previousTopic.set({selected: false});
    }
  }

});
