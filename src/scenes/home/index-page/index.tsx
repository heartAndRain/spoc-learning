import * as React from 'react'
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    TouchableNativeFeedback,
    AsyncStorage,
    Dimensions
} from 'react-native'
import * as PubSub from 'pubsub-js'
import { Navigator } from 'react-native-navigation'
import CourseCard from './course-card.component'
import {Client} from '../../../utils/gql-client'
import { App }from '../../../app'

interface PropsDefine {
    navigator?: Navigator
}

interface StateDefine {
    isFetching?: boolean
    isFailed?: boolean
    selectedCourse?: Array<Models.Course>
    createdCourse?: Array<Models.Course>

    role?: string
}

export default class IndexPage extends React.Component<PropsDefine, StateDefine> {

    private TAB_HEADER_HEIGHT = 80
    private ADD_BTN_TOP = Dimensions.get('screen').height - this.TAB_HEADER_HEIGHT - 100

    constructor(props: PropsDefine) {
        super(props)

        this.state = {
            isFetching: true,
            isFailed: false,
            selectedCourse: []
        }

        PubSub.subscribe('HAS_LOGIN', () => {
            this.loadData()
        })

    }

    handleOnPressEnterCourse = (courseId: number, courseName: string) => {
        this.props.navigator.push({
            title: courseName,
            screen: 'CourseScene',
            passProps: {
                courseId
            },
            topTabs: [
                {
                    screenId: 'CourseHomePage',
                    title: '首页',
                    passProps: {
                        courseId
                    }
                },
                {
                    screenId: 'CourseHomeworkPage',
                    title: '作业',
                    passProps: {
                        courseId
                    }
                },
                {   screenId: 'CourseGradesPage',
                    title: '成绩',
                    passProps: {
                        courseId
                    }
                },
                {
                    screenId: 'CourseCommunicationPage',
                    title: '交流',
                    passProps: {
                        courseId
                    }
                }
            ]
        })
    }

    loadData = async () => {
        const {userId, role} = await App.getAppInstance().getLoginUser()
        this.setState({
            role
        })
        Client.getInstance().query(`
            query($id: ID!){
                user(id: $id) {
                    selectedCourse {
                        courseId,
                        name,
                        type,
                        cover,
                        teacher {
                            nickname,
                            school
                        }
                    },
                    createdCourse {
                        name,
                        type,
                        courseId,
                        cover
                    }
                }
            }
        `, {
            id: +userId
        }).then((result: any) => {
            // console.log('result', result)
            this.setState({
                isFetching: false,
                isFailed: false,
                selectedCourse: result.user.selectedCourse,
                createdCourse: result.user.createdCourse
            })
        }).catch(e => {
            console.log(e)
            this.setState({
                isFailed: true,
                isFetching: false
            })
        })
    }

    componentDidMount() {
        this.loadData()
    }

    renderListHeader = () => {
        if (this.state.role === 'tea') {
            return (
                <TouchableNativeFeedback
                    onPress={() => {
                        this.props.navigator.push({
                            screen: 'CourseCreateScene'
                        })
                    }}
                >
                    <View style={{
                        width: 320,
                        height: 50, 
                        backgroundColor: '#e84e40', 
                        marginBottom: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 2
                    }}>
                        <Text style={{color: '#fff', fontSize: 16}}>创建课程</Text>
                    </View>
                </TouchableNativeFeedback>
            )
        }
        return null
    }
    render() {
        const { selectedCourse,createdCourse,role, isFailed, isFetching } = this.state
        return (
            <FlatList
                keyExtractor={item => item.name}
                contentContainerStyle={{padding: 20}}
                showsVerticalScrollIndicator={false}
                data={this.state.role === 'stu' ? selectedCourse : createdCourse}
                renderItem={({item}: {item: Models.Course}) =>
                    {
                        return (
                            <CourseCard
                                role={role}
                                itemData={item}
                                onPressEnterCourse={() => this.handleOnPressEnterCourse(item.courseId, item.name)}>
                            </CourseCard>
                        )
                    }   
                }
                onRefresh={() => {
                    this.loadData()
                }}
                refreshing={this.state.isFetching}
                ItemSeparatorComponent={() => <View style={{height: 20}}></View>}
                ListHeaderComponent={this.renderListHeader}
                ListFooterComponent={() => {
                    if (isFailed) {
                        return (
                            <View>
                                <Text>加载失败，服务器错误</Text>
                            </View>
                        )
                    }
                    if (this.state === 'stu' && !selectedCourse.length && !this.state.isFetching) {
                        return (
                            <View style={{height: 20}}><Text>快去选课吧~</Text></View>
                        )
                    }
                    return (
                        <View style={{height: 20}}></View>
                    )
                }}
            >
            </FlatList>
        )
    }
}

const styles = StyleSheet.create({
})