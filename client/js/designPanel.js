Template.designPanel.events({
  'click .close-form': function() {
    $('.form-panel').hide();
  },
  'click .background-subtle': function(e) {
    e.preventDefault();
    $('.style-selected').removeClass('style-selected');
    $(e.target).addClass('style-selected');
    var style = "list-background-subtle";
    Session.set('backgroundStyle', style);
  },
  'click .background-slim': function(e) {
    e.preventDefault();
    $('.style-selected').removeClass('style-selected');
    $(e.target).addClass('style-selected');
    var style = "list-background-slim";
    Session.set('backgroundStyle', style);
  },
  'click .background-full': function(e) {
    e.preventDefault();
    $('.style-selected').removeClass('style-selected');
    $(e.target).addClass('style-selected');
    var style = "list-background-full";
    Session.set('backgroundStyle', style);
  },
  'click .style-subtle': function(e) {
    e.preventDefault();
    $('.item-style-selected').removeClass('item-style-selected');
    $(e.target).addClass('item-style-selected');
    var style = "item-style-subtle";
    Session.set('itemStyle', style);
  },
  'click .style-card': function(e) {
    e.preventDefault();
    $('.item-style-selected').removeClass('item-style-selected');
    $(e.target).addClass('item-style-selected');
    var style = "item-style-card";
    Session.set('itemStyle', style);
  },
  'click .update-style': function(e) {
    e.preventDefault();
    var backgroundStyle = Session.get('backgroundStyle');
    var itemStyle = Session.get('itemStyle');
    var currentList = Session.get('currentList')._id;
    Meteor.call('updateDesign', currentList, backgroundStyle, itemStyle, function(error, response){
      if ( error ) {
        toastr.error(error.reason);
      } else {
        $('.form-panel').fadeOut();
      }
    });
  }
});