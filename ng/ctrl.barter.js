angular.module("app").controller("BarterCtrl", function ($scope, $routeParams, ChatSvc, UserSvc, TradingItemSvc) {

  var barterController = {};
  barterController.otherUser = $routeParams.otheruser;
  barterController.user = "";
  $scope.otherUser = barterController.otherUser;
  $scope.CurrentUserItems = null;
  // IOVANNI's CODE
  var EnableDrag = function(GalleryName,TrashName,ContainmentName) {
        // There's the gallery and the trash
        var $gallery = $("#"+GalleryName),
          $trash = $("#"+TrashName);

        // Let the gallery items be draggable
        $("li", $gallery).draggable({

          cancel: "a.ui-icon", // clicking an icon won't initiate dragging
          revert: "invalid", // whcontainment-wrapperen not dropped, the item will revert back to its initial position
          containment: "#"+ContainmentName,
          helper: "clone",
          cursor: "move"
        });

        // Let the trash be droppable, accepting the gallery items
        $trash.droppable({
          accept: "#"+GalleryName+" > li",
          classes: {
            "ui-droppable-active": "ui-state-highlight"
          },
          drop: function (event, ui) {
            deleteImage(ui.draggable);
          }
        });

        // Let the gallery be droppable as well, accepting items from the trash
        $gallery.droppable({
          accept: "#"+TrashName+" li",
          classes: {
            "ui-droppable-active": "custom-state-active"
          },
          drop: function (event, ui) {
            recycleImage(ui.draggable);
          }
        });

        // Image deletion function
        var recycle_icon = "<a title='Remove this image' class='ui-icon ui-icon-refresh'>Remove Item</a>";
        function deleteImage($item) {
          $item.fadeOut(function () {
            var $list = $("ul", $trash).length ?
              $("ul", $trash) :
              $("<ul class='"+GalleryName+" ui-helper-reset'/>").appendTo($trash);

            $item.find("a.ui-icon-transferthick-e-w").remove();
            $item.append(recycle_icon).appendTo($list).fadeIn(function () {
              $item
                .animate({ width: "48px" })
                .find("img")
                .animate({ height: "36px" });
            });
          });
        }

        // Image recycle function
        var trash_icon = "<a title='Remove this image' class='ui-icon ui-icon-transferthick-e-w'>Delete image</a>";
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
        $("ul."+GalleryName+" > li").on("click", function (event) {
          var $item = $(this),
            $target = $(event.target);

          if ($target.is("a.ui-icon-transferthick-e-w")) {
            deleteImage($item);
          } else if ($target.is("a.ui-icon-zoomin")) {
            viewLargerImage($target);
          } else if ($target.is("a.ui-icon-refresh")) {
            recycleImage($item);
          }

          return false;
        });
    }
  //for the other user


  TradingItemSvc.getAllUserTradingItems($routeParams.otheruser)
    .then(function (OtherUserItems) {
        var gallery2 = document.getElementById("gallery2");
        for (x in OtherUserItems) {
            gallery2.appendChild(createLiItemHtml(OtherUserItems[x]));
        }
        EnableDrag("gallery2","trash2","containment-wrapper2");
    })

  function createLiItemHtml(item) {
      var li = document.createElement("li");
      li.className = "draggable ui-widget-content ui-corner-tr";
      var h5 = document.createElement("h5");
      h5.className = "ui-widget-header";
      h5.innerHTML = item.name;
      var img = document.createElement("img");
      img.src = item.image.path200;
      img.width = "96";
      img.height = "72";
      var a_bart = document.createElement("a");
      a_bart.title = "Barter this image";
      a_bart.className = "ui-icon ui-icon-transferthick-e-w"
      a_bart.innerHTML = "Barter Item";
      li.appendChild(h5);
      li.appendChild(img);
      li.appendChild(a_bart);
      return li;
  }


  // get's current user's name.
  UserSvc.returnSessionUserName().then(function (userName) {
    barterController.user = userName;
    TradingItemSvc.getAllUserTradingItems(userName)
        .then(function (CurrentUserItems) {
            var gallery = document.getElementById("gallery");
            for( x in CurrentUserItems) {
                gallery.appendChild(createLiItemHtml(CurrentUserItems[x]));
            }
            EnableDrag("gallery","trash","containment-wrapper");
        })
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
