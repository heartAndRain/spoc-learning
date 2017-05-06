"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
class TabHeader extends React.Component {
    render() {
        return (React.createElement(react_native_1.View, { style: styles.container }, this.props.tabNames.map((tabItem) => {
            return (React.createElement(react_native_1.View, { style: styles.item },
                React.createElement(react_native_1.Text, null, tabItem.text)));
        })));
    }
}
exports.default = TabHeader;
const styles = react_native_1.StyleSheet.create({
    container: {
        width: react_native_1.Dimensions.get('window').width,
        height: 45,
        flexDirection: 'row'
    },
    item: {}
});
