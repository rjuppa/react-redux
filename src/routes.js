import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import LinesPage from './components/pages/LinesPage';
import LinePage from './components/pages/LinePage';
import LanguagePage from './components/pages/LanguagePage';
import OnFailedPage from './components/pages/OnFailedPage';
import OnSuccessPage from './components/pages/OnSuccessPage';  //eslint-disable-line import/no-named-as-default


export default (
    <Route path="/terminal/default/" component={App}>
        <IndexRoute component={LanguagePage}/>
        <Route path="/about" component={AboutPage}/>
        <Route path="/home" component={HomePage}/>
        <Route path="/lines" component={LinesPage}/>
        <Route path="/lang" component={LanguagePage}/>
        <Route path="/onsuccess" component={OnSuccessPage}/>
        <Route path="/onfailed" component={OnFailedPage}/>
        <Route path="/terminal/default/lines" component={LinesPage}/>
        <Route path="/line/:line_id" component={LinePage}/>
    </Route>
);
