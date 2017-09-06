import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import history from './../history'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class RegisterForm extends Component {
    onSubmit (data) {
        this.props.addUser(
            data.firstName,
            data.lastName,
            data.birthDate,
            data.gender
        )

        history.push('/add-photos')
    }

    getInput (props) {
        const { input: { value, onChange }, placeholder, id, type, meta } = props;

        return (
            <div>
                <input className="form-control"
                       type={type}
                       id={id}
                       placeholder={placeholder}
                       value={value}
                       onChange={onChange} />
                {meta.touched
                && meta.error
                && <span className="text-danger"
                         style={{ padding: '2px 0 0 4px' }}>{meta.error}</span>}
            </div>
        )
    }

    getGenderSelect (props) {
        const { input: { value, onChange }, id } = props;

        return (
            <select className="form-control"
                    id={id}
                    value={value}
                    onChange={onChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
        )
    }

    render () {
        const { handleSubmit } = this.props

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <form onSubmit={handleSubmit(props => this.onSubmit(props))}
                              className="row">
                            <h1>My Details</h1>
                            <hr />
                            <div className="form-group col-md-6">
                                <label htmlFor="firstName">First Name</label>
                                <Field name="firstName"
                                       id="firstName"
                                       placeholder="John"
                                       type="text"
                                       component={this.getInput} />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="lastName">Last Name</label>
                                <Field name="lastName"
                                       id="lastName"
                                       placeholder="Doe"
                                       type="text"
                                       component={this.getInput} />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="birthDate">Birth Date</label>
                                <Field name="birthDate"
                                       id="birthDate"
                                       type="date"
                                       component={this.getInput} />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="gender">Gender</label>
                                <Field name="gender"
                                       id="gender"
                                       component={this.getGenderSelect} />
                            </div>
                            <div className="col-md-12 clearfix">
                                <button type="submit"
                                        className="btn btn-success pull-right">Next</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const withAddUser = graphql(
    gql`mutation addUser($firstName: String!, $lastName: String!, $birthDate: String!, $gender: Gender!) {
      createUser(firstName: $firstName, lastName: $lastName, birthDate: $birthDate, gender: $gender) { firstName lastName birthDate gender }
    }`,
    {
        props: ({ mutate }) => ({
            addUser (firstName, lastName, birthDate, gender) {
                return mutate({
                    variables: {
                        firstName,
                        lastName,
                        birthDate,
                        gender
                    }
                })
            }
        })
    }
)

RegisterForm.propTypes = {
    dispatch: PropTypes.func.isRequired,
    addUser: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

export default withAddUser(
    reduxForm({
        form: 'register',
        initialValues: {
            gender: 'Male'
        },
        validate (values) {
            const errors = {}

            if (!values.firstName) {
                errors.firstName = 'Required'
            }

            if (!values.lastName) {
                errors.lastName = 'Required'
            }

            if (!values.birthDate) {
                errors.birthDate = 'Required'
            }

            return errors;
        }
    })(RegisterForm)
)
