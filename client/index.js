import React, { Component } from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { AppContainer } from 'react-hot-loader'
import Root from './containers/Root'
import './theme/main.scss'

const initialState = window.__INITIAL_STATE__
const mountPoint = document.getElementById('app');

render(
    <AppContainer>
        <Root history={browserHistory}
              initialState={initialState} />
    </AppContainer>,
    mountPoint
)

if(module.hot) {
    module.hot.accept('./containers/Root', () => {
        const NextRootApp = require('./containers/Root').default

        render(
            <AppContainer>
                <NextRootApp history={browserHistory}
                             initialState={initialState}/>
            </AppContainer>,
            mountPoint
        )
    })
}