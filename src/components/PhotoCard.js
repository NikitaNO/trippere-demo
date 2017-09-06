import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as ReactToastr from 'react-toastr'

import styled from 'styled-components'
import Dropzone from 'react-dropzone'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Decimal from 'decimal.js'

import config from './../config'

import { uploadImage } from './../actions'

const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation)

const AddButton = styled.div`
  display: flex;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: bold;
  border-radius: 50%;
  color: #fff;
  background-color: #333;
`

const PlusIcon = styled.span`
  position: relative;
  top: 1px;
`

class PhotoCard extends Component {
    constructor (props) {
        super(props)

        this.state = {
            resizedImageURL: null
        }
    }

    addAlert () {
        this.container.error(
            'Max size of image is 3MB',
            'Error on image upload',
            {
                timeOut: 5000
            }
        )
    }

    onDrop (accepted, rejected) {
        if (Array.isArray(rejected) && rejected.length) {
            this.addAlert()

            return
        }

        const image = new Image()

        image.addEventListener('load', () => {
            const requiredWidth = 178
            const requiredHeight = 252
            const ratio = Decimal(image.width).div(image.height)
            const isCropNeeded = !ratio.equals(config.aspectRatio)

            const self = this
            const { dispatch, index, addResized } = this.props
            const body = new FormData()

            body.append('data', accepted[0])

            dispatch(uploadImage(index, body))
                .then(() => {
                    if (image.width < requiredWidth && image.height < requiredHeight) {
                        return null
                    } else if (isCropNeeded) {
                        const startX = Math.round(image.width / 2 - requiredWidth / 2)
                        const startY = Math.round(image.height / 2 - requiredHeight / 2)

                        addResized(self.props.image.id, [`https://images.graph.cool/v1/${config.graphProjectId}/${self.props.image.secret}/${startX}x${startY}:${requiredWidth}x${requiredHeight}`])
                            .then(
                                ({ data }) => {
                                    self.setState({
                                        resizedImageURL: data.updateFile.resized[0]
                                    })
                                },
                                error => {
                                    console.warn(error)
                                }
                            )
                    } else {
                        addResized(self.props.image.id, [`https://images.graph.cool/v1/${config.graphProjectId}/${self.props.image.secret}/${requiredWidth}x${requiredHeight}`])
                            .then(({ data }) => {
                                self.setState({
                                    resizedImageURL: data.updateFile.resized[0]
                                })
                            })
                    }
                })
        })

        image.src = window.URL.createObjectURL(accepted[0])
    }

    render () {
        const dropZoneStyles = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '30%',
            height: '250px',
            backgroundColor: '#ccc',
            cursor: 'pointer'
        }
        const { image } = this.props
        const { resizedImageURL } = this.state

        if (resizedImageURL) {
            dropZoneStyles.background = `url(${resizedImageURL}) 50% 50% no-repeat`
        } else if (image) {
            dropZoneStyles.background = `url(${image.url}) 50% 50% no-repeat`
        }

        return (
            <Dropzone multiple={false}
                      onDrop={(accepted, rejected) => this.onDrop(accepted, rejected)}
                      accept="image/*"
                      maxSize={3000000}
                      style={dropZoneStyles}>
                <ReactToastr.ToastContainer ref={input => this.container = input}
                                            toastMessageFactory={ToastMessageFactory}
                                            className="toast-top-right"
                                            preventDuplicates={true} />
                {!image && (
                    <AddButton>
                        <PlusIcon>+</PlusIcon>
                    </AddButton>
                )}
            </Dropzone>
        )
    }
}

const withAddResized = graphql(
    gql`mutation addResized($id: ID!, $resized: [String!]) {
      updateFile(id: $id, resized: $resized) { id resized }
    }`,
    {
        props: ({ ownProps, mutate }) => ({
            addResized (id, resized) {
                return mutate({
                    variables: {
                        id,
                        resized
                    },
                    updateQueries: {}
                })
            }
        })
    }
)

export default withAddResized(PhotoCard)
