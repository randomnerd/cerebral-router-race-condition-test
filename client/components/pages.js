import React from 'react';
import {Pages} from '/both/collections';
import {Component} from 'cerebral-view-react';
import {Meteor} from 'meteor/meteor';

const PageIndex = Component({
  page: ['pages', 'page']
}, {
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      pages: Pages.find({}, {sort: {name: 1}}).fetch()
    };
  },
  renderPageList() {
    return this.data.pages.map((page) => {
      return (
          <tr key={page._id}>
            <td><a href={'/pages/' + page.permalink}>{page.name}</a></td>
          </tr>
        );
    });
  },

  renderPage() {
    let {page} = this.props;
    return (
      <div>permalink: {page.permalink}, name: {page.name}</div>
    );
  },

  render() {
    if (this.props.page) return this.renderPage();
    return (
      <div>
        <table className='ui compact unstackable table'>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {this.renderPageList()}
          </tbody>
        </table>
      </div>
    );
  }
});
export default PageIndex;
