Template.itemEdit.helpers({
  'item': function(){
    var currentItem = Session.get('currentItem');
    return Items.findOne(currentItem);
  }
});

Template.itemEdit.events({
  'click .delete-item': function(e) {
    e.preventDefault();
    var itemId = Session.get('currentItem');
    Meteor.call('deleteItem', itemId, function(error, response){
      if ( error ) {
        toastr.error(error.reason);
      } else {
        $('.form-panel').hide();
        toastr.success("Item deleted.");
      }
    });
  },
  'click .update-item': function(e) {
    e.preventDefault();
    var itemId = Session.get('currentItem');
    var itemName = $('input[name="itemName"]').val();
    var itemDesc = $('textarea[name="itemDesc"]').val();
    var itemUrl = $('input[name="itemUrl"]').val();
    var itemBackground = $('input[name="itemBackground"]').val();
    Meteor.call('updateItem', itemId, itemName, itemDesc, itemUrl, itemBackground, function(error, response){
      if ( error ) {
        toastr.error(error.reason);
      } else {
        $('.form-panel').hide();
        toastr.success("Item updated!");
      }
    });
  },
});