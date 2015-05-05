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
     data: function(){
        var username = this.params.username;
        var user = Meteor.users.findOne({username: username});
        if (user) {
          return user;
        } else {
           this.render('notFound');
        }
        
    }
  }, {where: 'server'});

  this.route('List', {
    path: '/:username/:permalink',
    data: function(){
        var username = this.params.username;
        var permalinkVar = this.params.permalink;
        return Lists.findOne({permalink: permalinkVar}, {username: username});
    }
  }, {where: 'server'});
});