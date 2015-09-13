import React from 'react';
import Router from 'react-router';
import {Provider} from 'react-redux';
import RenderToString from './RenderToString';
import loadProps from '#app/utils/loadProps';

import store from '../store';
import routes from './routes';

export function run () {

  fetch('/api/v1/conf').then((r) => {
    return r.json();
  }).then((conf) => {

    //flux.getStore('app').setAppConfig(conf);

    Router.run(routes, Router.HistoryLocation, (Handler, state) => {
      const routeHandlerInfo = {store, state};
      loadProps(state.routes, 'loadProps', routeHandlerInfo).then(() => {
        React.render(
          <Provider store={store}>
            {() => <Handler routerState={state}/>}
          </Provider>,
          document
        );
      });
    });

  });
}

export const renderToString = RenderToString;

require('../styles');

// Style live reload
if (module.hot) {
  //const refreshStyles = flux.getActions('app').refreshStyles;
  //module.hot.accept('../styles', () => {
  //  require('../styles');
  //  refreshStyles();
  //});
}
