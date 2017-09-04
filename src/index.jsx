import ReactDOM from 'react-dom'
import React from 'react'

import {
    ApolloClient,
    ApolloProvider,
    createNetworkInterface
} from 'react-apollo'

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { App } from './containers'

const networkInterface = createNetworkInterface({
    uri: 'https://api.graph.cool/simple/v1/cj769xxru17aa015697aieh4r'
})
const client = new ApolloClient({
    networkInterface
});

const store = createStore(state => state)

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>,
    document.getElementById('app')
)
