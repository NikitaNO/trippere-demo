import React, { Component } from 'react'
import { reduxForm, FieldArray } from 'redux-form'
import PropTypes from 'prop-types'

import * as ReactToastr from 'react-toastr'

import styled from 'styled-components'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { createPlan } from './../actions'

import Plan from './Plan'

const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation)

const Header = styled.h1`
  display: inline-block;
`

const renderPlans = ({ fields }) => (
    <div>
        <Header>My Details</Header>
        <button className="btn btn-success pull-right"
                style={{ marginTop: '20px' }}
                onClick={() => fields.push({
                    destination: 'Japan',
                    duration: 0,
                    price: 0,
                    currency: 'USD'
                })}>
            + Add Plan
        </button>
        <hr />
        {
            fields.map((member, index) => (
                <Plan key={index}
                      index={index}
                      fields={fields}
                      member={member} />
            ))
        }
    </div>
)

class MyDetailsForm extends Component {
    addAlert () {
        this.container.success(
            'Plans was successfully saved',
            'Success',
            {
                timeOut: 5000
            }
        )
    }

    onSubmit (data) {
        const { dispatch, addPlan } = this.props
        const self = this

        if (Array.isArray(data.plans) && data.plans.length) {
            dispatch(createPlan(addPlan, data.plans))
                .then(() => {
                    self.addAlert()
                })
        }
    }

    render () {
        const { handleSubmit } = this.props

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2 clearfix">
                        <FieldArray name="plans"
                                    component={renderPlans} />
                        <hr />
                        <button className="btn btn-success pull-right"
                                onClick={handleSubmit(props => this.onSubmit(props))}>Next</button>
                        <ReactToastr.ToastContainer ref={input => this.container = input}
                                                    toastMessageFactory={ToastMessageFactory}
                                                    className="toast-top-right"
                                                    preventDuplicates={true} />
                    </div>
                </div>
            </div>
        )
    }
}

const withAddPlan = graphql(
    gql`mutation addPlan($destination: Country!, $duration: Int!, $price: Int!, $currency: Currency!) {
      createPlan(destination: $destination, duration: $duration, price: $price, currency: $currency) { destination duration price currency }
    }`,
    {
        props: ({ mutate }) => ({
            addPlan (variables) {
                return mutate({ variables })
            }
        })
    }
)

MyDetailsForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    addPlan: PropTypes.func.isRequired
}

export default withAddPlan(
    reduxForm({
        form: 'my-details'
    })(MyDetailsForm)
)
