/*************************************************************/
/* Error handler mixin 
/* to avoid repeating code in business logic modules because Marionette behaviors only share code snippets between views
/*************************************************************/

var ErrorHandlerMixin = {

  formatErrorMessage: function(response) {

    // object containing error parameters
    var formattedError = {
      // error code: 0 = unknown error
      errorCode: 0,
      // user friendly error message to display
      errorMessage: '',
      // action = what to do depending on the error type:
      // - 'error': redirect to error screen with a message
      // - 'stay': stay on current screen and display error message
      action: 'stay'
    };

    // find error code in the response object provided by the server
    if (response.status) {
      formattedError.errorCode = response.status;
    }
    
    // user friendly error message starts with error code, then we add some custom text
    formattedError.errorMessage = formattedError.errorCode ? 'Error '+formattedError.errorCode+'. ' : 'Unknown error. ';

    // find some useful text in the response object provided by the server
    if (response.statusText) {
      formattedError.errorMessage += response.statusText;
    }

    return formattedError;
  }
}
