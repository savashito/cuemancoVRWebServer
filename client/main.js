// import { Template } from 'meteor/templating';
 
// import './main.html';
 
// Template.body.helpers({
//   tasks: [
//     { text: 'This is task 1' },
//     { text: 'This is task 2' },
//     { text: 'This is task 3' },
//   ],
// });

/*

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

*/