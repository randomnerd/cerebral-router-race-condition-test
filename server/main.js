import { Meteor } from 'meteor/meteor';
import { Pages, Comments } from '/both/collections';

Meteor.startup(() => {

  if (Pages.find().count() === 0) {
    Pages.insert({
      permalink: 'testpage',
      name: 'testpage'
    });
    Pages.insert({
      permalink: 'testpage2',
      name: 'testpage2'
    });
  }

  Meteor.publish('pages', () => { return Pages.find(); });
  Meteor.publish('comments', (pageId) => { return Comments.find({pageId: pageId}); });
});
