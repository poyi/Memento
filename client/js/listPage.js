Template.listPage.events({
  'click .add-item-button': function (e) {
    e.preventDefault();
    var currentUser = Meteor.userId();
    var listId = Session.get('currentList')._id;
    console.log(listId);
    var itemName = $('input[name="newItemName"]').val();
    var itemUrl = $('input[name="newItemUrl"]').val();
    var itemBackground = $('input[name="newItemBackground"]').val();
    var itemDesc = $('textarea[name="newItemDesc"]').val();
    Meteor.call('addItem', currentUser, listId, itemName, itemUrl, itemDesc, itemBackground, function(error, response){
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
    $( "button[name*='"+ Session.get('itemStyle') +"']" ).addClass('item-style-selected');
  },
  'click .edit-item': function(e) {
    e.preventDefault();
    var itemId = $(e.target).parents('.item-actions').attr('name');
    Session.set('currentItem', itemId);
    $('.item-edit-form').fadeToggle();
  },
  'click .move-item-up': function(e) {
    var thisItem = $(e.target).parents('.item-card').get(0);
    var itemBefore = $(e.target).parents('.item-card').prev().get(0);
    var notFirst = $(itemBefore).hasClass('item-card');
    if (notFirst) {
      // Should swap the current item order with the previous
      var itemId = Blaze.getData(thisItem)._id;
      var secondItemId = Blaze.getData(itemBefore)._id;
      var itemOrder = Blaze.getData(itemBefore).order;
      var secondItemOrder = Blaze.getData(thisItem).order;
      Meteor.call('moveItem', itemId, secondItemId, itemOrder, secondItemOrder, function(error, response){
      if ( error ) {
        toastr.error(error.reason);
      } else {
        toastr.success("Item moved.");
      }
      });
    }
  },
  'click .move-item-down': function(e) {
    var thisItem = $(e.target).parents('.item-card').get(0);
    var itemAfter = $(e.target).parents('.item-card').next().get(0);
    var notLast = $(itemAfter).hasClass('item-card');
    if (notLast) {
      // Should swap the current item order with the next
      var itemId = Blaze.getData(thisItem)._id;
      var secondItemId = Blaze.getData(itemAfter)._id;
      var itemOrder = Blaze.getData(itemAfter).order;
      var secondItemOrder = Blaze.getData(thisItem).order;
      Meteor.call('moveItem', itemId, secondItemId, itemOrder, secondItemOrder, function(error, response){
      if ( error ) {
        toastr.error(error.reason);
      } else {
        toastr.success("Item moved.");
      }
      });
    }
  },
  'click .close-form': function() {
    $('.form-panel').hide();
  },
  'click .share-list': function() {
    $('.share-list-form').fadeToggle();
  },
  'click .done-sharing': function(e) {
    e.preventDefault();
    $('.share-list-form').hide();
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
      var totalCount = Items.find({list: list}).count();
      return Items.find({list: list}, {sort: {order: 1}}).map(function(item, index) {

      var isSet = Session.get('itemStyle');
      if(isSet) {
        item.style = isSet
      } else {
        item.style = "item-style-subtle";
      }
      // Check if current item is first or last
      if (index > 0) {
        item.notFirst = true;
      }
      if(index < totalCount - 1) {
        item.notLast = true;
      }
      if(item.itemBackground) {
        item.imageExists = true;
      }
      return item;
    });
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
  },
  'itemStyle': function() {
    var isSet = Session.get('itemStyle');
    if(isSet) {
      return isSet
    } else {
      return "item-style-subtle";
    }
  }
});