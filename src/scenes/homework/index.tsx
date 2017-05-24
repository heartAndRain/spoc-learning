import * as React from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableNativeFeedback
} from 'react-native'
import {SelectionCard} from './selection-card.component'
import {AskCard} from './ask-card.component'

export default class HomeworkScene extends React.Component<any, any> {
    static navigationOptions: any = {
        title: '作业',
        headerStyle: {
            backgroundColor: '#e84e40',
            elevation: 0
        },
        headerTitleStyle: {
            color: '#fff'
        },
        headerTintColor: '#fff'
    }
    renderFooter = () => {
        return (
            <View style={{height: 150, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableNativeFeedback>
                    <View style={{height: 50, width: 100, backgroundColor: '#e84e40', borderRadius: 2, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 16, color: '#fff'}}>提交作业</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
    render() {
        return (
            <View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={[{}, {}, {}]}
                    renderItem={() => <SelectionCard></SelectionCard>}
                    ItemSeparatorComponent={() => <View style={{height: 20}}></View>}
                    ListFooterComponent={this.renderFooter}
                >
                </FlatList>
            </View>
        )
    }
}