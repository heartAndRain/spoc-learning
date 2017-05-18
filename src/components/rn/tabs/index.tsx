import * as React from 'react'
import * as PubSub from 'pubsub-js'
import {
    View,
    ViewStyle,
    TextStyle,
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
    itemTextStyle?: TextStyle
}
interface StateDefine {
    // TabHeader的 active line 的 坐标信息
    activeLineX: Animated.Value
}

export class Tabs extends React.Component<PropsDefine, StateDefine> {
    static defaultProps = {
        itemStyle: 'default'
    }

    // 设置Contect的类型，React让强制设置
    static childContextTypes = {
        tabRenderIndex: React.PropTypes.number
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

    handlePageSelected = (event: NativeSyntheticEvent<ViewPagerAndroidOnPageScrollEventData>) => {
        const {position} = event.nativeEvent

        //PubSub.publish('TAB_CHANGE', position)
    }

    handlePageStateChanged = (state: 'Idle' | 'Dragging' | 'Settling') => {
        // 坑！此处打印出的是小写
        // console.warn(state)
    }

    handleSelectedItem = (index: number) => {
        this.viewPager.setPage(index)
    }

    render() {
        console.warn('tab render')
        return (
            <View style={{height: this.winHeight}}>
                <TabHeader
                    itemStyle={this.props.itemStyle}
                    itemTextStyle={this.props.itemTextStyle}
                    style={[styles.headerStyle, this.props.headerStyle]}
                    tabNames={this.getTabNames()}
                    activeLineLeft={this.state.activeLineX}
                    onSelected={this.handleSelectedItem}
                />
                <ViewPagerAndroid
                    ref={(instance: any) => this.viewPager = instance}
                    style={styles.contentStyle}
                    onPageScroll={this.handlePageScroll}
                    onPageSelected={this.handlePageSelected}
                    onPageScrollStateChanged={this.handlePageStateChanged}
                >
                    {
                       // 为每一个Tab组件传入index
                       /*React.Children.map(this.props.children, (Tab, index) => {
                           return React.cloneElement(Tab as React.ReactElement<any>, {
                                    tabIndex: index
                               })
                       })*/
                       (this.props.children as Array<Tab>).map((Tab) => <View>{Tab.props.children}</View>)
                    }
                </ViewPagerAndroid>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        elevation: 0
    },
    contentStyle: {
        flex: 1
    }
})

export {Tab} from './tab.component'
export {TabLazyLoad} from './tab-lazyload.decorator'