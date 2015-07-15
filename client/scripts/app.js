// YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  timeStamp: new Date("October 13, 1976 11:13:00")
  //add room array as a property
};

// Use the browser's built-in functionality to quickly and safely escape the
// string
var escapeHtml = function (str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};
 
// makes a new room?
app.init = function(){
  var url = window.location.href;
  for (var i = url.length - 1; i >= 0; i--) {
    if (url[i]==='='){
      app.username = url.slice(i+1);
    }
  }
  console.log(app.username);
  app.fetch();
};



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

    app.addMessage();
  });
};



app.clearMessages = function(){
  $('.allMessages').html('');
  app.timeStamp = new Date("October 13, 1976 11:13:00");
};


app.filterMessages = function(room){
  var messages = app.messages.reverse();
  
  _.filter(messages, function(obj){
    var dateString = new Date(obj.createdAt);
    return dateString > app.timeStamp;
  });

  // filter by room if defined
};



app.addMessage = function(messagesArray){
  console.log("trying to add new messages");



  for (var i = 0; i < app.messages.length; i++) {
    console.log("found a new message!");
    
    var message = $('<div class = "message" />');
    $('.allMessages').prepend(message);

    var userName = '@' + escapeHtml( app.messages[i].username );
    userName = $(('<span class = "userName">' + userName + '</span>'));
    var dateCreated = escapeHtml( app.messages[i].createdAt );
    dateCreated = $(('<span class = "dateCreated">'+ dateCreated +'</span>'));
    var updatedAt = escapeHtml( app.messages[i].updatedAt );
    updatedAt = $(('<span class = "updatedAt">' + updatedAt +'</span>'));
    var text = escapeHtml( app.messages[i].text );
    text = $(('<span class = "text">' + text + '</span>'));

    message.append(userName, userName, dateCreated, updatedAt, text);
  }

  app.timeStamp = new Date();
};

app.addRoom = function(){};

app.init();

setInterval(function(){
  app.fetch();
}, 1500);



// app.send(message);
$(document).ready(function(){
  $("#messageSubmission").on('submit', function(event){
    var msg = $(".message").val();
    $(".message").val('');
    
    var message = {
      username: app.username,
      text : msg,
      roomname: 'lobby'
    };
    app.send(message);

    event.preventDefault();
  });
});

/*

$('#submitButton').on('click', function(){

  var msg = $("#messageField").val();

  var twt = {user: usr, message: msg, created_at: new Date()};

  addTweet(twt);
  loadTweets();

  $('#messageField').val('');

});

*/
