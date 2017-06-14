import * as React from 'react'
import {
    View,
    Text,
    TouchableNativeFeedback,
    Picker,
    TextInput,
    ActivityIndicator,
    ToastAndroid
} from 'react-native'
const FilePickerManager = require('NativeModules').FilePickerManager
import {Client} from '../../../utils/gql-client'

declare type selectStat = 'pending' | 'selecting' | 'selected'
declare type uploadState = 'pending' | 'uploading' | 'uploaded'
interface PropsDefine {

    onUploaded: (type: number, name: string, introduce: string, path: string) => void
    onCancel?: () => void
}
interface StateDefine {
    fileName: string
    filePath: string
    fileType: number
    fileIntroduce: string
    originFileName: string

    selectStat: selectStat
    uploadStat: uploadState
}
export default class FileUpload extends React.Component<PropsDefine, StateDefine> {
    constructor(props: PropsDefine) {
        super(props)

        this.state = {
            fileName: '',
            filePath: '',
            fileType: -1,
            fileIntroduce: '',
            originFileName: '',
            selectStat: 'pending',
            uploadStat: 'pending'
        }
    }
    doUpload = () => {
        if (this.state.fileName === '') {
            ToastAndroid.show('请输入文件名称', ToastAndroid.CENTER)
            return
        }
        if (this.state.fileType === -1) {
            ToastAndroid.show('请选择文件类型', ToastAndroid.CENTER)
            return 
        }
        this.setState({
            uploadStat: 'uploading'
        })

        Client.getInstance().upload([
            {
                filename: this.state.originFileName,
                filepath: this.state.filePath,
                filetype: this.getFileType(this.state.fileType)
            }
        ]).then((resultName: string) => {
            this.setState({
                uploadStat: 'uploaded'
            })
            this.props.onUploaded && this.props.onUploaded(this.state.fileType, this.state.fileName, this.state.fileIntroduce, resultName)

        }).catch(e => {
            console.log('上传失败', e)
            this.setState({
                uploadStat: 'pending'
            })
        })
    }
    getOriginFileName = (filePath: string) => {
        const pattern = /\/([\w\._-]+\.\w+)$/
        const name = pattern.exec(filePath)

        console.log(filePath)
        if (!name || !name[1]) {
            return '未知文件名'
        }
        return name[1]
    }
    getFileType = (typeNum: number) => {
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
    renderSelectBtn = () => {
        if (this.state.selectStat === 'pending') {
            return (
                <Text style={{fontSize: 14}}>选择文件</Text>
            )
        } else if (this.state.selectStat === 'selecting') {
            return (
                <ActivityIndicator size={'small'}></ActivityIndicator>
            )
        } else {
            return (
                <Text style={{fontSize: 14}}>{`已选择 ${this.state.originFileName}`}</Text>
            )
        }
    }
    renderUploadBtn = () => {
        if (this.state.uploadStat === 'pending') {
            return (
                <Text style={{fontSize: 16}}>上传</Text>
            )
        } else if(this.state.uploadStat === 'uploading') {
            return (
                <ActivityIndicator size={'small'}></ActivityIndicator>
            )
        } else {
            return (
                <Text style={{fontSize: 16}}>已上传</Text>
            )
        }
    }
    render() {
        return (
            <View style={{marginBottom: 20}}>
                <TextInput 
                    value={this.state.fileName}
                    onChangeText={(text) => {
                        this.setState({
                            fileName: text
                        })
                    }}
                    style={{marginBottom: 10}}
                    placeholder={'资料名称'}></TextInput>
                <TextInput 
                    value={this.state.fileIntroduce}
                    onChangeText={(text) => {
                        this.setState({
                            fileIntroduce: text
                        })
                    }}
                    style={{marginBottom: 10}}
                    placeholder={'资料描述'}></TextInput>
                <Picker
                    style={{marginBottom: 10}}
                    selectedValue={this.state.fileType}
                    onValueChange={(fileType) => {
                        this.setState({
                            fileType
                        })
                    }}>
                    <Picker.Item label={'请选择文件类型'} value={-1} />
                    <Picker.Item label={'word'} value={0} />
                    <Picker.Item label={'ppt'} value={1} />
                    <Picker.Item label={'文本'} value={2} />
                    <Picker.Item label={'其它'} value={3} />
                </Picker>
                <TouchableNativeFeedback
                    disabled={this.state.selectStat === 'selecting' || this.state.uploadStat !== 'pending'}
                    onPress={() => {
                        this.setState({
                            selectStat: 'selecting'
                        })
                        FilePickerManager.showFilePicker(null, (response: any) => {
                            
                            if (response.didCancel) {
                                this.setState({
                                    selectStat: 'pending'
                                })
                            } else if (response.error) {
                                this.setState({
                                    selectStat: 'pending'
                                })
                            } else {
                                this.setState({
                                    selectStat: 'selected',
                                    originFileName: this.getOriginFileName(response.path),
                                    filePath: response.path
                                })
                            }
                        })
                    }}
                >
                    <View style={{marginBottom: 10, height: 50, backgroundColor: '#fff', borderRadius: 2, alignItems: 'center', justifyContent: 'center'}}>
                        {
                            this.renderSelectBtn()
                        }
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                    disabled={this.state.selectStat !== 'selected'}
                    onPress={() => {
                        this.doUpload()
                    }}
                >
                    <View style={{height: 50, backgroundColor: '#fff', borderRadius: 2, alignItems: 'center', justifyContent: 'center'}}>
                        {
                            this.renderUploadBtn()
                        }
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}