import * as React from 'react'
import {
    View,
    Text
} from 'react-native'

interface PropsDefine {

}
export default class CourseScene extends React.Component<PropsDefine, {}> {
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Text>coursepage</Text>
            </View>
        )
    }
}