"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
class Tab extends React.Component {
    getChildContext() {
        return {
            tabIndex: this.props.tabIndex
        };
    }
    render() {
        return (React.createElement(react_native_1.View, null, this.props.children));
    }
}
Tab.childContextTypes = {
    tabIndex: React.PropTypes.number
};
exports.Tab = Tab;
