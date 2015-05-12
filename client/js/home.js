Template.home.events({
  'click .landing-cta': function(e) {
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
  }
});