import * as React from 'react'
import {
    View,
    Text,
    ViewPagerAndroid
} from 'react-native'

export default class  SettingProfileScene extends React.Component<any, any> {
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <ViewPagerAndroid style={{flex: 1}}>
                    <View style={{flex: 1}}>
                        <Text>111</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text>222</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text>333</Text>
                    </View>
                </ViewPagerAndroid>
            </View>
        )
    }
}