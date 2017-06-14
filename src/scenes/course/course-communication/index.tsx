import * as React from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Animated,
    TouchableNativeFeedback,
    TextInput
} from 'react-native'

import Icon from '../../../components/rn/Icon'
import MessageCard from './message-card.component'

interface PropsDefine {

}
interface StateDefine {
    editBlockHeight: Animated.Value
    isEditing?: boolean

}
export default class CourseCommunicationPage extends React.Component<PropsDefine, StateDefine> {
    private editBlocdInput: TextInput
    constructor(props: PropsDefine) {
        super(props)

        this.state = {
            editBlockHeight: new Animated.Value(50),
            isEditing: false
        }
    }
    handleOnPublish = () => {
        this.setState({
            isEditing: true
        })
        Animated.parallel([
            Animated.timing(this.state.editBlockHeight, {
                toValue: 180,
                duration: 150
            })
        ]).start()
        if (!this.editBlocdInput.isFocused()) {
            this.editBlocdInput.focus()
        }
    }
    handlePublishCancel = () => {
        this.setState({
            isEditing: false
        })
        Animated.parallel([
            Animated.timing(this.state.editBlockHeight, {
                toValue: 50,
                duration: 100
            })
        ]).start()
        if (this.editBlocdInput.isFocused()) {
            this.editBlocdInput.blur()
        }
    }
    render() {
        return (
            <View>
                <Animated.View style={{
                    height: this.state.editBlockHeight, 
                    backgroundColor: '#e84e40'
                }}>
                    <TouchableNativeFeedback onPress={this.handleOnPublish}>
                        <View style={{
                            height: 50,
                            paddingLeft: 20, 
                            paddingRight: 20
                        }}>
                            <View style={{height: 50, flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center'}}>
                                <Text style={{fontSize: 16, color: '#fff'}}>发表你的想法</Text>
                                {
                                    this.state.isEditing 
                                    && 
                                    <TouchableNativeFeedback onPress={this.handlePublishCancel}>
                                        <View style={{
                                            position: 'absolute',
                                            top: 0,
                                            bottom: 0,
                                            right: 0,
                                            width: 100,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 2,
                                            paddingTop: 3,
                                            paddingBottom: 3,
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                        }}>
                                            <Text style={{fontSize: 16, color: '#fff'}}>取消</Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                }
                                
                                <Animated.View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Icon name={'keyboard-arrow-right'} size={25} color={'#fff'}></Icon>
                                </Animated.View>
                            </View>
                            
                        </View>
                        
                    </TouchableNativeFeedback>
                    <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                        <TextInput
                                ref={(instance: any) => this.editBlocdInput = instance}
                                multiline={true}
                                placeholder={'对老师说点什么...'}
                                underlineColorAndroid={'transparent'}
                                returnKeyType={'send'}
                                returnKeyLabel={'发表'}
                                style={{height: 100, backgroundColor: '#fff', textAlignVertical: 'top', borderRadius: 2}} />
                    </View>
                </Animated.View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{padding: 20}}
                    data={[{}, {}, {}]}
                    renderItem={() => <MessageCard></MessageCard>}
                    ItemSeparatorComponent={() => <View style={{height: 20}}></View>}
                    ListFooterComponent={() => <View style={{height: 90}}></View>}
                >
                </FlatList>
            </View>
        )
    }
}