Meteor.subscribe('lists');
Meteor.subscribe('items');
Meteor.subscribe('users');

Meteor.startup(function() {
  toastr.options = {
    "closeButton": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": true,
    "onclick": null,
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
});

Template.ApplicationLayout.helpers({
  'profileLink': function() {
    var username = Meteor.user().username;
    return "/" + username;
    }
});