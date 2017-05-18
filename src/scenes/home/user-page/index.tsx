import * as React from 'react'
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableNativeFeedback
} from 'react-native'
import Avatar from '../../../components/rn/avatar'
import Icon from '../../../components/rn/Icon'

interface PropsDefine {

}
export default class UserPage extends React.Component<PropsDefine, any> {
    render() {
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.profile}>
                    <Avatar size={100} style={styles.avatar}></Avatar>
                    <Text style={styles.nickname}>李鑫宇</Text>
                    <Text style={styles.role}>学生</Text>
                </View>
                <View style={styles.sectionCard}>
                    <Text style={styles.cardTitle}>设置</Text>
                    <TouchableNativeFeedback>
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
                    <TouchableNativeFeedback>
                        <View style={styles.cardItem}>
                            <Text>退出</Text>
                            <Icon name={'keyboard-arrow-right'} size={22}></Icon>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 50
    },
    profile: {
        height: 180,
        marginTop: 60,
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