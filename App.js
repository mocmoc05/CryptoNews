/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, StatusBar} from 'react-native';
import StackNav from './src/navigation/StackNav'
import {Provider} from 'react-redux'
import configStore from './src/store/configStore'

type Props = {};
export default class App extends Component<Props> {
    componentDidMount() {
        StatusBar.setHidden(true)
    }
    render() {
        return (
            <Provider store={configStore()}>
                <StackNav/>
            </Provider>
        );
    }
}
