angular.module('app').controller('PendingTradesCtrl',function($scope,UserSvc,OfferSvc, TradingItemSvc){
    // controller for pending trades
    var pendingTrades = {}
    pendingTrades.ItemMap = {};
    pendingTrades.Offers = [];
    UserSvc.getUserAccountInfo()
        .then(function (user){
            // Getting all images into a map.
            OfferSvc.GetPendingOffers(user.username)
                .then(function (Offers){
                    pendingTrades.Offers = Offers;
                    for(x in Offers){
                        for(y in Offers[x].User_other_items){
                            var id = Offers[x].User_other_items[y];
                            pendingTrades.ItemMap[id] = 1;
                        }
                        for(z in Offers[x].User_offer_items){
                            var id = Offers[x].User_offer_items[z];
                            pendingTrades.ItemMap[id] = 1;
                        }
                    }

                    getImages(pendingTrades.ItemMap);
                });
        });

    function getImages(MapOfIds){
        var count = 0;
        for(x in MapOfIds){
            count++;
        }
        var imageCount = 0;
        for(x in MapOfIds){
            TradingItemSvc.getItemById(x)
                .then(function (response){
                    imageCount++;
                    pendingTrades.ItemMap[response._id] = response;
                    if(imageCount === count){
                        joinThem();
                    }
                })
        }
    }

    function joinThem(){
        $scope.Offers = pendingTrades.Offers;
        console.log(pendingTrades.Offers[0]);
        for(x in pendingTrades.Offers){
            var obj = pendingTrades.Offers[x];
            var idTemp = obj.TransactionPending._id;
            var temp = createModal(pendingTrades.Offers[x]);
            temp[0].id = "modal_" + idTemp;
            var itCliked = false;
            temp[1].onclick = function(){
                itCliked = true;
            }
            document.getElementById("appendModals").appendChild(temp[0]);
            $("#modal_" + idTemp).on("hidden.bs.modal", function(e) {
                if(itCliked){
                    var id = e.currentTarget.id.replace("modal_","");
                    alert(id);
                    itCliked = false;
                }
            });
        }
        /*
        pendingTrades.ItemMap = {};
        pendingTrades.Offers = [];
        */
    }

    function createModal (PendingTradeObj) {

        //UserArray,OtherArray
        var user = PendingTradeObj.User_offer_username,
        otherUser = PendingTradeObj.User_other_username;
        var UserArray = PendingTradeObj.User_other_items;
        var OtherArray = PendingTradeObj.User_offer_items;

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

        var modalDivFoot = document.createElement("div");
        var a_yes = document.createElement("a");
        a_yes.className = "btn btn-default";
        a_yes.setAttribute("role","button");
        a_yes.innerHTML = "View More Details";
        a_yes.setAttribute("data-dismiss","modal");
        modalDivFoot.appendChild(a_yes);
        modalFooter.appendChild(modalDivFoot);

        createImageItem(UserArray,pendingTrades.ItemMap,divBody1);
        createImageItem(OtherArray,pendingTrades.ItemMap,divBody3);
        divBody2.appendChild(img);
        divRow.appendChild(divBody1);
        divRow.appendChild(divBody2);
        divRow.appendChild(divBody3);

        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);
        modalDialog.appendChild(modalContent);
        modalDiv.appendChild(modalDialog);

        return [modalDiv,a_yes];
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

}); // end of controller

/*

*/

//barterController.Items_User[CurrentUserItems[x]._id] = CurrentUserItems[x];
