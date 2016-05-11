import Controller from 'cerebral';
import Model from 'cerebral-model-baobab';
import Devtools from 'cerebral-module-devtools';

import Pages from './modules/Pages';
import router from './router';

const model = Model({});
const controller = Controller(model);
controller.addModules({
  devtools: Devtools(),
  pages: Pages(),
  router
});

export default controller;
