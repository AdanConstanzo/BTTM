angular.module("app").controller("BarterCtrl", function ($scope,$routeParams,ChatSvc,UserSvc) {

  var barterController = {};
  barterController.otherUser = $routeParams.otheruser;
  barterController.user = "";
  $scope.otherUser = barterController.otherUser;

  UserSvc.checkLogIn().then(function(userName){
    barterController.user = userName;
  })

  ChatSvc.getRecentMessages($routeParams.otheruser).then(function(conv){
    for(var x = conv.length-1; x>=0; x--){
      createBubble(conv[x]);
    }
  })

  var socket = io.connect("http://localhost:3000");
  // Query DOM
  var message = document.getElementById('message'),
        handle = document.getElementById('handle'),
        btn = document.getElementById('send'),
        output = document.getElementById('output'),
        feedback = document.getElementById('feedback');

  // Emit events
  btn.addEventListener('click', function(){
    socket.emit('chat', {
        body: message.value,
        user: barterController.user
    });
    ChatSvc.sendMessage(barterController.otherUser,message.value);
    message.value = "";
  });

  // Listen for events
  socket.on('chat', function(data){
      feedback.innerHTML = "";
      createBubble(data);
  });

  // Even listener for keypress.

  // message.addEventListener('keypress', function(){
  //     socket.emit('typing', handle.value);
  // })
  //
  // socket.on('typing', function(data){
  //     feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
  // });

  /*
  <div class="message__list">
    <div class="message__item message__item--bot">
      <span class="message message--bot">Bot falando aqui</span>
    </div>
  </div>
  */

  // creates bubble based on User and Body
  // can be used for uploading and also live update.
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
    span_message.innerHTML = MessageContent.body;
    span_message.className = classes[1];
    div_message.appendChild(span_message);
    div_message_list.appendChild(div_message);
    if(document.getElementById("barter_message_content"))
      document.getElementById("barter_message_content").appendChild(div_message_list);
      
    var d = document.getElementById("barter_message_content");
    d.scrollTop = d.scrollHeight;
  }

});
