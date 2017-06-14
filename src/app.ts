import {AppState, AsyncStorage} from 'react-native'
import {Navigation} from 'react-native-navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import {initApp} from './init'

import LoginScene from './scenes/login'

import HomeScene from './scenes/home'
import IndexPage from './scenes/home/index-page'
import SelectPage from './scenes/home/select-page'
import UserPage from './scenes/home/user-page'

import CourseScene from './scenes/course'
import CourseHomePage from './scenes/course/course-home'
import CourseHomeworkPage from './scenes/course/course-homework'
import CourseGradesPage from './scenes/course/course-grades'
import CourseCommunicationPage from './scenes/course/course-communication'
import CourseContentScene from './scenes/course/course-content'
import CourseCreateScene from './scenes/course/course-create'
import CourseContentCreateScene from './scenes/course/course-create/course-content-create'
import HomeworkScene from './scenes/homework'

import SettingProfileScene from './scenes/user/setting-profile'

import CourseApplyScene from './scenes/select/course-apply'

const scenes: any = {
    LoginScene,

    HomeScene,
    IndexPage,
    SelectPage,
    UserPage,

    SettingProfileScene,
    CourseScene,
    CourseHomePage,
    CourseHomeworkPage,
    CourseGradesPage,
    CourseCommunicationPage,
    CourseContentScene,
    CourseCreateScene,
    CourseContentCreateScene,
    HomeworkScene,

    CourseApplyScene
}

// regist
Object.keys(scenes).map((sceneName) => {
    Navigation.registerComponent(sceneName, () => scenes[sceneName])
})


export async function run() {
    Navigation.startSingleScreenApp({
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
            selectedTopTabIndicatorColor:'#fff',
            topTabsScrollable: false,
            topTabIconColor: '#fff',
            
            selectedTopTabIconColor: '#fff',
            statusBarColor: '#ba3d42',
            navBarBackgroundColor: '#e84e40',
            navBarTextColor: '#fff',
            navBarButtonColor: '#fff'
        }
    })
    initApp()
}


export class App {

    private static app: any = null
    constructor() {
        initApp()
    }

    static getAppInstance(): App {
        return this.app || new App()
    }

    getAppState() {
        return AppState.currentState
    }

    async getLoginUser(): Promise<Models.loginUserInfo> {
        const userArray = await AsyncStorage.multiGet(['@userId', '@username', '@role', '@stat'])
        let user: any = {}
        userArray.map((item) => {
            user[item[0].replace('@', '')] = item[1]
        })

        return user
    }

    async setLoginUser() {

    }
}

