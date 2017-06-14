"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const react_native_navigation_1 = require("react-native-navigation");
const init_1 = require("./init");
const login_1 = require("./scenes/login");
const home_1 = require("./scenes/home");
const index_page_1 = require("./scenes/home/index-page");
const select_page_1 = require("./scenes/home/select-page");
const user_page_1 = require("./scenes/home/user-page");
const course_1 = require("./scenes/course");
const course_home_1 = require("./scenes/course/course-home");
const course_homework_1 = require("./scenes/course/course-homework");
const course_grades_1 = require("./scenes/course/course-grades");
const course_communication_1 = require("./scenes/course/course-communication");
const course_content_1 = require("./scenes/course/course-content");
const course_create_1 = require("./scenes/course/course-create");
const course_content_create_1 = require("./scenes/course/course-create/course-content-create");
const homework_1 = require("./scenes/homework");
const setting_profile_1 = require("./scenes/user/setting-profile");
const course_apply_1 = require("./scenes/select/course-apply");
const scenes = {
    LoginScene: login_1.default,
    HomeScene: home_1.default,
    IndexPage: index_page_1.default,
    SelectPage: select_page_1.default,
    UserPage: user_page_1.default,
    SettingProfileScene: setting_profile_1.default,
    CourseScene: course_1.default,
    CourseHomePage: course_home_1.default,
    CourseHomeworkPage: course_homework_1.default,
    CourseGradesPage: course_grades_1.default,
    CourseCommunicationPage: course_communication_1.default,
    CourseContentScene: course_content_1.default,
    CourseCreateScene: course_create_1.default,
    CourseContentCreateScene: course_content_create_1.default,
    HomeworkScene: homework_1.default,
    CourseApplyScene: course_apply_1.default
};
// regist
Object.keys(scenes).map((sceneName) => {
    react_native_navigation_1.Navigation.registerComponent(sceneName, () => scenes[sceneName]);
});
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        react_native_navigation_1.Navigation.startSingleScreenApp({
            screen: {
                screen: 'HomeScene',
                topTabs: [
                    {
                        screenId: 'IndexPage',
                        icon: require('../images/ic_home_white.png')
                    },
                    {
                        screenId: 'SelectPage',
                        icon: require('../images/ic_library_books_white.png')
                    },
                    {
                        screenId: 'UserPage',
                        icon: require('../images/ic_person_white.png')
                    }
                ]
            },
            // 全局样式定义
            appStyle: {
                screenBackgroundColor: '#ececec',
                selectedTopTabIndicatorHeight: 8,
                selectedTopTabTextColor: '#fff',
                topTabTextColor: '#fff',
                selectedTopTabIndicatorColor: '#fff',
                topTabsScrollable: false,
                topTabIconColor: '#fff',
                selectedTopTabIconColor: '#fff',
                statusBarColor: '#ba3d42',
                navBarBackgroundColor: '#e84e40',
                navBarTextColor: '#fff',
                navBarButtonColor: '#fff'
            }
        });
        init_1.initApp();
    });
}
exports.run = run;
class App {
    constructor() {
        init_1.initApp();
    }
    static getAppInstance() {
        return this.app || new App();
    }
    getAppState() {
        return react_native_1.AppState.currentState;
    }
    getLoginUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const userArray = yield react_native_1.AsyncStorage.multiGet(['@userId', '@username', '@role', '@stat']);
            let user = {};
            userArray.map((item) => {
                user[item[0].replace('@', '')] = item[1];
            });
            return user;
        });
    }
    setLoginUser() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
App.app = null;
exports.App = App;
