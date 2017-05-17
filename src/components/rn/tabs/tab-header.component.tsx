import * as React from 'react'
import {
    View,
    ViewStyle,
    Text,
    TextStyle,
    TouchableNativeFeedback,
    StyleSheet,
    Dimensions,
    Animated
} from 'react-native'


export interface HeaderItem {
    text: string
    icon?: JSX.Element
}

interface PropsDefine {
    tabNames: Array<HeaderItem>
    style?: ViewStyle
    itemStyle?: 'default' | 'icon'
    itemTextStyle?: TextStyle
    /** active线的坐标信息 */
    activeLineLeft?: Animated.Value
    onSelected?: (index: number) => void
}
interface StateDefine {
}

export default class TabHeader extends React.Component<PropsDefine,StateDefine> {
    private winWidth = Dimensions.get('window').width
    private itemWidth = 0

    constructor(props: PropsDefine) {
        super(props)

        this.itemWidth = this.props.tabNames.length ? this.winWidth / this.props.tabNames.length : 0
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                {
                    this.props.tabNames.map((tabItem, index) => {
                        return (
                            <TouchableNativeFeedback onPress={() => {this.props.onSelected && this.props.onSelected(index)}}>
                                <View style={styles.item}>
                                    {
                                        this.props.itemStyle === 'default' ? <Text style={this.props.itemTextStyle}>{tabItem.text}</Text> : tabItem.icon
                                    }
                                </View>
                            </TouchableNativeFeedback>
                        )
                    })
                }
                <Animated.View
                    style={[styles.activeLine, {
                            width: this.itemWidth,
                            left: this.props.activeLineLeft
                        }]}
                ></Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: 45,
        flexDirection: 'row'
    },
    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeLine: {
        position: 'absolute',
        height: 2,
        bottom: 0,
        backgroundColor: '#fff'
    }
})