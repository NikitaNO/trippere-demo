import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import history from './../history'

import styled from 'styled-components'

import PhotoCard from './PhotoCard'

const PhotoCardsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
`

class AddPhotosForm extends Component {
    onNextClick () {
        history.push('/my-details')
    }

    render () {
        const { images, dispatch } = this.props

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
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
                             style={{ marginTop: '30px' }}>
                            <div className="col-md-12 clearfix">
                                <button className="btn btn-success pull-right"
                                        onClick={() => this.onNextClick()}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddPhotosForm.propTypes = {
    images: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default connect(
    state => ({
        images: state.image.images
    })
)(AddPhotosForm)
