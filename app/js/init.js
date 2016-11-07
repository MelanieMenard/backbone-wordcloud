/*******************************************************************/
/*   Init code creating a instance of application
/*   This is the only code code that should go in document.ready
/*******************************************************************/


$(function () {
  'use strict';

  // Marionette app init config
  var appConfig = {
    appTitle : 'Word Cloud Demo App',
    container: '#demo-app',
    // if we fetched the data from a real server, this would be the server endpoint, but here the data is contained inside the webapp
    baseUrl: '',
    topicEndpoint: '/data/topics.json'
  };

  //create an instance of the App and start it
  window.wordCloudApp = new WordCloud(appConfig);
  wordCloudApp.start();

});
