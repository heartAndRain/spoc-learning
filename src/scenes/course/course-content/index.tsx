import * as React from 'react'
import {
    View,
    Text,
    Dimensions,
    TouchableNativeFeedback,
    StyleSheet,
    ScrollView,
    FlatList,
    StatusBar,
    Linking
} from 'react-native'
import {Navigator} from 'react-native-navigation'
import Video from 'react-native-video'

import VideoPlayer from 'react-native-video-controls';

import Icon, {IconPlus} from '../../../components/rn/Icon'
import {Client} from '../../../utils/gql-client'
import {getUrl, SourseType} from '../../../utils/getUrl'

interface PropsDefine {
    navigator?: Navigator
    itemId?: string
}
interface StateDefine {
    isFetching?: boolean
    isFailed?: boolean

    name?: string
    introduce?: string
    video?: string
    source?: Models.Source[],
    homework?: Models.Homework[]
}
export default class CourseContentScene extends React.Component<PropsDefine, StateDefine> {

    private VIDEO_HEIGHT = Dimensions.get('window').width * 9 / 16  // 16: 9
    private player: any

    static navigatorStyle = {
        navBarHidden: true
    };

    constructor(props: PropsDefine) {
        super(props)

        this.state = {
            isFetching: false,
            isFailed: false,
            name: '',
            introduce: '',
            video: '',
            source: [],
            homework: []
        }
    } 

    componentWillMount() {
        StatusBar.setBackgroundColor('#000', true)
    }
    componentDidMount() {
        this.loadData()
    }
    componentWillUnmount() {
        StatusBar.setBackgroundColor('#ba3d42', true)
    }
    getFileType = (typeNum: number): any => {
        switch(typeNum) {
            case 0:
                return 'word'
            case 1:
                return 'ppt'
            case 2:
                return 'txt'
            default:
                return 'other'
        }
    }
    loadData = async () => {
        this.setState({
            isFetching: true            
        })
        const {itemId} = this.props
        Client.getInstance().query(`
            query courseItem($itemId: String!) {
                courseItem(id: $itemId) {
                    name,
                    introduce,
                    video,
                    source {
                        type,
                        name,
                        introduce,
                        url
                    },
                    homework {
                        hwId,
                        name,
                        score,
                        type
                    }
                }
            }
        `, {
            itemId
        }).then((result: any) => {
            console.log(JSON.stringify(result))
            const {name, introduce, video, source, homework} = result.courseItem
            console.warn('homework', homework)
            this.setState({
                isFetching: false,
                name,
                introduce, 
                video,
                source,
                homework
            })
        }).catch(e => {
            this.setState({
                isFetching: false,
                isFailed: true
            })
        })
    }

    renderFileItem = (info: {item: Models.Source, index: number}) => {
        const {item, index} = info
        
        let iconName = ''
        switch(this.getFileType(item.type)) {
            case 'word': 
                iconName += 'file-word'
                break
            case 'ppt':
                iconName += 'file-powerpoint'
                break
            default:
                iconName += 'file-document'
        }
        return (
            <View style={styles.fileItem}>
                <View style={{marginRight: 16}}>
                    <IconPlus name={iconName} size={40}></IconPlus>
                </View>
                <View style={{flex: 1}}>
                    <Text style={{fontSize: 16, }}>{item.name}</Text>
                    <Text style={{fontSize: 14, color: '#999'}}>{item.introduce}</Text>
                </View>
                <TouchableNativeFeedback onPress={() => {
                        Linking.openURL(getUrl(SourseType.File, item.url))
                    }} hitSlop={{top: 30, left: 30, right: 30, bottom: 30}}>
                    <View>
                        <Icon name={'cloud-download'} size={30}></Icon>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }

    renderHomeworkItem = (info: {item: Models.Homework, index: number}) => {
        return (
            <TouchableNativeFeedback>
                <View style={styles.fileItem}>
                    <View style={{marginRight: 16}}>
                        <IconPlus name={'file-document'} size={40}></IconPlus>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 16, }}>数据结构与算法分析</Text>
                        <Text style={{fontSize: 14, color: '#999'}}>补充说明</Text>
                    </View>
                    <View>
                        <Icon name={'keyboard-arrow-right'} size={30}></Icon>
                    </View>
                </View>
                
            </TouchableNativeFeedback>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                    <View style={styles.video}>  
                        <VideoPlayer
                            ref={(player: any) => {this.player = player}}
                            source={{uri: getUrl(SourseType.Video,this.state.video), mainVer: 1, patchVer: 0}}
                            rate={1.0}
                            volume={1.0}
                            muted={false}                           // Mutes the audio entirely.
                            paused={false}                          // Pauses playback entirely.
                            resizeMode="contain"                      // Fill the whole screen at aspect ratio.*
                            repeat={false}                           // Repeat forever.
                            playInBackground={false}
                            style={[{height: this.VIDEO_HEIGHT}]}
                            onBack={() => {
                                this.props.navigator.pop()
                            }}
                        ></VideoPlayer>
                    </View>
                    <ScrollView>
                        <View style={styles.introduce}>
                            <Text style={{fontSize: 20, marginBottom: 10}}>{this.state.name}</Text>
                            <Text style={{fontSize: 16}}>{this.state.introduce}</Text>
                        </View>
                        <View style={styles.subTitle}>
                            <Text style={styles.subTitleText}>课程资料</Text>
                        </View>
                        <FlatList
                            keyExtractor={item => item.name}
                            data={this.state.source}
                            renderItem={this.renderFileItem}
                        >
                        </FlatList>
                        <View style={styles.subTitle}>
                            <Text style={styles.subTitleText}>课程作业</Text>
                        </View>
                        <FlatList
                            ListEmptyComponent={() => <View style={{height: 150, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text>老师还没有布置作业~</Text>
                                </View>}
                            keyExtractor={item => item.name}
                            data={this.state.homework}
                            renderItem={this.renderFileItem}
                        >
                        </FlatList>
                    </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    video: {
        backgroundColor: '#000',
        height: 200
    },
    introduce: {
        padding: 16,
        height: 150
    },
    subTitle: {
        padding: 20,
        backgroundColor: '#eee'
    },
    subTitleText: {
        fontSize: 16
    },
    fileItem: {
        flexDirection: 'row',
        padding: 16,
        height: 80,
        alignItems: 'center'
    }
})