Template.userProfile.events({
  'submit form': function (e) {
    e.preventDefault();
    // Grab each profile field and update
    var currentUser = Meteor.userId();
    var firstName = $('input[name="firstname"]').val();
    var lastName = $('input[name="lastname"]').val();
    var location = $('input[name="location"]').val();
    var background = $('input[name="profileBackground"]').val();
    var bio = $('textarea[name="bio"]').val();
    Meteor.call('updateProfile', firstName, lastName, location, background, bio, function(error, response){
      if ( error ) {
        console.log(error);
      } else {
        $('.profile-edit-form').fadeOut();
      }
    });
  },
  'click .edit-profile-link': function() {
    $('.profile-edit-form').fadeToggle();
  },
  'click .add-list-link': function() {
    $('.add-list-form').fadeToggle();
  },
  'click .close-form': function() {
    $('.form-panel').hide();
  },
  'click .add-list': function() {
    var user = Meteor.userId();
    var username = Meteor.users.findOne(user).username;
    var listName = $('input[name="listName"]').val();
    var listDesc = $('textarea[name="listDesc"]').val();
    var listUrl = $('input[name="listURL"]').val();
    var background = $('input[name="background"]').val();
    Meteor.call('addList', user, username, listName, listDesc, listUrl, background, function(error, response){
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
        var user = Meteor.userId();
        var username = Meteor.users.findOne(user).username;
        var newList = Lists.findOne(response)
        var permalink = newList.permalink;
        Session.set('currentList', newList);
        Router.go('/'+username+'/'+permalink);
        toastr.success("New list created!");
      }
    });
  },
  'keyup .link-url': function() {
    var value = $('.link-url').val();
    var check = Lists.findOne({permalink: value});
    if (check) {
      $('.url-exist').show();
      $('.add-list').addClass("disabled-button");
      $('.add-list').attr("disabled","disabled");
    } else {
      $('.url-exist').hide();
      $('.add-list').removeClass("disabled-button");
      $('.add-list').removeAttr("disabled");
    }
  }
});

Template.userProfile.helpers({
  'profileOwner': function() {
    var profileUser = Session.get('profileUser')._id;
    var currentUser = Meteor.userId();
    if (profileUser == currentUser) {
      return true
    } else {
      return false
    }
  }
});