import * as React from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableNativeFeedback
} from 'react-native'

interface PropsDefine {

}
interface StateDefine {
    
}
export class AskCard extends React.Component<PropsDefine, StateDefine> {
    render() {
        return (
            <View style={{backgroundColor: '#fff', padding: 16}}>
                <View>
                    <Text style={{fontSize: 16}}>设计在单链表中删除值相同的多余结点的算法。</Text>
                </View>
                <TextInput
                    underlineColorAndroid={'#e84e40'}
                    multiline={true}
                    style={{height: 200, fontSize: 16}}
                ></TextInput>
            </View>
        )
    }
}