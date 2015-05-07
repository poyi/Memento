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
  'updateList' : function(listId, listUrl, listDesc, background) {
    Lists.update({_id:listId}, { $set: {
      'listId': listId,
      'listDesc': listDesc,
      'background': background
      } 
    });
  },
});

Schema = {};

Schema.UserCountry = new SimpleSchema({
    name: {
        type: String
    },
    code: {
        type: String,
        regEx: /^[A-Z]{2}$/
    }
});

Schema.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        regEx: /^[a-zA-Z-]{2,25}$/,
        optional: true
    },
    lastName: {
        type: String,
        regEx: /^[a-zA-Z]{2,25}$/,
        optional: true
    },
    location: {
        type: String,
        regEx: /^[a-z0-9A-z .]{3,30}$/,
        optional: true
    },
    birthday: {
        type: Date,
        optional: true
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        optional: true
    },
    organization : {
        type: String,
        regEx: /^[a-z0-9A-z .]{3,30}$/,
        optional: true
    },
    website: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    background: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    bio: {
        type: String,
        optional: true
    },
    country: {
        type: Schema.UserCountry,
        optional: true
    }
});

Schema.User = new SimpleSchema({
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/
    },
    emails: {
        type: [Object],
        // this must be optional if you also use other login services like facebook,
        // but if you use only accounts-password, then it can be required
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    }
});

Meteor.users.attachSchema(Schema.User);