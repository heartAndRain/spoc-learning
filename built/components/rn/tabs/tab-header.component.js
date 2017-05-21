"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
class TabHeader extends React.Component {
    constructor(props) {
        super(props);
        this.winWidth = react_native_1.Dimensions.get('window').width;
        this.itemWidth = 0;
        this.itemWidth = this.props.tabNames.length ? this.winWidth / this.props.tabNames.length : 0;
    }
    render() {
        return (React.createElement(react_native_1.View, { style: [styles.container, this.props.style] },
            this.props.tabNames.map((tabItem, index) => {
                return (React.createElement(react_native_1.TouchableNativeFeedback, { key: tabItem.text, onPress: () => { this.props.onSelected && this.props.onSelected(index); } },
                    React.createElement(react_native_1.View, { style: styles.item }, this.props.itemStyle === 'default' ? React.createElement(react_native_1.Text, { style: this.props.itemTextStyle }, tabItem.text) : tabItem.icon)));
            }),
            React.createElement(react_native_1.Animated.View, { style: [styles.activeLine, {
                        width: this.itemWidth,
                        left: this.props.activeLineLeft
                    }] })));
    }
}
exports.default = TabHeader;
const styles = react_native_1.StyleSheet.create({
    container: {
        width: react_native_1.Dimensions.get('window').width,
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
});
