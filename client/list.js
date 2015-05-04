Template.list.helpers({
  counter: function () {
    return Session.get('counter');
  }
});

Template.list.events({
  'click button': function () {
    // increment the counter when button is clicked
    Session.set('counter', Session.get('counter') + 1);
  }
});
