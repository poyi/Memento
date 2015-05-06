Template.userProfile.events({
  'submit form': function (e) {
    e.preventDefault();
    // Grab each profile field and update
    var currentUser = Meteor.userId();
    console.log(currentUser);
    var firstName = $('input[name="firstname"]').val();
    var lastName = $('input[name="lastname"]').val();
    var location = $('input[name="location"]').val();
    var bio = $('input[name="bio"]').val();
  }
});
