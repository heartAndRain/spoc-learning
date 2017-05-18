import * as React from 'react'
import {
    View,
    ViewStyle,
    Text,
    Image
} from 'react-native'

export interface PropsDefine {
    size?: number
    uri?: string

    style?: ViewStyle
}
export default class Avatar extends React.Component<PropsDefine, any> {

    static defaultProps = {
        size: 20
    }
    render() {
        const { size, uri } = this.props

        return (
            <View style={this.props.style}>
                <Image style={{width: size, height: size, borderRadius: size / 2}} source={uri ? {uri} : require('../../../../images/default_avatar.png')}></Image>
            </View>
        )
    }
}
