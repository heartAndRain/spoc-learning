"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
class Tab extends React.Component {
    render() {
        return React.createElement(react_native_1.View, null, this.props.children);
    }
}
exports.Tab = Tab;
