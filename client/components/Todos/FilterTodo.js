import React, { Component } from 'react'

export default class FilterTodo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filter: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({filter: nextProps.filter});
    }

    handleFilter(filter) {
        this.setState({filter: filter})
        this.props.onUpdateFilter(filter)
    }

    render() {
        return (
            <div className="filter">
                Filter:
                <ul className="filter-list">
                    <li><a className={this.state.filter === 'all'? 'active': ''} onClick={this.handleFilter.bind(this, 'all')}>All</a></li>
                    <li><a className={this.state.filter === 'remain'? 'active': ''} onClick={this.handleFilter.bind(this, 'remain')}>Remain</a></li>
                    <li><a className={this.state.filter === 'done'? 'active': ''} onClick={this.handleFilter.bind(this, 'done')}>Done</a></li>
                </ul>
            </div>
        )
    }
}

FilterTodo.propTypes = {
    onUpdateFilter: React.PropTypes.func
}