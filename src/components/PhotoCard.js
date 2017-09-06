import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as ReactToastr from 'react-toastr'

import styled from 'styled-components'
import Dropzone from 'react-dropzone'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Decimal from 'decimal.js'

import config from './../config'

import { uploadImage, removeImage, addResized } from './../actions'

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

const RemoveButtonContainer = styled.div`
  position: relative;
  top: 140px;
  color: #a94442;
  cursor: pointer;
`

class PhotoCard extends Component {
    addAlert () {
        this.container.error(
            'Max size of image is 3MB',
            'Error on image upload',
            {
                timeOut: 5000
            }
        )
    }

    onRemoveButtonClick (event) {
        event.stopPropagation()

        const { dispatch, image, index, deleteFile } = this.props

        dispatch(removeImage(deleteFile, image.id, index))
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
            const { dispatch, index } = this.props
            const body = new FormData()

            body.append('data', accepted[0])

            dispatch(uploadImage(index, body))
                .then(() => {
                    if (image.width < requiredWidth && image.height < requiredHeight) {
                        return null
                    } else if (isCropNeeded) {
                        const startX = Math.round(image.width / 2 - requiredWidth / 2)
                        const startY = Math.round(image.height / 2 - requiredHeight / 2)

                        dispatch(
                            addResized(
                                self.props.addResized,
                                self.props.image.id,
                                [`https://images.graph.cool/v1/${config.graphProjectId}/${self.props.image.secret}/${startX}x${startY}:${requiredWidth}x${requiredHeight}`],
                                index
                            )
                        )
                    } else {
                        dispatch(
                            addResized(
                                self.props.addResized,
                                self.props.image.id,
                                [`https://images.graph.cool/v1/${config.graphProjectId}/${self.props.image.secret}/${requiredWidth}x${requiredHeight}`],
                                index
                            )
                        )
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
            width: '172px',
            height: '252px',
            backgroundColor: '#ccc',
            cursor: 'pointer',
            backgroundPosition: '50% 50%',
            backgroundRepeat: 'no-repeat'
        }
        const { image } = this.props

        if (image) {
            dropZoneStyles.backgroundColor = '#fff'
            dropZoneStyles.backgroundImage = `url(${image.url})`

            if (Array.isArray(image.resized) && image.resized.length) {
                dropZoneStyles.backgroundImage = `url(${image.resized[0]})`
            }
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
                {!!image && (
                    <RemoveButtonContainer onClick={event => this.onRemoveButtonClick(event)}>
                        Remove
                    </RemoveButtonContainer>
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
        props: ({ mutate }) => ({
            addResized (id, resized) {
                return mutate({
                    variables: {
                        id,
                        resized
                    }
                })
            }
        })
    }
)

const withRemove = graphql(
    gql`mutation deleteFile($id: ID!) {
      deleteFile(id: $id) { id }
    }`,
    {
        props: ({ mutate }) => ({
            deleteFile (id) {
                return mutate({
                    variables: { id }
                })
            }
        })
    }
)

PhotoCard.propTypes = {
    dispatch: PropTypes.func.isRequired,
    deleteFile: PropTypes.func.isRequired,
    addResized: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    image: PropTypes.object.isRequired
}

export default withRemove(withAddResized(PhotoCard))
