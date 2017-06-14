import * as React from 'react'
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableNativeFeedback,
    FlatList,
    ActivityIndicator
} from 'react-native'
import {Navigator} from 'react-native'
import Icon from '../../../components/rn/Icon'
import Loading from '../../../components/rn/loading'
import CourseCard from './course-card.component'
import {Client} from '../../../utils/gql-client'
import {App} from '../../../app'

interface PropsDefine {
    courseId: number
    navigator?: Navigator
}
interface StateDefine {
    isFetching?: boolean
    isFailed?: boolean
    hasManageAuthority?: boolean
    pageData?: {
        /**
         * 0 是周类型，1 是章类型
         */
        type: number,
        name: string,
        teacher: number
        episodes: Array<Models.Episode>
    }
}

export default class CourseHomePage extends React.Component<PropsDefine, StateDefine> {
    constructor(props: PropsDefine) {
        super(props)

        this.state = {
            isFetching: false,
            isFailed: false,
            hasManageAuthority: false,
            pageData: {
                type: 0,
                name: '',
                teacher: 0,
                episodes: []
            }
        }
    }
    componentDidMount() {
        this.loadData()
    }

    loadData = async () => {
        const {userId, role} = await App.getAppInstance().getLoginUser()
        this.setState({
            isFetching: true            
        })
        const {courseId} = this.props
        Client.getInstance().query(`
                query CourseDetail($courseId: ID!) {
                    course(id: $courseId) {
                        courseId,
                        name,
                        type,
                        teacher {
                            userId
                        },
                        episodes {
                            episodeId,
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
                pageData: result.course,
                isFetching: false,
                hasManageAuthority: Boolean(result.course && result.course.teacher.userId === +userId)
            })
        }).catch(e => {
            this.setState({
                isFetching: false,
                isFailed: true
            })
        })
    }
    handleNewEpisode = () => {
        const courseType = this.state.pageData.type
        Client.getInstance().query(`
            mutation addNewEp($id: Int!, $type: Int!, $name: String) {
                addNewEpisodes(courseId: $id, type: $type, name: $name)
            }
        `, {
            id: this.props.courseId,
            type: courseType,
            name: ''
        }).then(result => {
            this.loadData()
        }).catch(e => {
            console.log(e)
        })
    }
    renderItem = ({item, index}: {item: Models.Episode, index: number}) => {
        const {type, name} = this.state.pageData
        return (
            <CourseCard
                key={index}
                type={type === 0 ? 'week' : 'content'}
                weekNum={index + 1}
                contentTitle={name}
                hasManageAuthority={this.state.hasManageAuthority}
                data={item.itemList}
                onItemPress={(id: string) => {
                    this.props.navigator.push({
                        screen: 'CourseContentScene',
                        passProps: {
                            itemId: id
                        }
                    })
                }}
                onAddItem={() => {
                    this.props.navigator.push({
                        screen: 'CourseContentCreateScene',
                        passProps: {
                            episodeId: item.episodeId
                        }
                    })
                }}
            ></CourseCard>
        )
    }
    render() {
        const {isFailed, isFetching, pageData} = this.state
        if (isFetching) {
            return (
                <Loading size="large"></Loading>
            )
        }
        if (isFailed) {
            return (
                <View>
                    <Text>加载失败，服务器错误</Text>
                </View>
            )
        }
        const {name, episodes} = pageData || {} as any
        return (
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.courseName}>
                    <Text style={styles.courseNameText}>{name}</Text>
                </View>
                <View style={{flexDirection: 'row', height: 55, marginTop: 20}}>
                    <TouchableNativeFeedback
                        onPress={() => {
                            this.props.navigator.push({
                                screen: 'CourseApplyScene'
                            })
                        }}
                    >
                        <View style={[styles.infoBtn, {backgroundColor: '#e84e40'}]}>
                            <Text style={[styles.infoBtnText, {color: '#fff'}]}>申请该课</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={{marginTop: 20, marginBottom: 20, borderRadius: 2}}>
                     
                    <View style={{flexDirection: 'row', height: 55}}>
                        <TouchableNativeFeedback>
                            <View style={styles.infoBtn}>
                                <Icon name={'info-outline'} size={20}></Icon>
                                <Text style={styles.infoBtnText}>课程介绍</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback>
                            <View style={styles.infoBtn}>
                                <Icon name={'access-time'} size={20}></Icon>
                                <Text style={styles.infoBtnText}>设置提醒</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>

                    {
                        this.state.hasManageAuthority &&
                        <View style={{flexDirection: 'row', height: 55}}>
                            <TouchableNativeFeedback
                                onPress={this.handleNewEpisode}
                            >
                                <View style={styles.infoBtn}>
                                    <Icon name={'add'} size={20}></Icon>
                                    <Text style={styles.infoBtnText}>添加一周课程</Text>
                                </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback>
                                <View style={styles.infoBtn}>
                                    <Icon name={'close'} size={20}></Icon>
                                    <Text style={styles.infoBtnText}>关闭该课程</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    }
                </View>
                <FlatList
                    keyExtractor={item => item.episodeId}
                    data={episodes}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={() => <View style={{height: 20}}></View>}
                    ListFooterComponent={() => {
                        if (!episodes || !episodes.length) {
                            return (
                                <View style={{height: 100, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text>暂无课程内容，耐心等待老师上传哦~</Text>
                                </View>
                            )
                        }
                        return (
                            <View style={{height: 20}}></View>
                        )
                    }}
                >
                </FlatList>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    courseName: {
        height: 45,
        justifyContent: 'center'
    },
    courseNameText: {
        fontSize: 18
    },
    infoBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    infoBtnText: {
        fontSize: 16,
        marginLeft: 5
    }
})