import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'

import history from './history'

import {
    ApolloClient,
    ApolloProvider,
    createNetworkInterface
} from 'react-apollo'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from 'redux-form'

import 'bootstrap/dist/js/bootstrap.min'

import { App } from './containers'

const networkInterface = createNetworkInterface({
    uri: 'https://api.graph.cool/simple/v1/cj769xxru17aa015697aieh4r'
})
const client = new ApolloClient({
    networkInterface
});

const store = createStore(combineReducers({
    form: reducer
}))

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
