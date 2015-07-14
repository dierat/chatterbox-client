// YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox'
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
  $.get('https://api.parse.com/1/classes/chatterbox', function(data, status){
    console.log("get request sent! received ", JSON.stringify(data), " and ", status);
    var messages = data.results;
    for (var i = 0; i < messages.length; i++) {
      //create escaping function
      var escaper = function(str){
        //split string into an array, 
        var split = str.split('');
        //then loop over array
        _.map(split, function(c, i, split){
        //get char code and replace in array
          return '' + c.charCodeAt(0) + '';
        });
        //rejoin and return
        return split.join('');
      }

      console.log(escaper('Hailey!!!><*& &^$*% Foster????'));

      var message = $('.allMessages').append('<div class = "message">');
      var userName = $(('<span class = "userName">@'+ messages[i].username+'</span>'));
      var dateCreated = $(('<span class = "dateCreated">'+ messages[i].dateCreated+'</span>'));
      var updatedAt = $(('<span class = "updatedAt">'+ messages[i].updatedAt+'</span>'));
      var text = $(('<span class = "text">'+ messages[i].text+'</span>'));
      message.append(userName, userName, dateCreated,updatedAt,text);
    }

  });
};

app.clearMessages = function(){};

app.addMessage = function(){};

app.addRoom = function(){};


// var $newdiv1 = $( "<div id='object1'/>" )

// var $tweet = $('<div class="tweet"><span class="user">@' + user + '</span> <span class="time">(' + time + ')</span>: <span class="message">' + message + '</span></div>');
