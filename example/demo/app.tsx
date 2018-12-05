import {hot} from 'imhotep'
import React from 'react'
import './a.scss'

import Counter from './counter'

class MyApp extends React.Component<{}, {}> {
    public render() {
        return (
            <React.Fragment>
                <h1>Demo!</h1>
                <input type="text" />
                <Counter />
            </React.Fragment>
        )
    }
}

export default hot(module)(MyApp)
