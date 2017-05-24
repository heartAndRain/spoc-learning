import * as React from 'react'
import {
    View,
    Text,
    TouchableNativeFeedback
} from 'react-native'

interface PropsDefine {

}
interface StateDefine {
    currentSelectIndex: number
}
export class SelectionCard extends React.Component<PropsDefine, StateDefine> {

    data: any = [
        {}, {}, {}, {}
    ]
    constructor() {
        super()
        this.state = {
            currentSelectIndex: -1
        }
    }
    handleOnSelect = (index: number) => {
        this.setState({
            currentSelectIndex: index
        })
    }
    render() {
        return (
            <View style={{backgroundColor: '#fff'}}>
                <View style={{padding: 16}}>
                    <Text style={{fontSize: 16}}>
                        若有18个元素的有序表存放在一维数组A[19]中，第一个元素放A[1]中，现进行二
分查找，则查找A［3］的比较序列的下标依次为
                    </Text>
                </View>
                <View>
                    {
                        this.data.map((item: any, index: number) => {
                            const viewStyle: any = [{height: 50, justifyContent: 'center', paddingLeft: 16}]
                            const textStyle: any = [{fontSize: 14}]
                            if (this.state.currentSelectIndex === index) {
                                viewStyle.push({backgroundColor: '#999'})
                                textStyle.push({color: '#fff'})
                            }
                            return (
                                <TouchableNativeFeedback onPress={() => this.handleOnSelect(index)}>
                                    <View style={viewStyle}>
                                        <Text style={textStyle}>1,2,3</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}