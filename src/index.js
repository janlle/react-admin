import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as Http from './axios'
import * as serviceWorker from './serviceWorker';
import {AlitaProvider, setConfig} from 'redux-alita';
import Page from './Page'

setConfig(Http);

ReactDOM.render(
    <AlitaProvider>
        <Page/>
    </AlitaProvider>, document.getElementById('root'));


serviceWorker.unregister();
