import * as React from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Dimensions,
    TouchableNativeFeedback,
    ActivityIndicator
} from 'react-native'
import { Tabs, Tab } from  '../../components/rn/tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Client} from '../../utils/gql-client'

import IndexPage from './index-page'
import SelectPage from './select-page'
import UserPage from './user-page'

interface StateDefine {
}

export default class HomeScene extends React.Component<any, StateDefine> {

    static navigatorStyle = {
        navBarHidden: true
    }
    render() {
        return (
            <View style={{flex: 1}}>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    searchBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 54,
        height: 54,
        position: 'absolute',
        right: 20,
        top: 100,
        borderRadius: 28,
        elevation: 5,
        backgroundColor: '#e84e40'
    }
})