import React, { Component } from 'react'
import { Link } from 'react-router'
import Header from './Header'

export default class App extends Component {
    render() {
        return (
            <div className='container'>
                <div className="reminder">
                    <Header />
                    {this.props.children}
                </div>
            </div>
        )
    }
}
