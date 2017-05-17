import * as React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import { Tabs, Tab } from  '../../components/rn/tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'

import CourseHomePage from './course-home'
import CourseHomework from './course-homework'
import CourseGradesPage from './course-grades'



export default class CourseScene extends React.Component<{}, {}> {
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
    render() {
        console.warn('scene', (this.props as any).tabIndex)
        return (
            <View style={styles.container}>
                <Tabs headerStyle={{backgroundColor: '#e84e40'}} itemTextStyle={{color: '#fff', fontWeight: 'bold'}}>
                        <Tab name="课程首页" icon={<Icon name={'home'} size={25} color={'#fff'}></Icon>}>
                            <View>
                                <CourseHomePage courseName={'数据结构与算法分析'}></CourseHomePage>
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