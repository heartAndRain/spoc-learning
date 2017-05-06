import * as React from 'react'
import {
    View,
    ViewStyle,
    ViewPagerAndroid,
    Text,
    Dimensions,
    Animated,
    StyleSheet,
    NativeSyntheticEvent,
    ViewPagerAndroidOnPageScrollEventData,
    ViewPagerAndroidStatic
} from 'react-native'
import Icon from '../Icon'
import TabHeader, {HeaderItem} from './tab-header.component'
import {Tab} from './tab.component'


interface PropsDefine {
    headerStyle?: ViewStyle
    itemStyle?: 'default' | 'icon'
}
interface StateDefine {
    // TabHeader的 active line 的 坐标信息
    activeLineX: Animated.Value
}

export class Tabs extends React.Component<PropsDefine, StateDefine> {
    static defaultProps = {
        itemStyle: 'default'
    }

    private winHeight = Dimensions.get('window').height
    private winWidth = Dimensions.get('window').width

    // 总页数
    private pageTotal: number = 0

    // viewpager instance
    private viewPager: ViewPagerAndroidStatic

    constructor(props: PropsDefine) {
        super(props)
        this.state = {
            activeLineX: new Animated.Value(0)
        }

        this.pageTotal = (this.props.children as Array<Tab>).length
    }

    getTabNames = (): HeaderItem[] => {
        if (Object.prototype.toString.call(this.props.children) !== '[object Array]') {
            console.warn('Tab children should be Tab')
            return []
        }
        return (this.props.children as Array<Tab>).map((tab) => {
            return {
                text: tab.props.name,
                icon: tab.props.icon
            }
        })
    }

    handlePageScroll = (event: NativeSyntheticEvent<ViewPagerAndroidOnPageScrollEventData>) => {
        const {offset, position} = event.nativeEvent
        Animated.timing(this.state.activeLineX, {
            toValue: (offset + position) * (this.winWidth / this.pageTotal),
            duration: 0
        }).start()
    }

    handlePageStateChanged = (state: 'Idle' | 'Dragging' | 'Settling') => {
        // 坑！此处打印出的是小写
        // console.warn(state)
    }

    handleSelectedItem = (index: number) => {
        this.viewPager.setPage(index)
    }

    render() {
        return (
            <View style={{height: this.winHeight}}>
                <TabHeader
                    itemStyle={this.props.itemStyle}
                    style={[styles.headerStyle, this.props.headerStyle]}
                    tabNames={this.getTabNames()}
                    activeLineLeft={this.state.activeLineX}
                    onSelected={this.handleSelectedItem}
                />
                <ViewPagerAndroid
                    ref={(instance: any) => this.viewPager = instance}
                    style={styles.contentStyle}
                    onPageScroll={this.handlePageScroll}
                    onPageScrollStateChanged={this.handlePageStateChanged}
                >
                    {
                        (this.props.children as Array<Tab>).map((tab) => tab.props.children)
                    }
                </ViewPagerAndroid>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        elevation: 5
    },
    contentStyle: {
        flex: 1
    }
})

export {Tab} from './tab.component'