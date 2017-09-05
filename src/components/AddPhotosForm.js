import React, { Component } from 'react'

export default class AppPhotosForm extends Component {
    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <h1>Add Photos</h1>
                        <hr />
                        <h3>Add your quality photos</h3>
                        <p>Photos increase the chance to be picked by 80%!</p>
                    </div>
                </div>
            </div>
        )
    }
}