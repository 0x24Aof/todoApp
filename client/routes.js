import React from 'react'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, Route, IndexRoute } from 'react-router'
import {
    App,
    ListTodo,
    CreateTodo,
    ShowTodo
} from './components'

export default (store, history) => {
    return (
        <Router history={syncHistoryWithStore(history, store)}>
            <Route path="/" component={App}>
                <IndexRoute component={ListTodo}/>
                <Route path="todos">
                    <IndexRoute component={ListTodo}/>
                    <Route path="create" component={CreateTodo}/>
                    <Route path=":id" component={ShowTodo}/>
                    <Route path=":id/edit" component={CreateTodo}/>
                </Route>
            </Route>
        </Router>
    )
}