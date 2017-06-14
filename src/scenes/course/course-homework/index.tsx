import * as React from 'react'
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableNativeFeedback,
    SectionList,
    SectionListData,
    ActivityIndicator
} from 'react-native'
import {Navigator} from 'react-native-navigation'
import Loading from '../../../components/rn/loading'
import Icon from '../../../components/rn/Icon'
import {Client} from '../../../utils/gql-client'
import HomeworkCard from './homework-card.component'

interface PropsDefine {
    navigator?: Navigator
    courseName?: string
}
interface StateDefine {
    isFailed?: boolean
    isFetching?: boolean
    hasLoaded?: boolean

    courseName?: string
    homeworkList?: {key: string, data: Models.Course[]}[]
}
export default class CourseHomeworkPage extends React.Component<PropsDefine, StateDefine> {
    constructor(props: PropsDefine) {
        super(props)

        this.state = {
            isFailed: false,
            isFetching: false,
            hasLoaded: false,
            courseName: '',
            homeworkList: []
        }

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
    loadData = () => {
        this.setState({
            isFetching: true
        })
        Client.getInstance().query(`
            {
                course(id: 3002) {
                    name,
                    episodes {
                        type,
                        name,
                        itemList {
                            name,
                            homework {
                                hwId,
                                name,
                                score,
                                pass,
                                deadline,
                                type
                            }
                        }
                    }
                }
            }
        `).then((result: any) => {
            console.log(this.sectionListAdaptor(result.course))
            this.setState({
                isFetching: false,
                hasLoaded: true,
                courseName: result.course.name,
                homeworkList: this.sectionListAdaptor(result.course)
            })
        }).catch(e => {
            console.warn(e)
            this.setState({
                isFailed: true,
                hasLoaded: false,
                isFetching: false
            })
        })
    }

    handleEnterHomework = (hwId: string) => {
        this.props.navigator.push({
            screen: 'HomeworkScene'
        })
    }
    sectionListAdaptor(course: Models.Course): {key: string, data: Models.Course[]}[] {
        return course.episodes.map((epi, index) => {
            return {
                key: epi.type === 0 ? `第${index + 1}周` : epi.name,
                data: epi.itemList.reduce((previous, current) => {
                    return previous.concat(current.homework)
                }, [])
            }
        })
    }
    onNavigatorEvent(event: any) {
        if (event.id === 'tabSelected') {
            if (!this.state.hasLoaded && !this.state.isFetching) {
                this.loadData()
            }
        }
    }
    renderSectionHeader = ({section}: {section: SectionListData<any>}) => {
        if (section.data.length) {
            return (
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>{section.key}</Text>
                </View>
            )
        }
        return null
    }
    render() {
        const {isFailed, isFetching} = this.state
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
        if (this.state.homeworkList.reduce((previous, current) => {
            return previous.concat(current.data)
        }, []).length === 0) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>等待老师布置作业~</Text>
                </View>
            )
        }
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.courseName}>
                    <Text style={styles.courseNameText}>{this.state.courseName}</Text>
                </View>
                <SectionList
                    keyExtractor={item => item.hwId}
                    renderSectionHeader={this.renderSectionHeader}
                    renderItem={({item}: {item: Models.Homework}) => 
                        <HomeworkCard
                            homework={item}
                            onEnterHomework={this.handleEnterHomework}
                        />}
                    sections={this.state.homeworkList}
                    ItemSeparatorComponent={() => <View style={{height: 20}}></View>}
                    ListHeaderComponent={() => <View style={{height: 20}}></View>}
                    ListFooterComponent={() => <View style={{height: 20}}></View>}
                >
                </SectionList>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20
    },
    courseName: {
        height: 45,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center'
    },
    courseNameText: {
        fontSize: 18
    },
    sectionHeader: {
        alignItems: 'center',
        height: 20
    },
    sectionHeaderText: {
        fontSize: 12,
        color: '#999'
    }
})