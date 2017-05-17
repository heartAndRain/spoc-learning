"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const tab_header_component_1 = require("./tab-header.component");
class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.winHeight = react_native_1.Dimensions.get('window').height;
        this.winWidth = react_native_1.Dimensions.get('window').width;
        // 总页数
        this.pageTotal = 0;
        this.getTabNames = () => {
            if (Object.prototype.toString.call(this.props.children) !== '[object Array]') {
                console.warn('Tab children should be Tab');
                return [];
            }
            return this.props.children.map((tab) => {
                return {
                    text: tab.props.name,
                    icon: tab.props.icon
                };
            });
        };
        this.handlePageScroll = (event) => {
            const { offset, position } = event.nativeEvent;
            react_native_1.Animated.timing(this.state.activeLineX, {
                toValue: (offset + position) * (this.winWidth / this.pageTotal),
                duration: 0
            }).start();
        };
        this.handlePageSelected = (event) => {
            const { position } = event.nativeEvent;
            //PubSub.publish('TAB_CHANGE', position)
        };
        this.handlePageStateChanged = (state) => {
            // 坑！此处打印出的是小写
            // console.warn(state)
        };
        this.handleSelectedItem = (index) => {
            this.viewPager.setPage(index);
        };
        this.state = {
            activeLineX: new react_native_1.Animated.Value(0)
        };
        this.pageTotal = this.props.children.length;
    }
    render() {
        console.warn('tab render');
        return (React.createElement(react_native_1.View, { style: { height: this.winHeight } },
            React.createElement(tab_header_component_1.default, { itemStyle: this.props.itemStyle, itemTextStyle: this.props.itemTextStyle, style: [styles.headerStyle, this.props.headerStyle], tabNames: this.getTabNames(), activeLineLeft: this.state.activeLineX, onSelected: this.handleSelectedItem }),
            React.createElement(react_native_1.ViewPagerAndroid, { ref: (instance) => this.viewPager = instance, style: styles.contentStyle, onPageScroll: this.handlePageScroll, onPageSelected: this.handlePageSelected, onPageScrollStateChanged: this.handlePageStateChanged }, 
            // 为每一个Tab组件传入index
            React.Children.map(this.props.children, (Tab, index) => {
                return React.cloneElement(Tab, {
                    tabIndex: index
                });
            }))));
    }
}
Tabs.defaultProps = {
    itemStyle: 'default'
};
// 设置Contect的类型，React让强制设置
Tabs.childContextTypes = {
    tabRenderIndex: React.PropTypes.number
};
exports.Tabs = Tabs;
const styles = react_native_1.StyleSheet.create({
    headerStyle: {
        elevation: 0
    },
    contentStyle: {
        flex: 1
    }
});
var tab_component_1 = require("./tab.component");
exports.Tab = tab_component_1.Tab;
var tab_lazyload_decorator_1 = require("./tab-lazyload.decorator");
exports.TabLazyLoad = tab_lazyload_decorator_1.TabLazyLoad;
