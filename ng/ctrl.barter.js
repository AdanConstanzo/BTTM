angular.module("app").controller("BarterCtrl", function ($scope, $routeParams, $location, ChatSvc, UserSvc, TradingItemSvc, OfferSvc) {

  var barterController = {};
  barterController.otherUser = $routeParams.otheruser;
  barterController.user = "";
  barterController.userTag = ""
  $scope.otherUser = barterController.otherUser;
  $scope.CurrentUserItems = null;
  barterController.UserItems = [];
  barterController.OtherUserItems = [];
  barterController.Items_User = {};
  barterController.Items_Other_User = {};
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
            if (GalleryName === "gallery") {
                barterController.UserItems.push($item.attr("data"));
            } else if (GalleryName === "gallery2") {
                barterController.OtherUserItems.push($item.attr("data"));
            }

            $item.fadeOut(function () {
                var $list = $("ul", $trash).length ?
                $("ul", $trash) :
                $("<ul class='"+GalleryName+" ui-helper-reset'/>").appendTo($trash);
                $list.attr("id",GalleryName+"_ul_item");
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
            if (GalleryName === "gallery") {
                barterController.UserItems = removeElementByValue(barterController.UserItems,$item.attr("data"));
            } else if (GalleryName === "gallery2") {
                barterController.OtherUserItems = removeElementByValue(barterController.OtherUserItems,$item.attr("data"));
            }

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
            barterController.Items_Other_User[OtherUserItems[x]._id] = OtherUserItems[x];
            if(!OtherUserItems[x].traded){
                gallery2.appendChild(createLiItemHtml(OtherUserItems[x]));
            }

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
      li.setAttribute("data",item._id);
      return li;
  }

  function removeElementByValue(arr,value) {
      for(x in arr) {
          if(value === arr[x]){
              arr.splice(x,1);
              return arr;
          }
      }
  }

  function greaterString(s1,s2){
    if(s1>s2)
      return [s1,s2];
    return [s2,s1];
  }

  // get's current user's name.
  UserSvc.returnSessionUserName().then(function (userName) {
      var stringParams = greaterString(userName,$routeParams.otheruser);
      barterController.userTag = stringParams[0]+'-'+stringParams[1];
    barterController.user = userName;
    //barterController.userTag
    TradingItemSvc.getAllUserTradingItems(userName)
        .then(function (CurrentUserItems) {
            var gallery = document.getElementById("gallery");
            for( x in CurrentUserItems) {
                barterController.Items_User[CurrentUserItems[x]._id] = CurrentUserItems[x];
                if(!CurrentUserItems[x].traded){
                    gallery.appendChild(createLiItemHtml(CurrentUserItems[x]));
                }
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

  var socket = io.connect("https://lit-ridge-83847.herokuapp.com");
  // Query DOM
  var message = document.getElementById('barter_input_message');
  // Emit events
  document.getElementById("barter_input_message")
    .addEventListener("keyup", function (event) {
      event.preventDefault();
      if (event.keyCode == 13 && message.value != "") {
        socket.emit('chat', {
          body: message.value,
          user: barterController.user,
          tag: barterController.userTag
        });
        ChatSvc.sendMessage(barterController.otherUser, message.value);
        message.value = "";
      }
    });

  // Listen for events
  socket.on('chat', function (data) {
      if(data.tag === barterController.userTag){
          createBubble(data);
      }

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

    if(MessageContent.offerId) {
        div_message.id = MessageContent.offerId;
        span_message.id = MessageContent.offerId;
    }

    if (MessageContent.special === "OD") {
        span_message.style.color = "purple";
    }

    if (document.getElementById("barter_message_content"))
      document.getElementById("barter_message_content").appendChild(div_message_list);

    var d = document.getElementById("barter_message_content");
    d.scrollTop = d.scrollHeight;
  }


  $scope.$on('$destroy', function () {
    socket.removeAllListeners();
  });

  function throwError() {
      document.getElementById("barter_h4_error").style.display = "block";
  }

  // ng-click that submits offers.
  $scope.SubmitOffer = function() {
      document.getElementById("barter_h4_error").style.display = "none";

      if (barterController.UserItems.length == 0 || barterController.OtherUserItems.length == 0) {
          throwError();
          return;
      }
      var modalCreation = createModal(barterController.UserItems,barterController.OtherUserItems,true);
      var offer = {
          User_offer_username: barterController.user,
          User_other_username: $routeParams.otheruser,
          User_offer_items: barterController.UserItems,
          User_other_items: barterController.OtherUserItems
      }
      OfferSvc.makeOffer(offer)
        .then(function (doc) {
            doc.shift();
            var docId = doc[0]._id;
            var message = "See "+barterController.user+"'s offer to "+ $routeParams.otheruser +" -: " + docId.substr(docId.length - 5)
            modalCreation[0].id = "modal_"+docId;
            modalCreation[1].onclick = function(){
                $scope.redirect = true;
            }
            modalCreation[2].onclick = function () {
                $scope.redirect = false;
            }
            modalCreation[3].id = "modal_footer_" + docId;
            document.getElementById("collectionOfModals").appendChild(modalCreation[0]);
            socket.emit('chat', {
              body: message,
              user: barterController.user,
              offerId: docId,
              tag: barterController.userTag
            });
            ChatSvc.sendMessageWithOfferID(barterController.otherUser, message,docId);
            removeItems();
        });
  }


  function removeItems() {
      var gallery_ul_item = document.getElementById("gallery_ul_item"),
      gallery2_ul_item = document.getElementById("gallery2_ul_item");
      // this is hard coded. If any issues. Come here!
      for (var i = 0; i < gallery_ul_item.children.length; i++) {
          gallery_ul_item.children[i].children[2].click();
      }
      // this is hard coded. If any issues. Come here!
      for (var i = 0; i < gallery2_ul_item.children.length; i++) {
           gallery2_ul_item.children[i].children[2].click();
      }
  }

  // Function that creates a modal.
  // UserArray is the current user's array of items.
  // OtherArray is the other user's array of items.
  // OrderCase determines wheter if it's the User's offer or other user offer.
  function createModal (UserArray,OtherArray,OrderCase) {

      var user = barterController.user,
      otherUser = $routeParams.otheruser;

      var modalDiv = document.createElement("div"),
      modalDialog = document.createElement("div"),
      modalContent = document.createElement("div"),
      modalHeader = document.createElement("div"),
      modalBody = document.createElement("div"),
      modalFooter = document.createElement("div");
      modalDiv.className = "modal fade";
      modalDialog.className = "modal-dialog";
      modalContent.className = "modal-content";
      modalHeader.className = "modal-header";
      modalBody.className = "modal-body";
      modalFooter.className = "modal-footer";
      var headerString = user + "'s Tradding Offer To " + otherUser;
      if(!OrderCase){
          headerString = otherUser + "'s Tradding Offer To " + user;
      }

      var h2_title = document.createElement("h2");
      h2_title.innerHTML = headerString;
      modalHeader.appendChild(h2_title);

      var divRow = document.createElement("div");
      divRow.className = "row";
      modalBody.appendChild(divRow);
      var divBody1 = document.createElement("div"),
      divBody2 = document.createElement("div"),
      divBody3 = document.createElement("div");

      divBody1.className = "col-md-5";
      divBody2.className = "col-md-2";
      divBody3.className = "col-md-5";

      var img = document.createElement("img");
      img.src = "images/trade.png";
      img.style.width = "50px";
      img.style.height = "50px";

      createImageItem(UserArray,barterController.Items_User,divBody1);
      createImageItem(OtherArray,barterController.Items_Other_User,divBody3);
      divBody2.appendChild(img);
      divRow.appendChild(divBody1);
      divRow.appendChild(divBody2);
      divRow.appendChild(divBody3);

      var modalDivFoot = document.createElement("div");
      var h3 = document.createElement("h3");
      h3.innerHTML = "Do you want to accept the offer?";
      var a_yes = document.createElement("a");
      var a_no = document.createElement("a");
      a_yes.className = "btn btn-default";
      a_yes.setAttribute("role","button");
      a_yes.innerHTML = "Yes";
      a_yes.setAttribute("data-dismiss","modal");
      a_no.className = "btn btn-default";
      a_no.setAttribute("role","button");
      a_no.setAttribute("data-dismiss","modal");
      a_no.innerHTML = "No";
      modalDivFoot.appendChild(h3);
      modalDivFoot.appendChild(a_yes);
      modalDivFoot.appendChild(a_no);
      modalFooter.appendChild(modalDivFoot);

      modalContent.appendChild(modalHeader);
      modalContent.appendChild(modalBody);
      if(!OrderCase) {
          modalContent.appendChild(modalFooter);
      }
      modalDialog.appendChild(modalContent);
      modalDiv.appendChild(modalDialog);
      return [modalDiv,a_yes,a_no,modalDivFoot];
  }

  function createImageItem (items,itemMap,div) {
      for (x in items) {
          var newImg = document.createElement("img");
          newImg.src = itemMap[items[x]].image.path200;
          newImg.style.width = "100px";
          newImg.style.height = "120px";
          newImg.title = itemMap[items[x]].name;
          div.appendChild(newImg);
      }
  }

  $scope.FireModal = function(event){
      if(event.target.id !== "barter_message_content" && event.target.id !== "barter_input_message" && event.target.id != "") {

          if(document.getElementById("modal_"+event.target.id)) {
              $("#modal_"+event.target.id).modal();
              return;
          } else {
              var done = true;
              OfferSvc.GetOneOfferById(event.target.id)
                .then(function (Offer) {
                    // if the offerer was created by current user.
                    if(Offer.User_offer_username === barterController.user) {
                        done = hasItems(Offer.User_offer_items,barterController.Items_User);
                        done = hasItems(Offer.User_other_items,barterController.Items_Other_User);
                        if(done){
                            var modalCreation = createModal(Offer.User_offer_items,Offer.User_other_items,true);
                            modalCreation[0].id = "modal_"+event.target.id;
                            document.getElementById("collectionOfModals").appendChild(modalCreation[0]);
                            $("#modal_"+event.target.id).modal();
                        } else {
                            // doing stuff here.
                            alert("Sorry items missing")
                        }
                    } else {
                        done = hasItems(Offer.User_offer_items,barterController.Items_Other_User);
                        done = hasItems(Offer.User_other_items,barterController.Items_User);
                        var checkClick = null;
                        if(done){
                            var modalCreation = null;
                            if (Offer.TransactionPending.accepted === false || Offer.TransactionPending.accepted === true) {
                                modalCreation = createModal(Offer.User_other_items,Offer.User_offer_items,true);
                                modalCreation[0].id = "modal_"+event.target.id;
                                document.getElementById("collectionOfModals").appendChild(modalCreation[0]);
                                $("#modal_"+event.target.id).modal();
                            } else {
                                modalCreation = createModal(Offer.User_other_items,Offer.User_offer_items,false);
                                modalCreation[1].onclick = function(){
                                    checkClick = true;
                                }
                                modalCreation[2].onclick = function () {
                                    checkClick = false;
                                }
                                modalCreation[3].id = "modal_footer_"+event.target.id;
                                modalCreation[0].id = "modal_"+event.target.id;
                                document.getElementById("collectionOfModals").appendChild(modalCreation[0]);
                                $("#modal_"+event.target.id).modal();
                                $("#modal_" + event.target.id).on("hidden.bs.modal", function(e) {
                                    var id = e.currentTarget.id.replace("modal_","")
                                    if(checkClick) {
                                        socket.emit('chat', {
                                          body: "Offer Accepted. 👍",
                                          user: barterController.user,
                                          special: "OD",
                                          tag: barterController.userTag
                                        });
                                        ChatSvc.sendMessage(barterController.otherUser, "Offer Accepted. 👍");
                                        window.location = "/#/createReservation-"+id;
                                    } else if (checkClick === false) {
                                        checkClick = null;
                                        var obj = {};
                                        obj.offerStatus = "DECLINED"
                                        obj.offerId = id
                                        OfferSvc.setReservation(obj)
                                            .then(function (stuff){
                                                document.getElementById("modal_footer_" + id).remove();
                                                socket.emit('chat', {
                                                  body: "Offer declined. 👎",
                                                  user: barterController.user,
                                                  special: "OD",
                                                  tag: barterController.userTag
                                                });
                                                ChatSvc.sendMessage(barterController.otherUser, "Offer declined. 👎");
                                            });
                                    }
                                });
                            } // end of else.
                        } // end of if.
                    } // end of else
                }); // end of then.
          }// end of else
      }
  }

  $scope.redirect = false;
  function hasItems(arr, map) {
    for(var i = 0; i < arr.length; i++){
        if(!map[arr[i]]){
            return false;
        }
    }
    return true;
    }

}); // End of Controller
