import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { getTodoById } from '../../reducers/todos'
import {
    createTodo,
    updateTodo,
    loadTodo
} from '../../actions/todo'

class CreateTodo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            desc: '',
            done: false,
            titleIsRequired: false
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    static propTypes = {
        onCreateTodo: PropTypes.func.isRequired,
        onUpdateTodo: PropTypes.func.isRequired,
        onLoadTodo: PropTypes.func.isRequired
    }


    handleInputChange(event) {
        if(event.target.name === 'title') {
            this.setState({ titleIsRequired: !event.target.value })
        }
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        const { params: { id }} = this.props

        if(!this.state.title) {
            this.setState({ titleIsRequired: true })
            return;
        }

        if(!id) {
            this.setState({ created: Date.now() })
            this.props.onCreateTodo(this.state)
        }else {
            this.props.onUpdateTodo({id: id, ...this.state})
            setTimeout(() => browserHistory.push(`/todos/${id}`), 200)
        }

    }

    componentDidMount() {
        const { params: { id }} = this.props
        if(id) {
            this.props.onLoadTodo(id).then((res) => {
                this.setState({
                    title: res.payload[0].title,
                    desc : res.payload[0].desc,
                    done : res.payload[0].done
                })
            })
        }
    }

    render() {
        return (
            <form className="create-todo" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="todoTitle">Title</label>
                    <input id="todoTitle"
                           type="text"
                           name="title"
                           className="form-control"
                           placeholder="Enter title"
                           value={this.state.title}
                           onChange={this.handleInputChange} />
                    {   this.state.titleIsRequired &&
                        <small className="form-text text-danger">Title is required!</small>
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="todoDesc">Description</label>
                    <textarea id="todoDesc"
                              name="desc"
                              className="form-control"
                              rows="3"
                              placeholder="Enter description"
                              value={this.state.desc}
                              onChange={this.handleInputChange}></textarea>
                </div>
                <div className="form-group">
                    <Link to={{ pathname: '/todos' }} className="btn btn-outline-secondary btn-sm">Cancel</Link>
                    <button type="submit" className="btn btn-outline-primary btn-sm">Save</button>
                </div>
            </form>
        )
    }
}

export default connect(
    (state, props) => ({}),
    {
        onCreateTodo: createTodo,
        onUpdateTodo: updateTodo,
        onLoadTodo: loadTodo
    }
)(CreateTodo)