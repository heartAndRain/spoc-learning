import * as React from 'react'
import {
    View,
    Text,
    ActivityIndicator
} from 'react-native'

interface PropsDefine {
    size?: 'small' | 'large' | number
    color?: string
}
export default class Loading extends React.Component<PropsDefine, any> {
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'}}>
                <ActivityIndicator size={this.props.size} color={this.props.color}>

                </ActivityIndicator>
            </View>
        )
    }
}