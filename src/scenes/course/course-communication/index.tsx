import * as React from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native'

import Icon from '../../../components/rn/Icon'


interface PropsDefine {

}
export default class CourseCommunicationPage extends React.Component<PropsDefine, {}> {
    render() {
        return (
            <View>
                <View style={{
                    height: 50, 
                    flexDirection: 'row', 
                    justifyContent: 'space-between',
                    alignItems: 'center', 
                    backgroundColor: '#e84e40', 
                    paddingLeft: 20, 
                    paddingRight: 20
                }}>
                    <Text style={{fontSize: 16, color: '#fff'}}>发表你的想法</Text>
                    <Icon name={'add-circle'} size={20} color={'#fff'}></Icon>
                </View>
                <View></View>
            </View>
        )
    }
}