import * as React from 'react'
import {
    View,
    Text
} from 'react-native'
import Avatar from '../../../components/rn/avatar'

interface PropsDefine {

}
export default class MessageCard extends React.Component<PropsDefine, any> {
    render() {
        return (
            <View style={{padding: 16, backgroundColor: '#fff', borderRadius: 2, elevation: 8}}>
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                    <Avatar size={20} style={{marginRight: 10}}></Avatar>
                    <Text>李鑫宇</Text>
                </View>
                <Text style={{fontSize: 16, marginBottom: 10}}>
                    这门课真是太赞了
                </Text>
                <Text style={{color: '#999', fontSize: 14, marginBottom: 10}}>教师回复</Text>
                <Text style={{fontSize: 16}}>谢谢谢</Text>
            </View>
        )
    }
}