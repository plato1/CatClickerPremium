$(function(){

    var catTotal = 3;
    var cats = [];
    var catName = [];
    var catCounter = [];
    var catOnDisplay;
    var admin = false;

    var model = {
        init: function() {
            // populate cat array with names of jpg files
            for (var i = 0; i<catTotal;i++) {
                       cats[i] = "cat"+(i+1)+".jpg";
                   };

            // Give names to each cat
            for (var i = 0; i<catTotal;i++) {
                       catName[i] = "Cat"+(i+1);
                   };

            // Initialize cat clicker counts to 0
            for (var i = 0; i<catTotal;i++) {
                       catCounter[i] = 0;
                   };

        },

        // find index for selected cat from list
        findItemIndex: function(str) {
            return (cats.indexOf(str));
        },

        // addClick is passed the index of the clicked item on list
        addClick: function(ind) {
            // increment the cats click counter
            catCounter[ind]++;
        },

        newDisplayCat: function(ind) {
            // set cat to display to this cat
            catOnDisplay=ind;
        }
    };


    var vm = {
        newClick: function(e) {

          //var index=document.getElementById("CatList").selectedIndex;
          var item = e.target.innerHTML;
          index = model.findItemIndex(item);
          //var index=document.getElementById("CatList");
          //var index=0;
            model.addClick(index);
            model.newDisplayCat(index);
            view2.render();
        },

        adminClick: function(e) {

            // Toggle admin flag True/False
            admin = !admin;
            if (admin) {
                view3.init_adminForm();
            }
            // clear admin form from page
            else {
                view3.remove_adminForm();
            }

        },

        formSaveClick: function(e) {
           console.log( "Form save clicked" );
        },

        formCancelClick: function(e) {
            console.log( "Form cancel clicked" );
        },

        init: function() {
            model.init();
            view1.init();
            view2.init();
            view3.init();
        }
    };




    // view of cat list
    var view1 = {
        init: function() {


            view1.render();
        },

        render: function(){
        // create list
            for (var i = cats.length - 1; i >= 0; i--) {
                var liElem = document.createElement("li");
                liElem.appendChild(document.createTextNode(cats[i]));
                document.getElementById("CatList").appendChild(liElem);
            };
            //this.noteList.html( htmlStr );
        }
    };


    // view of selected cat image and info
    var view2 = {
        init: function() {
               // set cat to display on startup to 1st cat
            catOnDisplay=0;

            view2.render();
        },
        render: function(){
            document.getElementById("PutCatHere").src=cats[catOnDisplay];
            document.getElementById("CatNameHere").innerHTML= catName[catOnDisplay];
            document.getElementById("CatCounterHere").innerHTML= catCounter[catOnDisplay];
        }
    };


     // view of admin area
    var view3 = {
        init: function() {
               // add admin button
               var x = document.createElement("BUTTON");
               x.setAttribute("id","adminButton");
               var t = document.createTextNode("Admin");
               x.appendChild(t);
               document.body.appendChild(x);

            view3.render();
        },

        init_adminForm: function() {


               // add admin modifiable form input area with save/cancel buttons- cat name, url, number of clicks
               var y = document.createElement("FORM");
               y.setAttribute("id","adminForm");
               document.body.appendChild(y);

               // cat name input
               var y2= document.createElement("INPUT");
               y2.setAttribute("type","text");
               y2.setAttribute("value","cat name here");
               document.getElementById("adminForm").appendChild(y2);

               // cat img url input
               var y3= document.createElement("input");
               y3.setAttribute("type","text");
               y3.setAttribute("value","cat url here");
               document.getElementById("adminForm").appendChild(y3);

               // new click number input
               var y4 = document.createElement("input");
               y4.setAttribute("type","text");
               y4.setAttribute("value","new click number here");
               document.getElementById("adminForm").appendChild(y4);

               // add button to save  work
               var y5 = document.createElement("button");
               y5.setAttribute("id","formSaveButton");
               var y6 = document.createTextNode("Save");
               y5.appendChild(y6);
               document.getElementById("adminForm").appendChild(y5);

               // add button to cancel work
               var y7 = document.createElement("button");
               y7.setAttribute("id","formCancelButton");
               var y8 = document.createTextNode("Cancel");
               y7.appendChild(y8);
               document.getElementById("adminForm").appendChild(y7);

               // add event listeners for save and cancel button
               $(document.getElementById("formSaveButton")).click(vm.formSaveClick);
               $(document.getElementById("formCancelButton")).click(vm.formCancelClick);

            view3.render();
        },

        remove_adminForm: function(){
                var child = document.getElementById("adminForm");
                child.parentNode.removeChild(child);
        },

        render: function(){

        }
    };

    vm.init();

    // eventhandler to display chosen cat from list
    // document.getElementById("CatList").addEventListener("click", vm.newClick);
    $(document.getElementById("CatList")).click(vm.newClick);
    $(document.getElementById("adminButton")).click(vm.adminClick);

    // lets check if document is ready.
    $( document ).ready(function() { console.log( "ready!" ); });

});