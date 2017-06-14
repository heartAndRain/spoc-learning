import * as React from 'react'
import {
    Alert,
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableNativeFeedback,
    ProgressBarAndroid,
    AsyncStorage,
    ToastAndroid
} from 'react-native'
import {Navigator} from 'react-native-navigation'
import {Client} from '../../utils/gql-client'
import * as PubSub from 'pubsub-js'

interface PropsDefine {
    navigator?: Navigator
}
interface StateDefine {
    isSubmiting?: boolean
    username?: string
    password?: string
}
export default class LoginScene extends React.Component<PropsDefine, StateDefine>{
    static navigatorStyle = {
        navBarHidden: true
    }
    constructor(props: PropsDefine) {
        super(props)

        this.state = {
            isSubmiting: false,
            username: '',
            password: ''
        }
    }
    handleSubmit = async () => {
        this.setState({
            isSubmiting: true
        })
        const {username, password} = this.state
        const {success, errNum} = await Client.auth(username, password)
        this.setState({
            isSubmiting: false
        })
        if (success)  {
            ToastAndroid.showWithGravity('登录成功', 1000, ToastAndroid.CENTER)
            this.props.navigator.dismissAllModals()


            PubSub.publish('HAS_LOGIN', {
                
            })
        } else {
            switch(+errNum) {
                case 1:
                    ToastAndroid.show('密码错误', 1000)
                    break
                case 2:
                    ToastAndroid.show('用户不存在', 1000)
                    break
                default:
                    break
            }
        }
    }
    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: '#fff'}} keyboardDismissMode={'interactive'} showsVerticalScrollIndicator={false}>
                <View style={{height: 200,backgroundColor: '#e84e40', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 30, color: '#fff'}}>SPOC</Text>
                    <Text style={{fontSize: 16, color: '#fff', marginTop: 10}}>换一种方式学习</Text>
                </View>
                <ProgressBarAndroid
                    style={{marginTop: -7}}
                    color={'#e84e40'}
                    indeterminate={this.state.isSubmiting}
                    styleAttr={'Horizontal'}>
                </ProgressBarAndroid>
                <View style={{padding: 60}}>
                    <View style={{marginBottom: 50}}>
                        <TextInput
                            blurOnSubmit={true}
                            value={this.state.username}
                            style={{marginBottom: 30}}
                            
                            onChangeText={(text: string) => {
                                this.setState({
                                    username: text.trim()
                                })
                            }}
                            placeholder={'用户名'}>
                        </TextInput>
                        <TextInput
                            blurOnSubmit={true}
                            secureTextEntry={true}
                            
                            value={this.state.password}
                            onChangeText={(text: string) => {
                                this.setState({
                                    password: text.trim()
                                })
                            }}
                            placeholder={'密码'}>
                        </TextInput>
                    </View>
                    <TouchableNativeFeedback onPress={this.handleSubmit}>
                        <View style={{height: 50, borderRadius: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e84e40'}}>
                            <Text style={{color: '#fff', fontSize: 18}}>登录</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                
            </ScrollView>
        )
    }
}