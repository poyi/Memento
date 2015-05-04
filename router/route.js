Router.map(function(){
  this.route('List', {
    path: '/:permalink',
    data: function(){
        var permalinkVar = this.params.permalink;
        return Lists.findOne({permalink: permalinkVar});
    }
  });
});