import * as React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import { Navigator } from 'react-native-navigation'
import { Tabs, Tab } from  '../../components/rn/tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Client} from '../../utils/gql-client'


interface PropsDefine {
}

interface StateDefine {
}

export default class CourseScene extends React.Component<PropsDefine, StateDefine> {
    render() {
        console.log('coursehome')
        return (
            <View style={styles.container}>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})