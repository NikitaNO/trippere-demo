import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import { RegisterForm, AddPhotosForm } from './../components'

export default class App extends Component {
    render () {
        return (
            <main>
                <Switch>
                    <Route exact
                           path="/"
                           component={RegisterForm} />
                    <Route path="/add-photos"
                           component={AddPhotosForm} />
                </Switch>
            </main>
        )
    }
}
