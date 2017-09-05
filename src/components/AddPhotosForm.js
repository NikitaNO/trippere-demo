import React, { Component } from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components'

import PhotoCard from './PhotoCard'

const PhotoCardsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
`

class AddPhotosForm extends Component {
    render () {
        const { images, dispatch } = this.props

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <h1>Add Photos</h1>
                        <hr />
                        <h3>Add your quality photos</h3>
                        <p>Photos increase the chance to be picked by 80%!</p>
                        <PhotoCardsContainer>
                            {
                                images.map((image, index) => (
                                    <PhotoCard key={index}
                                               dispatch={dispatch}
                                               image={image}
                                               index={index} />
                                ))
                            }
                        </PhotoCardsContainer>
                        <div className="row"
                             style={{ marginTop: '10px' }}>
                            <div className="col-md-12 clearfix">
                                <button className="btn btn-success pull-right">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        images: state.image.images
    })
)(AddPhotosForm)
