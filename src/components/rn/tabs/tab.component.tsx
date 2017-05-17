import * as React from 'react'
import {
    View,
    Text
} from 'react-native'
import * as PubSub from 'pubsub-js'

interface PropsDefine {
    name: string
    icon?: JSX.Element

    tabIndex?: number
}
interface StateDefine {
}
export class Tab extends React.Component<PropsDefine, StateDefine> {

    static childContextTypes = {
        tabIndex: React.PropTypes.number
    }

    getChildContext() {
        return {
            tabIndex: this.props.tabIndex
        }
    }
    render() {
        return (
            <View>
                {this.props.children}
            </View>
        )
    }
}