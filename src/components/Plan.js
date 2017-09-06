import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

export default class Plan extends Component {
    getDestinationSelect ({ input }) {
        return (
            <select {...input}
                    name="destination"
                    id="destination"
                    className="form-control">
                <option value="Japan">Japan</option>
                <option value="Albania">Albania</option>
                <option value="Canada">Canada</option>
                <option value="France">France</option>
            </select>
        )
    }

    getDurationInput ({ input }) {
        return (
            <input {...input}
                   type="number"
                   id="duration"
                   min="0"
                   className="form-control" />
        )
    }

    getPriceInput ({ input }) {
        return (
            <input {...input}
                   type="number"
                   id="price"
                   min="0"
                   className="form-control" />
        )
    }

    getCurrencySelect ({ input }) {
        return (
            <select {...input}
                    name="currency"
                    className="form-control">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
            </select>
        )
    }

    render () {
        const { fields, index, member } = this.props

        return (
            <div className="row">
                <div className="form-group col-md-3">
                    <label htmlFor="destination">Destination</label>
                    <Field name={`${member}.destination`}
                           component={this.getDestinationSelect} />
                </div>
                <div className="form-group col-md-3">
                    <label htmlFor="duration">Duration (days)</label>
                    <Field name={`${member}.duration`}
                           component={this.getDurationInput} />
                </div>
                <div className="form-group col-md-2">
                    <label htmlFor="price">Price</label>
                    <Field name={`${member}.price`}
                           component={this.getPriceInput} />
                </div>
                <div className="form-group col-md-2">
                    <label>&nbsp;</label>
                    <Field name={`${member}.currency`}
                           component={this.getCurrencySelect} />
                </div>
                <div className="col-md-2 clearfix">
                    <button className="btn btn-danger pull-right"
                            style={{ display: 'block', position: 'relative', top: '25px' }}
                            onClick={() => fields.remove(index)}>
                        <span className="glyphicon glyphicon-trash" />
                    </button>
                </div>
            </div>
        )
    }
}

Plan.propTypes = {
    index: PropTypes.number.isRequired,
    fields: PropTypes.any.isRequired,
    member: PropTypes.string.isRequired
}
