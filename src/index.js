import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {loadUser} from './actions/loginActions';
import translate from 'counterpart';


translate.registerTranslations('cs', require('./languages/cs.json'));     //singleton
translate.registerTranslations('en', require('./languages/en.json'));
//counterpart.setLocale('en');

const store = configureStore();

console.log(store.getState());

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);



// Dispatch actions to load initial state.
//store.dispatch(loadLines());
//store.dispatch(loadAuthors());
store.dispatch(loadUser());

unsubscribe();

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>,
    document.getElementById('app')
);

