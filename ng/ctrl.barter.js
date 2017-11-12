angular.module("app").controller("BarterCtrl", function ($scope, $routeParams, ChatSvc, UserSvc) {

  var barterController = {};
  barterController.otherUser = $routeParams.otheruser;
  barterController.user = "";
  $scope.otherUser = barterController.otherUser;

  
  $(function () {

    // There's the gallery and the trash
    var $gallery = $("#gallery"),
      $trash = $("#trash");

    // Let the gallery items be draggable
    $("li", $gallery).draggable({

      cancel: "a.ui-icon", // clicking an icon won't initiate dragging
      revert: "invalid", // when not dropped, the item will revert back to its initial position
      containment: "#containment-wrapper",
      helper: "clone",
      cursor: "move"
    });

    // Let the trash be droppable, accepting the gallery items
    $trash.droppable({
      accept: "#gallery > li",
      classes: {
        "ui-droppable-active": "ui-state-highlight"
      },
      drop: function (event, ui) {
        deleteImage(ui.draggable);
      }
    });

    // Let the gallery be droppable as well, accepting items from the trash
    $gallery.droppable({
      accept: "#trash li",
      classes: {
        "ui-droppable-active": "custom-state-active"
      },
      drop: function (event, ui) {
        recycleImage(ui.draggable);
      }
    });

    // Image deletion function
    var recycle_icon = "<a href='link/to/recycle/script/when/we/have/js/off' title='Remove this image' class='ui-icon ui-icon-refresh'>Remove Item</a>";
    function deleteImage($item) {
      $item.fadeOut(function () {
        var $list = $("ul", $trash).length ?
          $("ul", $trash) :
          $("<ul class='gallery ui-helper-reset'/>").appendTo($trash);

        $item.find("a.ui-icon-trash").remove();
        $item.append(recycle_icon).appendTo($list).fadeIn(function () {
          $item
            .animate({ width: "48px" })
            .find("img")
            .animate({ height: "36px" });
        });
      });
    }

    // Image recycle function
    var trash_icon = "<a href='link/to/trash/script/when/we/have/js/off' title='Remove this image' class='ui-icon ui-icon-trash'>Delete image</a>";
    function recycleImage($item) {
      $item.fadeOut(function () {
        $item
          .find("a.ui-icon-refresh")
          .remove()
          .end()
          .css("width", "96px")
          .append(trash_icon)
          .find("img")
          .css("height", "72px")
          .end()
          .appendTo($gallery)
          .fadeIn();
      });
    }

    // Image preview function, demonstrating the ui.dialog used as a modal window
    function viewLargerImage($link) {
      var src = $link.attr("href"),
        title = $link.siblings("img").attr("alt"),
        $modal = $("img[src$='" + src + "']");

      if ($modal.length) {
        $modal.dialog("open");
      } else {
        var img = $("<img alt='" + title + "' width='384' height='288' style='display: none; padding: 8px;' />")
          .attr("src", src).appendTo("body");
        setTimeout(function () {
          img.dialog({
            title: title,
            width: 400,
            modal: true
          });
        }, 1);
      }
    }

    // Resolve the icons behavior with event delegation
    $("ul.gallery > li").on("click", function (event) {
      var $item = $(this),
        $target = $(event.target);

      if ($target.is("a.ui-icon-trash")) {
        deleteImage($item);
      } else if ($target.is("a.ui-icon-zoomin")) {
        viewLargerImage($target);
      } else if ($target.is("a.ui-icon-refresh")) {
        recycleImage($item);
      }

      return false;
    });
  });

  //for the other user
  $(function () {
    
        // There's the gallery2 and the trash2
        var $gallery2 = $("#gallery2"),
          $trash2 = $("#trash2");
    
        // Let the gallery2 items be draggable
        $("li", $gallery2).draggable({
    
          cancel: "a.ui-icon", // clicking an icon won't initiate dragging
          revert: "invalid", // when not dropped, the item will revert back to its initial position
          containment: "#containment-wrapper2",
          helper: "clone",
          cursor: "move"
        });
    
        // Let the trash2 be droppable, accepting the gallery2 items
        $trash2.droppable({
          accept: "#gallery2 > li",
          classes: {
            "ui-droppable-active": "ui-state-highlight"
          },
          drop: function (event, ui) {
            deleteImage2(ui.draggable);
          }
        });
    
        // Let the gallery2 be droppable as well, accepting items from the trash2
        $gallery2.droppable({
          accept: "#trash2 li",
          classes: {
            "ui-droppable-active": "custom-state-active"
          },
          drop: function (event, ui) {
            recycleImage2(ui.draggable);
          }
        });
    
        // Image deletion function
        var recycle_icon2 = "<a href='link/to/recycle2/script/when/we/have/js/off' title='Remove this image' class='ui-icon ui-icon-refresh'>Remove Item</a>";
        function deleteImage2($item2) {
          $item2.fadeOut(function () {
            var $list2 = $("ul", $trash2).length ?
              $("ul", $trash2) :
              $("<ul class='gallery2 ui-helper-reset'/>").appendTo($trash2);
    
            $item2.find("a.ui-icon-trash").remove();
            $item2.append(recycle_icon2).appendTo($list2).fadeIn(function () {
              $item2
                .animate({ width: "48px" })
                .find("img")
                .animate({ height: "36px" });
            });
          });
        }
    
        // Image recycle function
        var trash_icon2 = "<a href='link/to/trash2/script/when/we/have/js/off' title='Remove this image' class='ui-icon ui-icon-trash'>Delete image</a>";
        function recycleImage2($item2) {
          $item2.fadeOut(function () {
            $item2
              .find("a.ui-icon-refresh")
              .remove()
              .end()
              .css("width", "96px")
              .append(trash_icon2)
              .find("img")
              .css("height", "72px")
              .end()
              .appendTo($gallery2)
              .fadeIn();
          });
        }
    
        // Image preview function, demonstrating the ui.dialog used as a modal window
        function viewLargerImage2($link2) {
          var src2 = $link2.attr("href"),
            title2 = $link2.siblings("img").attr("alt"),
            $modal2 = $("img[src$='" + src2 + "']");
    
          if ($modal2.length) {
            $modal2.dialog("open");
          } else {
            var img2 = $("<img alt='" + title + "' width='384' height='288' style='display: none; padding: 8px;' />")
              .attr("src", src2).appendTo("body");
            setTimeout(function () {
              img2.dialog({
                title: title,
                width: 400,
                modal: true
              });
            }, 1);
          }
        }
    
        // Resolve the icons behavior with event delegation
        $("ul.gallery2 > li").on("click", function (event) {
          var $item2 = $(this),
            $target2 = $(event.target);
    
          if ($target2.is("a.ui-icon-trash")) {
            deleteImage($item2);
          } else if ($target2.is("a.ui-icon-zoomin")) {
            viewLargerImage($target2);
          } else if ($target2.is("a.ui-icon-refresh")) {
            recycleImage($item2);
          }
    
          return false;
        });
      });
  //-----------------------------------------------------------------

  // get's current user's name.
  UserSvc.returnSessionUserName().then(function (userName) {
    barterController.user = userName;
  })

  // a reverse loop to populate message container.
  ChatSvc.getRecentMessages($routeParams.otheruser).then(function (conv) {
    for (var x = conv.length - 1; x >= 0; x--) {
      createBubble(conv[x]);
    }
  })

  var socket = io.connect("http://localhost:3000");
  // Query DOM
  var message = document.getElementById('barter_input_message');
  // Emit events
  document.getElementById("barter_input_message")
    .addEventListener("keyup", function (event) {
      event.preventDefault();
      if (event.keyCode == 13 && message.value != "") {
        socket.emit('chat', {
          body: message.value,
          user: barterController.user
        });
        ChatSvc.sendMessage(barterController.otherUser, message.value);
        message.value = "";
      }
    });

  // Listen for events
  socket.on('chat', function (data) {
    createBubble(data);
  });

  // creates bubble based on User and Body
  // can be used for uploading and also live update.
  // them container scrolls to last message.
  function createBubble(MessageContent) {
    var classes = ["message__item message__item--bot", "message message--bot"]
    if (MessageContent.author === barterController.user || MessageContent.user == barterController.user) {
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
    if (document.getElementById("barter_message_content"))
      document.getElementById("barter_message_content").appendChild(div_message_list);

    var d = document.getElementById("barter_message_content");
    d.scrollTop = d.scrollHeight;
  }

  $scope.$on('$destroy', function () {
    socket.removeAllListeners();
  });

});
