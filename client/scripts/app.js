// YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  timeStamp: new Date("October 13, 1976 11:13:00")
};

// Use the browser's built-in functionality to quickly and safely escape the
// string
var escapeHtml = function (str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};
 
// UNSAFE with unsafe strings; only use on previously-escaped ones!
var unescapeHtml = function (escapedStr) {
    var div = document.createElement('div');
    div.innerHTML = escapedStr;
    var child = div.childNodes[0];
    return child ? child.nodeValue : '';
};

// makes a new room?
app.init = function(){};

app.send = function(data){
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function(){

  var readyState = $.get('https://api.parse.com/1/classes/chatterbox', function(data, status){

    app.messages = data.results;

    // console.log("data = ", data);
    return data.results;
  });
};

app.clearMessages = function(){};

app.addMessage = function(){

  console.log("app.messages = ", app.messages);
//need to get dates to compare with each other

// their date comes in this format: 2015-07-14T03:16:38.685Z

  for (var i = 0; i < app.messages.length; i++) {
    var dateString = new Date(app.messages[i].createdAt);
    if (dateString > app.timeStamp){
      
      var message = $('.allMessages').append('<div class = "message">');

      var userName = '@' + escapeHtml( app.messages[i].username );
      userName = $(('<span class = "userName">' + userName + '</span>'));
      var dateCreated = escapeHtml( app.messages[i].createdAt );
      dateCreated = $(('<span class = "dateCreated">'+ dateCreated +'</span>'));
      var updatedAt = escapeHtml( app.messages[i].updatedAt );
      updatedAt = $(('<span class = "updatedAt">' + updatedAt +'</span>'));
      var text = escapeHtml( app.messages[i].text );
      text = $(('<span class = "text">' + text + '</span>'));
      message.append(userName, userName, dateCreated,updatedAt,text);
    }
  }

  app.timeStamp = new Date();
};

app.addRoom = function(){};

setInterval(function(){
  app.fetch();
}, 1500);




// var $newdiv1 = $( "<div id='object1'/>" )

// var $tweet = $('<div class="tweet"><span class="user">@' + user + '</span> <span class="time">(' + time + ')</span>: <span class="message">' + message + '</span></div>');
