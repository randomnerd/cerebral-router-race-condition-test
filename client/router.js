import Router from 'cerebral-module-router';

const router = Router({
   '/': 'pages.index',
   '/pages/:permalink': 'pages.show'

});

export default router;
