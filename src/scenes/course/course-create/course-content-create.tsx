import * as React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Picker,
    TouchableNativeFeedback,
    ScrollView,
    Image,
    Alert,
    ToastAndroid,
    ActivityIndicator
} from 'react-native'
import {Navigation,Navigator} from 'react-native-navigation'
import FileUpload from './file-upload.component'
var ImagePicker  = require('react-native-image-picker')
import {getUrl, SourseType} from '../../../utils/getUrl'
import {Client} from '../../../utils/gql-client'



interface PropsDefine {
    navigator?: Navigator
    episodeId?: string
}
interface StateDefine {
    title?: string
    introduce?: string
    video?: string

    videoStat?: 'pending' | 'uploading' | 'uploaded'

    uploadViews?: JSX.Element[]
}
export default class CourseContentCreateScene extends React.Component<PropsDefine, StateDefine> {
    private uploadedFiles: Array<{fileType: number, fileName: string, fileIntroduce: string, filePath: string}> = []

    constructor(props: PropsDefine) {
        super(props)

        this.props.navigator.setTitle({
            title: '添加本节课程'
        })

        this.state = {
            title: '',
            introduce: '',
            video: '',
            videoStat: 'pending',
            uploadViews: []
        }
    }
    getOriginFileName = (filePath: string) => {
        const pattern = /\/([\w\._-]+\.\w+)$/
        const name = pattern.exec(filePath)

        if (!name || !name[1]) {
            return '未知文件名'
        }
        return name[1]
    }
    uploadVideo = () => {
        ImagePicker.launchImageLibrary({
                            title: '选择客户才能视频',
                            takePhotoButtonTitle: '使用照相机',
                            chooseFromLibraryButtonTitle: '从相册中选择',
                            mediaType: 'video'
                        }, (response: any) => {
                            if (response.error) {
                                console.log('ImagePicker Error: ', response.error)
                            } else if (response.didCancel) {

                            } else {
                                this.setState({
                                    videoStat: 'uploading'
                                })
                                Client.getInstance().upload([
                                    {
                                        filename: this.getOriginFileName(response.path),
                                        filepath: response.path,
                                        filetype: 'video'
                                    }
                                ]).then((fileName: any) => {
                                    console.log('upload', fileName)
                                    this.setState({
                                        video: fileName,
                                        videoStat: 'uploaded'
                                    })
                                }).catch(e => {
                                    console.log(e)
                                    this.setState({
                                        videoStat: 'pending'
                                    })
                                })
                            }

                        })
    }
    handleSubmit = () => {
        if (!this.state.title) {
            ToastAndroid.show('本节课程没有题目哦~', ToastAndroid.BOTTOM)
            return
        }
        if (!this.state.introduce) {
            ToastAndroid.show('本节课程需要一段重点介绍~', ToastAndroid.BOTTOM)
            return
        }
        if (!this.state.video) {
            ToastAndroid.show('还没上传本节课的视频~', ToastAndroid.BOTTOM)
            return
        }
        console.log('epid', this.props.episodeId)
        Client.getInstance().query(`
            mutation addItems($id: String!, $name: String!, $introduce: String!, $video: String!, $source: [SourceInput]) {
                addNewCourseItem(episodeId: $id, name: $name, introduce: $introduce, video: $video, source: $source)
            }
        `, {
            id: this.props.episodeId,
            name: this.state.title,
            introduce: this.state.introduce,
            video: this.state.video,
            source: this.uploadedFiles.map(file => {
                return {
                    type: file.fileType,
                    name: file.fileName,
                    introduce: file.fileIntroduce,
                    url: file.filePath
                }
            })
        }).then(result => {
            console.log('提交成功')
        }).catch(e => {
            console.log(e)
        })
    }
    renderUploadVideoBtn = () => {
        if (this.state.videoStat === 'pending') {
            return (
                <Text style={{fontSize: 16, color: '#fff'}}>上传课程视频</Text>
            )
        } else if (this.state.videoStat === 'uploading') {
            return (
                <ActivityIndicator size={'small'} color={'#fff'}></ActivityIndicator>
            )
        } else {
            return (
                <Text style={{fontSize: 16, color: '#fff'}}>视频已上传</Text>
            )
        }
    }
    render() {
        return (
            <ScrollView contentContainerStyle={{padding: 20}}>
                <TextInput
                    value={this.state.title}
                    onChangeText={(title) => {this.setState({title})}}
                    style={{marginBottom: 20}}
                    placeholder={'本节题目'} />
                <TextInput 
                    value={this.state.introduce}
                    onChangeText={(introduce) => {this.setState({introduce})}}
                    placeholder={'本节重点介绍'}
                    style={{marginBottom: 20, height: 100, textAlignVertical: 'top'}}
                    multiline={true}
                />
                <TouchableNativeFeedback
                    onPress={() => {
                        this.uploadVideo()
                    }}
                >
                    <View style={{height: 50, marginBottom: 20, backgroundColor: '#e84e40', borderRadius: 2, alignItems: 'center', justifyContent: 'center'}}>
                        {this.renderUploadVideoBtn()}
                    </View>
                </TouchableNativeFeedback>
                <Text style={{marginBottom: 16, fontSize: 14, color: '#000', opacity: 0.54}}>
                    课程资料上传
                </Text>
                {
                    this.state.uploadViews.map((view) => view)
                }
                <TouchableNativeFeedback
                    onPress={() => {
                        const views = this.state.uploadViews
                        const index = views.length
                        views.push(<FileUpload  onUploaded={(type, name, introduce, path) => {
                                this.uploadedFiles.push({
                                    fileType: type,
                                    fileName: name,
                                    fileIntroduce: introduce,
                                    filePath: path
                                })
                            }}></FileUpload>)
                        this.setState({
                            uploadViews: views
                        })
                    }}
                >
                    <View style={{height: 50, marginBottom: 20, backgroundColor: '#e84e40', borderRadius: 2, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 16, color: '#fff'}}>添加</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                    onPress={this.handleSubmit}
                >
                    <View style={{height: 50, marginTop: 50, backgroundColor: '#e84e40', borderRadius: 2, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 16, color: '#fff'}}>完成</Text>
                    </View>
                </TouchableNativeFeedback>
            </ScrollView>
        )
    }
}