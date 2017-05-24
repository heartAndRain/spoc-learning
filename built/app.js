"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_navigation_1 = require("react-navigation");
const home_1 = require("./scenes/home");
const course_1 = require("./scenes/course");
const course_content_1 = require("./scenes/course/course-content");
const select_1 = require("./scenes/select");
const homework_1 = require("./scenes/homework");
const App = react_navigation_1.StackNavigator({
    HomeScene: { screen: home_1.default },
    CourseScene: { screen: course_1.default },
    SelectScene: { screen: select_1.default },
    CourseContentScene: { screen: course_content_1.default },
    HomeworkScene: { screen: homework_1.default }
});
exports.default = App;
