Template.listIndex.helpers({
  'list': function(){
    var user = Session.get('profileUser').username;
    var list = Lists.find({username: user});
    return list;
  },
  'count': function(){
    var user = Session.get('profileUser').username;
    var list = Lists.find({username: user});
    var count = list.count();
    if(count > 0){
      return false
    } else {
      return true
    }
  },
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