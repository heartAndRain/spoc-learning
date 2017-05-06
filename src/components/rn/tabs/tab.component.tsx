import * as React from 'react'
import {
    View,
    Text
} from 'react-native'

interface PropsDefine {
    name: string
    icon?: JSX.Element
}
export class Tab extends React.Component<PropsDefine, {}> {
    render() {
        return <View>
            {this.props.children}
        </View>
    }
}