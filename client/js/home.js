Template.home.events({
  'click .get-started': function(e) {
    e.preventDefault();
    setTimeout(function(){
         $('#login-dropdown-list').addClass('open');
      },500);
  }
});

Template.home.helpers({
  'featuredList': function(){
    var list = Lists.find({featured: true}, {limit: 5});
    return list;
  },
  'profileLink': function() {
    var username = Meteor.user().username;
    return "/" + username;
  }
});