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
    ToastAndroid
} from 'react-native'
import {Navigation,Navigator} from 'react-native-navigation'
var ImagePicker  = require('react-native-image-picker')
import {getUrl, SourseType} from '../../../utils/getUrl'
import {Client} from '../../../utils/gql-client'

interface PropsDefine {
    navigator?: Navigator
}
interface StateDefine {
    name?: string
    cover?: string
    category?: number
    type?: number
    introduce?: string

    categoryList?: Array<Models.Category>
}
export default class CourseCreateScene extends React.Component<PropsDefine, StateDefine> {
    constructor(props: PropsDefine) {
        super(props)

        this.props.navigator.setTitle({
            title: '创建课程'
        })

        this.state = {
            name: '',
            cover: '',
            type: -1,
            categoryList: []
        }
    }
    componentDidMount() {
        Client.getInstance().query(`
                {
                    categoryList {
                        categoryId,
                        name
                    }
                }
        `).then((result: any) => {
            this.setState({
                categoryList: result.categoryList
            })
        }).catch(e => {
            console.log(e)
        })
    }

    checkForm = () => {
        console.log('category', this.state.category)
        console.log('type', this.state.type)
        if (!this.state.cover) {
            ToastAndroid.show('请上传课程封面图', ToastAndroid.CENTER)
            return false
        }
        if (!this.state.name) {
            ToastAndroid.show('请填写课程名称', ToastAndroid.CENTER)
            return false
        }
        if (this.state.category === -1) {
            ToastAndroid.show('请选择课程所属学科类型', ToastAndroid.CENTER)
            return false
        }
        if (!this.state.introduce) {
            ToastAndroid.show('请填写课程介绍', ToastAndroid.CENTER)
            return false
        }
        if (this.state.type === -1) {
            ToastAndroid.show('请选择上课类型', ToastAndroid.CENTER)
            return false
        }
        return true
    }

    handleSubmit = () => {
        // this.props.navigator.showSnackbar({
        //     text: '未添加封面图',
        //     backgroundColor: '#e84e40',
        //     textColor: '#fff',
        //     duration: 'long'
        // })
        // Alert.alert('test', '确认提交么', [
        //     {
        //         text: '取消'
        //     },
        //     {
        //         text: '确认'
        //     }
        // ])
        if (this.checkForm()) {
            Client.getInstance().query(`
                mutation addNewCourse($name: String!, $cover: String!, $type: Int!, $category: Int!, $introduce: String) {
                    addNewCourse(name: $name, cover: $cover, type: $type, category: $category, introduce: $introduce)
                }
            `, {
                name: this.state.name,
                cover: this.state.cover,
                category: +this.state.category,
                type: +this.state.type,
                introduce: this.state.introduce
            }).then((result) => {
                if (result.addNewCourse) {
                    ToastAndroid.show('课程开设成功', ToastAndroid.SHORT)
                    this.props.navigator.pop()
                }
            }).catch(e => console.log(e))
        }
    }
    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding: 20}}>
                <View style={{ height: 200, alignItems: 'center', marginBottom: 20}}>
                    <Image style={{backfaceVisibility: 'visible', width: 200, height: 200, backgroundColor: '#fff'}} source={{uri: getUrl(SourseType.Image, this.state.cover)}}></Image>
                </View>
                <TouchableNativeFeedback onPress={() => {
                        ImagePicker.showImagePicker({
                            title: '选择封面图',
                            takePhotoButtonTitle: '使用照相机',
                            chooseFromLibraryButtonTitle: '从相册中选择'
                        }, (response: any) => {
                            if (response.error) {
                                console.log('ImagePicker Error: ', response.error)
                            } else if (response.didCancel) {

                            } else {
                                Client.getInstance().upload([
                                    {
                                        filename: response.fileName,
                                        filepath: response.path,
                                        filetype: 'image'
                                    }
                                ]).then((fileName: any) => {
                                    console.log(fileName)
                                    this.setState({
                                        cover: fileName
                                    })
                                }).catch(e => console.log(e))
                            }

                        })
                    }}>
                    <View style={{height: 50, backgroundColor: '#e84e40', alignItems: 'center', justifyContent: 'center', borderRadius: 2, marginBottom: 20}}>
                        <Text style={{color: '#fff', fontSize: 16}}>上传课程封面图</Text>
                    </View>
                </TouchableNativeFeedback>
                <TextInput
                    value={this.state.name}
                    onChangeText={(name) => {this.setState({name})}}
                    placeholder={"课程名称"}
                    style={{height: 50, marginBottom: 20, fontSize: 18}}
                />
                <Picker
                    style={{marginBottom: 20}}
                    selectedValue={this.state.category}
                    onValueChange={(category) => {this.setState({category})}}>
                    <Picker.Item label={'请选择学科分类'} value={-1} />
                    {
                        this.state.categoryList.map(item => 
                            <Picker.Item label={item.name} value={item.categoryId} />)
                    }
                </Picker>
                <TextInput
                    value={this.state.introduce}
                    onChangeText={(introduce) => {this.setState({introduce})}}
                    style={{height: 100, textAlignVertical: 'top', marginBottom: 20}}
                    placeholder={"课程简介"}
                    multiline={true}
                />
                <Picker
                    style={{marginBottom: 50}}
                    selectedValue={this.state.type}
                    onValueChange={(type) => {this.setState({type})}}>
                    <Picker.Item label="请选择课程类型" value={-1} />
                    <Picker.Item label="按周" value={0} />
                    <Picker.Item label="按章" value={1} />
                </Picker>
                <TouchableNativeFeedback onPress={this.handleSubmit}>
                    <View style={{height: 50, backgroundColor: '#e84e40', alignItems: 'center', justifyContent: 'center', borderRadius: 2}}>
                        <Text style={{color: '#fff', fontSize: 16}}>创建</Text>
                    </View>
                </TouchableNativeFeedback>
            </ScrollView>
        )
    }
}