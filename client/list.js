Template.List.helpers({
  counter: function () {
    return Session.get('counter');
  }
});

Template.List.events({
  'click button': function () {
    // increment the counter when button is clicked
    Session.set('counter', Session.get('counter') + 1);
  }
});
