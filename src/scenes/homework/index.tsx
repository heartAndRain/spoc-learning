import * as React from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableNativeFeedback
} from 'react-native'
import {SelectionCard} from './selection-card.component'
import {AskCard} from './ask-card.component'
import {Client} from '../../utils/gql-client'

interface PropsDefine {

}
interface StateDefine {
    isFetching?: boolean,
    isFailed?: boolean
}
export default class HomeworkScene extends React.Component<PropsDefine, StateDefine> {
    constructor(props: PropsDefine) {
        super(props)

        this.state = {
            isFetching: false,
            isFailed: false
        }
    }
    loadData = () => {
        this.setState({
            isFetching: true
        })
        Client.getInstance().query(`
            {
                course(id: 3001) {
                    name,
                    episodes {
                        type,
                        name,
                        itemList {
                            name,
                            homework {
                                hwId,
                                name,
                                score,
                                pass,
                                deadline,
                                type
                            }
                        }
                    }
                }
            }
        `).then((result: any) => {
            this.setState({
                isFetching: false,
            })
        }).catch(e => {
            console.log(e)
            this.setState({
                isFailed: true,
                isFetching: false
            })
        })
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