Template.userProfile.events({
  'submit form': function (e) {
    e.preventDefault();
    // Grab each profile field and update
    var currentUser = Meteor.userId();
    var firstName = $('input[name="firstname"]').val();
    var lastName = $('input[name="lastname"]').val();
    var location = $('input[name="location"]').val();
    var background = $('input[name="background"]').val();
    var bio = $('textarea[name="bio"]').val();
    Meteor.call('updateProfile', firstName, lastName, location, background, bio, function(error, response){
      if ( error ) {
        console.log(error);
      } else {
        console.log('updated profile');
        $('.profile-edit-form').fadeOut();
      }
    });
  },
  'click .edit-profile-link': function() {
    $('.profile-edit-form').fadeToggle();
  },
  'click .close-form': function() {
    $('.form-panel').hide();
  },
});