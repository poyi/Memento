Router.configure({
  layoutTemplate: 'ApplicationLayout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading'
});

Router.map(function(){
  this.route('home', {
    path: '/'
  }, {where: 'server'});

  this.route('userProfile', {
    path: '/:username',
    waitOn: function() {
      return Meteor.subscribe('users');
    },
    data: function(){
      var username = this.params.username;
      var user = Meteor.users.findOne({username: username});
      return user;
    },
    onAfterAction: function(){
      var username = this.params.username;
      var user = Meteor.users.findOne({username: username});
      Session.set('profileUser', user);
    }
  });

  this.route('listPage', {
    path: '/:username/:permalink',
    waitOn: function() {
      return Meteor.subscribe('lists');
    },
    data: function(){
      var username = this.params.username;
      var permalinkVar = this.params.permalink;
      var list = Lists.findOne({permalink: permalinkVar}, {username: username});
      return list;
    },
    onAfterAction: function(){
      var username = this.params.username;
      var permalinkVar = this.params.permalink;
      var list = Lists.findOne({permalink: permalinkVar}, {username: username});
      if(list) {
        Session.set('currentList', list);
        Session.set('backgroundStyle', list.backgroundStyle);
        Session.set('itemStyle', list.itemStyle);
      }
    }
  });
});