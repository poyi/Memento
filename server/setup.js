Meteor.publish("users", function () {
  return Meteor.users.find();
});

Meteor.publish("lists", function () {
  return Lists.find();
});

Meteor.publish("items", function () {
  return Items.find();
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
  'addItem' : function(currentUser, listId, itemName, itemUrl, itemDesc, itemBackground) {
    var totalCount = Items.find({list:listId}).count();
    var lastCount = totalCount + 1;
    Items.insert({
      "user" : currentUser,
      "list" : listId,
      "itemName" : itemName,
      "itemDesc" : itemDesc,
      "itemUrl" : itemUrl,
      "itemBackground" : itemBackground,
      "order" : lastCount
    });
  },
  'deleteItem' : function(itemId) {
    console.log(itemId);
    Items.remove({
      _id : itemId
    });
  },
  'moveItem' : function(itemId, secondItemId, itemOrder, secondItemOrder) {
    Items.update({_id:itemId}, { $set: {
      'order' : itemOrder
    }
    });
    Items.update({_id:secondItemId}, { $set: {
      'order' : secondItemOrder
    }
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
  'updateItem' : function(itemId, itemName, itemDesc, itemUrl, itemBackground) {
    Items.update({_id:itemId}, { $set: {
      'itemName': itemName,
      'itemDesc': itemDesc,
      'itemUrl': itemUrl,
      'itemBackground': itemBackground
      } 
    });
  },
  'updateDesign' : function(currentList, backgroundStyle, itemStyle) {
    Lists.update({_id:currentList}, { $set: {
      'backgroundStyle': backgroundStyle,
      'itemStyle': itemStyle
      } 
    });
  }
});