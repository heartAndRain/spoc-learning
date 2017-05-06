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
        return (React.createElement(react_native_1.View, { style: { height: this.winHeight } },
            React.createElement(tab_header_component_1.default, { itemStyle: this.props.itemStyle, style: [styles.headerStyle, this.props.headerStyle], tabNames: this.getTabNames(), activeLineLeft: this.state.activeLineX, onSelected: this.handleSelectedItem }),
            React.createElement(react_native_1.ViewPagerAndroid, { ref: (instance) => this.viewPager = instance, style: styles.contentStyle, onPageScroll: this.handlePageScroll, onPageScrollStateChanged: this.handlePageStateChanged }, this.props.children.map((tab) => tab.props.children))));
    }
}
Tabs.defaultProps = {
    itemStyle: 'default'
};
exports.Tabs = Tabs;
const styles = react_native_1.StyleSheet.create({
    headerStyle: {
        elevation: 5
    },
    contentStyle: {
        flex: 1
    }
});
var tab_component_1 = require("./tab.component");
exports.Tab = tab_component_1.Tab;
