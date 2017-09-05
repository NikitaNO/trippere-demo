import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'

import history from './history'

import {
    ApolloClient,
    ApolloProvider,
    createNetworkInterface
} from 'react-apollo'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from 'redux-form'
import thunk from 'redux-thunk'

import 'bootstrap/dist/js/bootstrap.min'

import { App } from './containers'
import reducers from './reducers'

import config from './config'

const networkInterface = createNetworkInterface({
    uri: `https://api.graph.cool/simple/v1/${config.graphProjectId}`
})

const client = new ApolloClient({
    networkInterface
});

const store = createStore(
    combineReducers({
        ...reducers,
        form: reducer
    }),
    applyMiddleware(thunk)
)

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    </ApolloProvider>,
    document.getElementById('app')
)
