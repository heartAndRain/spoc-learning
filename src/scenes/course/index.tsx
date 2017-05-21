import * as React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import { Tabs, Tab } from  '../../components/rn/tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Client} from '../../utils/gql-client'

import CourseHomePage from './course-home'
import CourseHomework from './course-homework'
import CourseGradesPage from './course-grades'

interface PropsDefine {
    navigation?: any
}

interface StateDefine {
    indexPageData?: any
}

export default class CourseScene extends React.Component<PropsDefine, StateDefine> {
    static navigationOptions: any = {
        title: '数据结构与算法分析',
        headerStyle: {
            backgroundColor: '#e84e40',
            elevation: 0
        },
        headerTitleStyle: {
            color: '#fff'
        },
        headerTintColor: '#fff'
    }
    constructor() {
        super()

        this.state = {
            indexPageData: {
                courseId: 0,
                type: 0,
                name: '',
                episodes: []
            }
        }
    }
    componentDidMount() {
        const {courseId} = this.props.navigation.state.params
        Client.query(`
                query CourseDetail($courseId: ID!) {
                    course(id: $courseId) {
                        courseId,
                        name,
                        type,
                        episodes {
                            type,
                            name,
                            itemList {
                                itemId,
                                name
                            }
                        }
                    }
                }
        `, {
            courseId
        }).then((result: any) => {
            this.setState({
                indexPageData: result.course
            })
        }).catch(e => console.warn(e))
    }
    render() {
        return (
            <View style={styles.container}>
                <Tabs headerStyle={{backgroundColor: '#e84e40'}} itemTextStyle={{color: '#fff', fontWeight: 'bold'}}>
                        <Tab name="课程首页" icon={<Icon name={'home'} size={25} color={'#fff'}></Icon>}>
                            <View>
                                <CourseHomePage pageData={this.state.indexPageData}></CourseHomePage>
                            </View>
                        </Tab>
                        <Tab name="作业" icon={<Icon name={'library-books'} size={25} color={'#fff'}></Icon>}>
                            <View>
                                <CourseHomework courseName={'数据结构与算法分析'}></CourseHomework>
                            </View>
                        </Tab>
                        <Tab name="成绩" icon={<Icon name={'search'} size={25} color={'#fff'}></Icon>}>
                            <View>
                                <CourseGradesPage></CourseGradesPage>
                            </View>
                        </Tab>
                        <Tab name="交流" icon={<Icon name={'person'} size={25} color={'#fff'}></Icon>}>
                            <View>
                                <Text>个人</Text>
                            </View>
                        </Tab>
                    </Tabs>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    }
})