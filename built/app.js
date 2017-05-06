"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const tabs_1 = require("./components/rn/tabs");
const MaterialIcons_1 = require("react-native-vector-icons/MaterialIcons");
class App extends React.Component {
    componentWillMount() {
        react_native_1.StatusBar.setBackgroundColor('#ba3d42', true);
    }
    render() {
        return (React.createElement(react_native_1.View, null,
            React.createElement(tabs_1.Tabs, { headerStyle: { backgroundColor: '#e84e40' }, itemStyle: 'icon' },
                React.createElement(tabs_1.Tab, { name: "首页", icon: React.createElement(MaterialIcons_1.default, { name: 'home', size: 25, color: '#fff' }) },
                    React.createElement(react_native_1.View, null,
                        React.createElement(react_native_1.Text, null, "\u9996\u9875"))),
                React.createElement(tabs_1.Tab, { name: "选课", icon: React.createElement(MaterialIcons_1.default, { name: 'library-books', size: 25, color: '#fff' }) },
                    React.createElement(react_native_1.View, null,
                        React.createElement(react_native_1.Text, null, "\u9009\u8BFE"))),
                React.createElement(tabs_1.Tab, { name: "搜索", icon: React.createElement(MaterialIcons_1.default, { name: 'search', size: 25, color: '#fff' }) },
                    React.createElement(react_native_1.View, null,
                        React.createElement(react_native_1.Text, null, "\u641C\u7D22"))),
                React.createElement(tabs_1.Tab, { name: "个人", icon: React.createElement(MaterialIcons_1.default, { name: 'person', size: 25, color: '#fff' }) },
                    React.createElement(react_native_1.View, null,
                        React.createElement(react_native_1.Text, null, "\u4E2A\u4EBA"))))));
    }
}
exports.default = App;
