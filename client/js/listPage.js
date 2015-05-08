Template.listPage.events({
  'click .add-item-button': function (e) {
    e.preventDefault();
    var currentUser = Meteor.userId();
    var listId = Session.get('currentList')._id;
    console.log(listId);
    var itemName = $('input[name="newItemName"]').val();
    var itemUrl = $('input[name="newItemUrl"]').val();
    var itemDesc = $('textarea[name="newItemDesc"]').val();
    Meteor.call('addItem', currentUser, listId, itemName, itemUrl, itemDesc, function(error, response){
      if ( error ) {
        switch(error.reason) {
            case "Item name is required":
                toastr.error("Please provide a name for this item.");
                break;
            default:
                toastr.error(error.reason);
        }
      } else {
        $('.add-item-form').fadeOut();
        toastr.success("New item added!");
      }
    });
  },
  'click .add-item-link': function() {
    $('.add-item-form').fadeToggle();
  },
  'click .edit-list-link': function() {
    $('.list-edit-form').fadeToggle();
  },
  'click .edit-design-link': function() {
    $('.list-design-form').fadeToggle();
    $( "button[name*='"+ Session.get('backgroundStyle') +"']" ).addClass('style-selected');
  },
  'click .delete-item': function(e) {
    var itemId = $(e.target).parents('.item-actions').attr('name');
    Meteor.call('deleteItem', itemId, function(error, response){
      if ( error ) {
        console.log(error);
      } else {
        toastr.success("Item deleted.");
      }
    });
  },
  'click .close-form': function() {
    $('.form-panel').hide();
  },
  'click .delete-list': function(e) {
    e.preventDefault();
    var listId = Session.get('currentList')._id;
    var username = Lists.findOne(listId).username;
    Meteor.call('deleteList', listId, function(error, response){
      if ( error ) {
        toastr.error(error.reason);
      } else {
        Router.go('/' + username);
      }
    });
    $('.form-panel').hide();
  },
  'click .update-list': function(e) {
    e.preventDefault();
    var listId = Session.get('currentList')._id;
    var username = Lists.findOne(listId).username;
    var permalink = Lists.findOne(listId).permalink;
    var listName = $('input[name="listName"]').val();
    var listDesc = $('textarea[name="listDesc"]').val();
    var background = $('input[name="listBackground"]').val();
    Meteor.call('updateList', listId, listName, listDesc, background, function(error, response){
      if ( error ) {
        switch(error.reason) {
            case "Title is required":
                toastr.error("Please fill in the list title.");
                break;
            case "Permalink is required":
                toastr.error("Please provide a link url.");
                break;
            default:
                toastr.error(error.reason);
        }
      } else {
        console.log('Updated List');
        Router.go('/' + username + '/' + permalink);
        $('.form-panel').fadeOut();
        toastr.success("List details updated!");
      }
    });
  }
});

Template.listPage.helpers({
  'listExists': function(){
    var curentList = Session.get('currentList');
    if(curentList) {
      var list = Session.get('currentList')._id;
      return Items.find({list: list});
    } else {
      return false
    } 
  },
  'items': function(){
    var currentList = Session.get('currentList');
    if(currentList) {
      var list = currentList._id;
      return Items.find({list: list});
    }
  },
  'count': function(){
    var currentList = Session.get('currentList');
    if(currentList) {
      var listId = currentList._id;
      var items = Items.find({list: listId});
      var count = items.count();
      if(count > 0){
        return false
      } else {
        return true
      }
    }
  },
  'listOwner': function() {
    var currentList = Session.get('currentList');
    if(currentList) {
      var list = currentList._id;
      var listUser = Lists.findOne(list).user;
      var currentUser = Meteor.userId();
      if (listUser == currentUser) {
        return true
      } else {
        return false
      }
    }
  },
  'backgroundStyle': function() {
    var isSet = Session.get('backgroundStyle');
    if(isSet) {
      return isSet
    } else {
      return "list-background-subtle";
    }
  }
});