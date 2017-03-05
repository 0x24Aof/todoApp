import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { loadTodos, loadTodo } from '../../actions/todo'
import { getTodoById } from '../../reducers/todos'

class ShowTodo extends Component {

    static propTypes = {
        todo: PropTypes.object,
        onLoadTodo: PropTypes.func.isRequired,
        onLoadTodos: PropTypes.func.isRequired
    }

    shouldComponentUpdate(nextProps) {
        return this.props.todo !== nextProps.todo;
    }

    componentDidMount() {
        const { onLoadTodos } = this.props
        onLoadTodos()
    }

    render() {
        const { _id, title, desc, created, done } = this.props.todo
        const createdAt = created? new Date(created).toLocaleDateString() : null
        return (
            <div className="show-todo">
                <table className="table">
                    <tbody>
                    <tr>
                        <th scope="row">ID:</th>
                        <td>{_id}</td>
                    </tr>
                    <tr>
                        <th scope="row">Title:</th>
                        <td>{title}</td>
                    </tr>
                    <tr>
                        <th scope="row">Description:</th>
                        <td>{desc}</td>
                    </tr>
                    <tr>
                        <th scope="row">Date:</th>
                        <td>{createdAt}</td>
                    </tr>
                    <tr>
                        <th scope="row">Status:</th>
                        <td>{done? 'Completed': 'Incomplete'}</td>
                    </tr>
                    </tbody>
                </table>
                <Link to={{ pathname: '/todos' }} className="btn btn-outline-secondary btn-sm"><i className="fa fa-chevron-left"></i> Back </Link>
            </div>
        )
    }
}

export default connect(
    (state, props) => ({todo: getTodoById(state, props.params.id)}),
    { onLoadTodo: loadTodo, onLoadTodos: loadTodos }
)(ShowTodo)