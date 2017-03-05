import {
    LOAD_TODOS_SUCCESS,
    LOAD_TODO_SUCCESS,
    CREATE_TODO_SUCCESS,
    UPDATE_TODO_SUCCESS,
    DELETE_TODO_SUCCESS,
    TOGGLE_ALL_SUCCESS
} from '../constants/actionTypes'

const initialState = []

export default (state = initialState, action) => {
    switch(action.type) {
        case LOAD_TODOS_SUCCESS:
            return action.payload
        case LOAD_TODO_SUCCESS:
            return action.payload
        case CREATE_TODO_SUCCESS:
            return action.payload.data
        case UPDATE_TODO_SUCCESS:
            return state.map((todo, idx) => {
                if(todo._id === action.payload.data._id) {
                    todo[idx] = action.payload.data
                }

                return todo
            })
        case TOGGLE_ALL_SUCCESS:
            state = action.payload.data
            return state
        case DELETE_TODO_SUCCESS:
            return state.filter(todo => todo._id !== action.payload.data)
        default:
            return state
    }
}

export const getTodoById = (state, id) => (
    Array.isArray(state.todos)? state.todos.find((todo) => todo._id === id) || { title: '', desc: '' }
                              : [state.todos].find((todo) => todo._id === id) || { title: '', desc: '' }
)
