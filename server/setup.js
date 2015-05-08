Meteor.publish("users", function () {
  return Meteor.users.find();
});

Meteor.methods({
  'updateProfile' : function(firstName, lastName, location, background, bio) {
    Meteor.users.update({_id:Meteor.userId()}, { $set: {
      'profile.firstName': firstName,
      'profile.lastName': lastName,
      'profile.location': location,
      'profile.background': background,
      'profile.bio': bio
      } 
    });
  },
  'addItem' : function(currentUser, listId, itemName, itemUrl, itemDesc) {
    Items.insert({
      "user" : currentUser,
      "list" : listId,
      "itemName" : itemName,
      "itemDesc" : itemDesc,
      "itemUrl" : itemUrl
    });
  },
  'deleteItem' : function(itemId) {
    console.log(itemId);
    Items.remove({
      _id : itemId
    });
  },
  'addList' : function(user, username, listName, listDesc, listUrl, background) {
    var newList = Lists.insert({
      'user': user,
      'username': username,
      'title': listName,
      'permalink': listUrl,
      'desc': listDesc,
      'background': background
    });
    return newList;
  },
  'deleteList' : function(listId) {
    Lists.remove({
      '_id': listId
    });
  },
  'updateList' : function(listId, listName, listDesc, background) {
    Lists.update({_id:listId}, { $set: {
      'listId': listId,
      'title': listName,
      'desc': listDesc,
      'background': background
      } 
    });
  },
});