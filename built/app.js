"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_navigation_1 = require("react-navigation");
const home_1 = require("./scenes/home");
const course_1 = require("./scenes/course");
const App = react_navigation_1.StackNavigator({
    HomeScene: { screen: home_1.default },
    CourseScene: { screen: course_1.default }
});
exports.default = App;
