import * as React from 'react'
import {
    View,
    Text,
    FlatList,
    ScrollView,
    TextInput,
    TouchableNativeFeedback,
    StyleSheet
} from 'react-native'
import {Navigator} from 'react-native-navigation'
import Icon from '../../components/rn/Icon'

interface PropsDefine {

    navigator?: Navigator
}
export default class CourseApplyScene extends React.Component<PropsDefine, {}> {
    constructor(props: PropsDefine) {
        super(props)

        this.props.navigator.setTitle({
            title: '申请该课'
        })
    }
    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <TextInput placeholder={'申请理由'} style={{height: 200, textAlignVertical: 'top', marginBottom: 20}}></TextInput>
                <TouchableNativeFeedback>
                    <View style={{height: 50, backgroundColor: '#e84e40', borderRadius: 2, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 14, color: '#fff'}}>提交</Text>
                    </View>
                </TouchableNativeFeedback>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})