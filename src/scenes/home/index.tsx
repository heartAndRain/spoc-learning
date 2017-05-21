import * as React from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Dimensions,
    TouchableNativeFeedback,
    ActivityIndicator
} from 'react-native'
import { Tabs, Tab } from  '../../components/rn/tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Client} from '../../utils/gql-client'

import IndexPage from './index-page'
import SelectPage from './select-page'
import UserPage from './user-page'

interface StateDefine {
    /** 首页已选课数据 */
    selectedCourse?: Array<any>

    /** 学科数据  */
    categoryList?: Array<any>

    /** 用户中心数据 */
    userData?: any
}

export default class HomeScene extends React.Component<any, StateDefine> {

    private TAB_HEADER_HEIGHT = 45
    private SEARCH_BTN_TOP = Dimensions.get('screen').height - this.TAB_HEADER_HEIGHT - 100

    static navigationOptions: any = {
        header: null
    }
    static childContextTypes = {
        navigation: React.PropTypes.object
    }

    constructor() {
        super()

        this.state = {
            selectedCourse: [],
            categoryList: [],
            userData: {}
        }
    }

    getChildContext() {
        return {
            navigation: this.props.navigation
        }
    }

    componentWillMount() {
        StatusBar.setBackgroundColor('#ba3d42', true)

    }
    componentDidMount() {
        Client.query(`
            {
                user(id: 1018) {
                    selectedCourse {
                        courseId,
                        name,
                        type,
                        cover,
                        teacher {
                            nickname,
                            school
                        }
                    }
                }
                categoryList {
                    categoryId,
                    name,
                    cover
                }
            }
        `).then((result: any) => {
            this.setState({
                selectedCourse: result.user.selectedCourse,
                categoryList: result.categoryList
            })
        }).catch(e => {
            console.warn(e)
        })
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Tabs headerStyle={{backgroundColor: '#e84e40'}} itemStyle={'icon'}>
                    <Tab name="首页" icon={<Icon name={'home'} size={25} color={'#fff'}></Icon>}>
                        <View>
                            <IndexPage selectedCourse={this.state.selectedCourse}></IndexPage>
                        </View>
                    </Tab>
                    <Tab name="选课" icon={<Icon name={'library-books'} size={25} color={'#fff'}></Icon>}>
                        <View>
                            <SelectPage categoryList={this.state.categoryList}></SelectPage>
                        </View>
                    </Tab>

                    <Tab name="个人" icon={<Icon name={'person'} size={25} color={'#fff'}></Icon>}>
                        <View>
                            <UserPage></UserPage>
                        </View>
                    </Tab>
                </Tabs>
                <View style={[styles.searchBtn, {top: this.SEARCH_BTN_TOP}]}>
                    <TouchableNativeFeedback>
                            <Icon name={'search'} color={'#fff'} size={20}></Icon>
                    </TouchableNativeFeedback>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    searchBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 54,
        height: 54,
        position: 'absolute',
        right: 20,
        top: 100,
        borderRadius: 28,
        elevation: 5,
        backgroundColor: '#e84e40'
    }
})