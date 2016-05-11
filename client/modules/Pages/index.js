import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import {Pages} from '/both/collections';

function showPage ({input, state}) {
  state.set(['pages', 'permalink'], input.permalink);
  let page = Pages.findOne({permalink: input.permalink});
  if (!page) { console.error('PAGE NOT FOUND'); return; }
  state.set(['pages', 'page'], page);
  Meteor.subs.subscribe('comments', page._id);
}

function showIndex({input, state}) {
  state.set(['pages', 'permalink'], null);
  state.set(['pages', 'page'], null);
}

const show = [ showPage ];
const index = [ showIndex ];

export default (options = {}) => {
  return (module, controller) => {
    module.addState({
      permalink: null,
      page: null
    });

    module.addSignals({
      index,
      show
    });

    // Tracker.autorun(() => {
    //   module.getSignals().loggedInUpdated({loggingIn: Accounts.loggingIn()});
    // });
    // Tracker.autorun(() => {
    //   module.getSignals().userChanged({user: Meteor.user() || {}});
    // });
  }
}
