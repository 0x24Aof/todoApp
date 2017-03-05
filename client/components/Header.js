import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Header extends Component {
    render() {
        return (
            <div className="reminder-header">
                <h1 className="reminder-header__title"><i className="fa fa-list"></i> Reminders </h1>
                <Link to={{ pathname: '/todos/create' }} className="btn btn-outline-success btn-sm">
                    <i className="fa fa-plus"></i>
                </Link>
            </div>
        )
    }
}