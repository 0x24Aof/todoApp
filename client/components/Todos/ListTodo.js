import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadTodos, toggleAllTodo } from '../../actions/todo'
import ItemTodo from './ItemTodo'
import FilterTodo from './FilterTodo'

class ListTodo extends Component {

    constructor(props) {
        super(props)

        this.state = {
            filter: 'all',
            checkAll: false
        }
        this.updateFilter = this.updateFilter.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleComplete = this.handleComplete.bind(this)
    }

    static propTypes = {
        todos: PropTypes.array.isRequired,
        onLoadTodos: PropTypes.func.isRequired,
        onToggleAllTodo: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.onLoadTodos(this.state.filter).then((res) => {
            if(!res.error) {
                var checkAll = res.payload.length > 0? res.payload.map(todo => todo.done).every(done => done === true)
                                                     : false
                this.setState({checkAll: checkAll})
            }
        })
    }

    updateFilter(filter) {
        this.setState({filter: filter})
        this.props.onLoadTodos(filter).then((res) => {
            if(!res.error) {
                var checkAll = res.payload.length > 0? res.payload.map(todo => todo.done).every(done => done === true)
                    : false
                this.setState({checkAll: checkAll})
            }
        })
    }

    handleChange(event) {
        console.log(event.target.checked)
        this.setState({ checkAll: !this.state.checkAll })
        this.props.onToggleAllTodo(event.target.checked)
    }

    handleComplete() {
        this.props.onLoadTodos(this.state.filter).then((res) => {
            if(!res.error) {
                var checkAll = res.payload.length > 0? res.payload.map(todo => todo.done).every(done => done === true)
                    : false
                this.setState({checkAll: checkAll})
            }
        })
    }

    render() {
        return (
            <div>
                <label htmlFor="checkAll" className="check-all">
                    <input id="checkAll" type="checkbox" onChange={this.handleChange} checked={this.state.checkAll} />
                    Check All
                </label>
                <FilterTodo onUpdateFilter={this.updateFilter} filter={this.state.filter}/>
                <ul className="todo-list">
                    {
                        this.props.todos.map((item, idx) => (
                            <ItemTodo key={idx}
                                      todo={item}
                                      onCompleteTodo={this.handleComplete}>
                            </ItemTodo>
                        ))
                    }
                </ul>
            </div>
        )
    }
}

export default connect(
    (state) => ({ todos: state.todos }),
    { onLoadTodos: loadTodos, onToggleAllTodo: toggleAllTodo }
)(ListTodo)