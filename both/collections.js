import {Mongo} from 'meteor/mongo';

export const Pages = new Mongo.Collection('pages');
export const Comments = new Mongo.Collection('comments');
