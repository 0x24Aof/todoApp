import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { removeTodo, updateTodo } from '../../actions/todo'

class ItemTodo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            done: false
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    static propTypes = {
        todo: PropTypes.object.isRequired,
        onRemoveTodo: PropTypes.func.isRequired,
        onUpdateTodo: PropTypes.func.isRequired,
        onCompleteTodo: PropTypes.func.isRequired
    }


    handleRemoveTodo(id) {
        if(confirm('Are you sure to delete todo')) {
            this.props.onRemoveTodo(id)
        }
    }

    handleToggle(event) {
        this.setState({done: !this.state.done})
        const { onUpdateTodo, onCompleteTodo, todo } = this.props
        todo.done = event.target.checked
        onUpdateTodo(todo)
        setTimeout(onCompleteTodo, 50)

    }

    componentWillReceiveProps(nextProps) {
        this.setState({ done: nextProps.todo.done });
    }

    componentDidMount() {
        this.setState({ done: this.props.todo.done })
    }

    render() {
        const todo = this.props.todo
        return (
            <li className="todo-list-item">
                <input onChange={this.handleToggle} checked={this.state.done} className="todo-list-item__checkbox" type="checkbox"/>
                <Link to={{ pathname: `/todos/${todo._id}` }} className={this.state.done? 'done todo-list-item__title': 'todo-list-item__title'}>{ todo.title }</Link>
                {   !this.state.done &&
                    <Link to={{pathname: `/todos/${todo._id}/edit`}} className="btn btn-outline-warning btn-sm"><i
                        className="fa fa-pencil"></i></Link>
                }
                <button onClick={this.handleRemoveTodo.bind(this, todo._id)} className="btn btn-outline-danger btn-sm"><i className="fa fa-trash-o"></i></button>
            </li>
        )
    }
}

export default connect(
    (state) => ({}),
    { onRemoveTodo: removeTodo, onUpdateTodo: updateTodo }
)(ItemTodo)