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
  'click .update-style': function(e) {
    e.preventDefault();
    var style = Session.get('backgroundStyle');
    var currentList = Session.get('currentList')._id;
    Meteor.call('updateBackgroundDesign', currentList, style, function(error, response){
      if ( error ) {
        toastr.error(error.reason);
      } else {
        $('.form-panel').fadeOut();
      }
    });
  }
});