import { CALL_API } from 'redux-api-middleware'
import { push } from 'react-router-redux'
import {
    LOAD_TODOS_REQUEST, LOAD_TODOS_SUCCESS, LOAD_TODOS_FAILURE,
    LOAD_TODO_REQUEST, LOAD_TODO_SUCCESS, LOAD_TODO_FAILURE,
    CREATE_TODO_REQUEST, CREATE_TODO_SUCCESS, CREATE_TODO_FAILURE,
    UPDATE_TODO_REQUEST, UPDATE_TODO_SUCCESS, UPDATE_TODO_FAILURE,
    DELETE_TODO_REQUEST, DELETE_TODO_SUCCESS, DELETE_TODO_FAILURE,
    TOGGLE_ALL_REQUEST, TOGGLE_ALL_SUCCESS, TOGGLE_ALL_FAILURE

} from '../constants/actionTypes'
import { TODOS_ENDPOINT } from '../constants/endpoint'

export const loadTodos = (filter) => ({
    [CALL_API]: {
        endpoint: `${TODOS_ENDPOINT}?filter=${filter}`,
        method: 'GET',
        types: [LOAD_TODOS_REQUEST, LOAD_TODOS_SUCCESS, LOAD_TODOS_FAILURE]
    }
})

export const loadTodo = (id) => ({
    [CALL_API]: {
        endpoint: `${TODOS_ENDPOINT}/${id}`,
        method: 'GET',
        types: [LOAD_TODO_REQUEST, LOAD_TODO_SUCCESS, LOAD_TODO_FAILURE]
    }
})

export const createTodo = (todo) => (
    (dispatch) =>
        dispatch({
            [CALL_API]: {
                endpoint: TODOS_ENDPOINT,
                headers : {
                    'Accept'      : 'application/json',
                    'Content-Type': 'application/json'
                },
                body    : JSON.stringify(todo),
                method  : 'POST',
                types   : [
                    CREATE_TODO_REQUEST,
                    {
                        type   : CREATE_TODO_SUCCESS,
                        payload: (_action, _state, res) => {
                            return res.json().then((todo) => {
                                dispatch(push(`/todos/${todo.data._id}`))
                                return todo
                            })
                        }
                    },
                    CREATE_TODO_FAILURE
                ]
            }
        })
)

export const toggleAllTodo = (checked) => ({
    [CALL_API]: {
        endpoint: `${TODOS_ENDPOINT}/toggleAll?checked=${checked}`,
        headers : {
            'Accept'      : 'application/json',
            'Content-Type': 'application/json'
        },
        method  : 'POST',
        types   : [TOGGLE_ALL_REQUEST, TOGGLE_ALL_SUCCESS, TOGGLE_ALL_FAILURE]
    }
})

export const updateTodo = (todo) => ({
    [CALL_API]: {
        endpoint: `${TODOS_ENDPOINT}/${todo.id || todo._id}`,
        headers : {
            'Accept'      : 'application/json',
            'Content-Type': 'application/json'
        },
        body    : JSON.stringify(todo),
        method  : 'PUT',
        types   : [UPDATE_TODO_REQUEST, UPDATE_TODO_SUCCESS, UPDATE_TODO_FAILURE]
    }
})

export const removeTodo = (id) => ({
    [CALL_API]: {
        endpoint: `${TODOS_ENDPOINT}/${id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        types: [DELETE_TODO_REQUEST, DELETE_TODO_SUCCESS, DELETE_TODO_FAILURE]
    }
})