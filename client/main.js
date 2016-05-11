import React from 'react';
import ReactDOM from 'react-dom';
import {Container, Component} from 'cerebral-view-react';
import {Meteor} from 'meteor/meteor';

import controller from './controller';
import PageView from './components/pages';

const app = (
  <Container controller={controller}><PageView/></Container>
);

Meteor.startup(() => {
  Meteor.subs = new SubsManager();
  Meteor.subs.subscribe('pages');
  ReactDOM.render(app, document.getElementById('react-root'));
});
