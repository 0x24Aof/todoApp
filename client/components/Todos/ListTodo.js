import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadTodos } from '../../actions/todo'
import ItemTodo from './ItemTodo'
import FilterTodo from './FilterTodo'

class ListTodo extends Component {

    constructor(props) {
        super(props)

        this.state = {
            filter: 'all'
        }
        this.updateFilter = this.updateFilter.bind(this)
    }

    static propTypes = {
        todos: PropTypes.array.isRequired,
        onLoadTodos: PropTypes.func.isRequired
    }

    shouldComponentUpdate(nextProps) {
        return this.props.todos !== nextProps.todos;
    }

    componentDidMount() {
        this.props.onLoadTodos(this.state.filter)
    }

    updateFilter(filter) {
        this.setState({filter: filter})
        this.props.onLoadTodos(filter)
    }

    render() {
        return (
            <div>
                <FilterTodo onUpdateFilter={this.updateFilter} filter={this.state.filter}/>
                <ul className="todo-list">
                    {
                        this.props.todos.map((item, idx) => (
                            <ItemTodo key={idx} todo={item}></ItemTodo>
                        ))
                    }
                </ul>
            </div>
        )
    }
}

export default connect(
    (state) => ({ todos: state.todos }),
    { onLoadTodos: loadTodos }
)(ListTodo)