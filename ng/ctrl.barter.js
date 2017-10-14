angular.module("app").controller("BarterCtrl", function ($scope,$routeParams,ChatSvc,UserSvc) {

  var barterController = {};
  barterController.otherUser = $routeParams.otheruser;
  barterController.user = "";
  $scope.otherUser = barterController.otherUser;

  // get's current user's name.
  UserSvc.returnSessionUserName().then(function(userName){
    barterController.user = userName;
  })

  // a reverse loop to populate message container.
  ChatSvc.getRecentMessages($routeParams.otheruser).then(function(conv){
    for(var x = conv.length-1; x>=0; x--){
      createBubble(conv[x]);
    }
  })

  var socket = io.connect("http://localhost:3000");
  // Query DOM
  var message = document.getElementById('barter_input_message');
  // Emit events
  document.getElementById("barter_input_message")
      .addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode == 13 && message.value != "" ) {
        socket.emit('chat', {
            body: message.value,
            user: barterController.user
        });
        ChatSvc.sendMessage(barterController.otherUser,message.value);
        message.value = "";
      }
  });

  // Listen for events
  socket.on('chat', function(data){
      createBubble(data);
  });

  // creates bubble based on User and Body
  // can be used for uploading and also live update.
  // them container scrolls to last message.
  function createBubble(MessageContent){
    var classes = ["message__item message__item--bot","message message--bot"]
    if(MessageContent.author === barterController.user || MessageContent.user == barterController.user ){
      classes[0] = "message__item message__item--user";
      classes[1] = "message message--user";
    }
    var div_message_list = document.createElement("div");
    div_message_list.className = "message__list";
    var div_message = document.createElement("div");
    div_message.className = classes[0];
    var span_message = document.createElement("span");
    // simple approach of preventing script injection
    span_message.innerHTML = MessageContent.body.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    span_message.className = classes[1];
    div_message.appendChild(span_message);
    div_message_list.appendChild(div_message);
    if(document.getElementById("barter_message_content"))
      document.getElementById("barter_message_content").appendChild(div_message_list);

    var d = document.getElementById("barter_message_content");
    d.scrollTop = d.scrollHeight;
  }

  $scope.$on('$destroy', function() {
    socket.removeAllListeners();
  });

});
