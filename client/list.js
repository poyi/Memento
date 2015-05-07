Template.list.helpers({
  'list': function(){
    var currentUserId = Meteor.userId();
    var list = Lists.find({user: currentUserId});
    console.log(list);
    return list;
  }
});