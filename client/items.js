Template.items.events({
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
        console.log(error);
      } else {
        console.log('Added Item to list');
        $('.add-item-form').fadeOut();
      }
    });
  },
  'click .add-item-link': function() {
    $('.add-item-form').fadeToggle();
  },
  'click .edit-list-link': function() {
    $('.list-edit-form').fadeToggle();
  },
  'click .delete-item': function(e) {
    var itemId = $(e.target).parents('.item-actions').attr('name');
    Meteor.call('deleteItem', itemId, function(error, response){
      if ( error ) {
        console.log(error);
      } else {
        console.log('Deleted Item');
      }
    });
  },
  'click .close-form': function() {
    $('.form-panel').hide();
  },
  'click .update-list': function() {
    var listId = Session.get('currentList')._id;
    var listDesc = $('input[name="listDesc"]').val();
    var background = $('input[name="background"]').val();
    Meteor.call('updateList', listId, listDesc, background, function(error, response){
      if ( error ) {
        console.log(error);
      } else {
        console.log('Updated List');
        $('.form-panel').fadeOut();
      }
    });
  }
});

Template.items.helpers({
  'items': function(){
    var list = Session.get('currentList')._id;
    return Items.find({list: list});
  }
});