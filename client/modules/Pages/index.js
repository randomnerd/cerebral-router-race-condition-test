import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import {Pages} from '/both/collections';

function showPage ({input, state, output, services}) {
  state.set(['pages', 'permalink'], input.permalink);
  let page = Pages.findOne({permalink: input.permalink});
  if (!page) { console.error('PAGE NOT FOUND'); return; }
  state.set(['pages', 'page'], page);
  services.pages.subsManager.subscribe('comments', page._id);
}

function showIndex({input, state}) {
  state.set(['pages', 'permalink'], null);
  state.set(['pages', 'page'], null);
}

function setLoading({input, state}) {
  state.set(['pages', 'loading'], true);
}

function unsetLoading({input, state}) {
  state.set(['pages', 'loading'], true);
}

const show = [ showPage ];
const index = [ showIndex ];
const loading = [ setLoading ];
const notLoading = [ unsetLoading ];

const subsManager = new SubsManager();

export default (options = {}) => {
  return (module, controller) => {
    subsManager.subscribe('pages');

    module.addState({
      permalink: null,
      page: null,
      loading: true
    });

    module.addSignals({
      index,
      show,
      loading,
      notLoading
    });

    module.addServices({
      subsManager
    });

    Meteor.startup(() => {
      Tracker.autorun(() => {
        subsManager.ready() ? module.getSignals().notLoading() : module.getSignals().loading();
      });
    });
  }
}
