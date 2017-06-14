import * as React from 'react'
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableNativeFeedback,
    AsyncStorage,
    ActivityIndicator
} from 'react-native'
import Avatar from '../../../components/rn/avatar'
import Icon from '../../../components/rn/Icon'
import {Navigation} from 'react-native-navigation'
import * as PubSub from 'pubsub-js'
import {Client} from '../../../utils/gql-client'

interface PropsDefine {
    navigator?: any
}
interface StateDefine {
    isFailed?: boolean
    isFetching?: boolean
    hasLoaded?: boolean
    userData?: Models.User
} 
export default class UserPage extends React.Component<PropsDefine, StateDefine> {
    constructor(props: PropsDefine) {
        super(props)

        this.state = {
            isFailed: false,
            isFetching: false,
            hasLoaded: false,
            userData: {} as Models.User
        }

        PubSub.subscribe('HAS_LOGIN', () => {
            this.loadData()
        })
    }
    componentWillMount() {
        this.loadData()
    }
    loadData = async () => {
        this.setState({
            isFetching: true
        })
        const userId = await AsyncStorage.getItem('@userId')
        Client.getInstance().query(`
            query($id: ID!) {
                user(id: $id) {
                    username,
                    nickname,
                    role,
                    stat
                }
            }
        `, {
            id: +userId
        }).then((result: any) => {
            this.setState({
                isFetching: false,
                isFailed: false,
                hasLoaded: true,
                userData: result.user
            })
        }).catch(e => {
            console.log(e)
            this.setState({
                isFailed: true,
                hasLoaded: false,
                isFetching: false
            })
        })
    }
    handleLogout = () => {
        PubSub.publish('LOGOUT', {})
    }
    getRole = (role: string) => {
        switch(role) {
            case 'stu':
                return '学生'
            case 'tea':
                return '教师'
            case 'admin':
                return '管理员'
            default:
                return '未知'
        }
    }
    render() {
        const {userData, isFetching, isFailed} = this.state 
        if (isFetching) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size={'large'} animating={true}></ActivityIndicator>
                </View>
            )
        }
        if (isFailed) {
            return (
                <View>
                    <Text>加载失败，服务器错误</Text>
                </View>
            )
        }
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.profile}>
                    <Avatar size={100} style={styles.avatar}></Avatar>
                    <Text style={styles.nickname}>{userData.nickname}</Text>
                    <Text style={styles.role}>{this.getRole(userData.role)}</Text>
                </View>
                <View style={styles.sectionCard}>
                    <Text style={styles.cardTitle}>设置</Text>
                    <TouchableNativeFeedback onPress={() => {
                           
                        }}>
                        <View style={styles.cardItem}>
                            <Text>设置资料</Text>
                            <Icon name={'keyboard-arrow-right'} size={22}></Icon>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback>
                        <View style={styles.cardItem}>
                            <Text>设置提醒</Text>
                            <Icon name={'keyboard-arrow-right'} size={22}></Icon>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={styles.sectionCard}>
                    <Text style={styles.cardTitle}>关于</Text>
                    <TouchableNativeFeedback>
                        <View style={styles.cardItem}>
                            <Text>关于SPOC</Text>
                            <Icon name={'keyboard-arrow-right'} size={22}></Icon>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback>
                        <View style={styles.cardItem}>
                            <Text>关于App</Text>
                            <Icon name={'keyboard-arrow-right'} size={22}></Icon>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={styles.sectionCard}>
                    <Text style={styles.cardTitle}>退出</Text>
                    <TouchableNativeFeedback onPress={this.handleLogout}>
                        <View style={styles.cardItem}>
                            <Text>退出</Text>
                            <Icon name={'keyboard-arrow-right'} size={22}></Icon>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={{height: 20}}></View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
    },
    profile: {
        height: 180,
        marginTop: 40,
        alignItems: 'center',
        
    },
    avatar: {
        marginBottom: 10
    },
    nickname: {
        fontSize: 18
    },
    role: {
        fontSize: 14,
        color: '#999'
    },
    sectionCard: {
        
    },
    cardTitle: {
        fontSize: 14,
        color: '#999',
        paddingLeft: 16,
        marginTop: 10,
        marginBottom: 10,
    },
    cardItem: {
        flexDirection: 'row',
        padding: 16,
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    }
})