import * as React from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableNativeFeedback,
    StyleSheet
} from 'react-native'
import Icon from '../../components/rn/Icon'

interface PropsDefine {

    navigation?: any
}
export default class SelectScene extends React.Component<PropsDefine, {}> {

    static navigationOptions: any = {
        title: '哲学',
        headerStyle: {
            backgroundColor: '#e84e40',
            elevation: 0
        },
        headerTitleStyle: {
            color: '#fff'
        },
        headerTintColor: '#fff'
    }

    handleItemEnter = () => {
        this.props.navigation.navigate('CourseScene')
    }

    renderItem = (info: {item: any, index: number}) => {
        return (
            <TouchableNativeFeedback onPress={this.handleItemEnter}>
                <View style={styles.item}>
                    <View style={{flex: 1}}>
                        <Text style={[styles.itemPrimaryText]}>数据结构与算法分析</Text>
                        <Text style={[styles.itemPrimaryText, {fontSize: 14}]}>武汉理工大学 胡燕</Text>
                        <Text numberOfLines={1} style={[styles.itemSecondaryText]}>数据结构与算法课程是大学计算机专业教学的核心课程,也是其他理工类专业的主要选修课程之一</Text>
                    </View>
                    <View style={{paddingLeft: 16, paddingRight: 16, justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 12, color: '#999'}}>12周</Text>
                        <Icon name={'star-border'} size={22} color={'#999'}></Icon>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
    renderSeperator() {
        return (
            <View style={{height: 1, backgroundColor: '#eee'}}></View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={[{}, {}, {}, {}, {}, {}, {}, {}]}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={this.renderSeperator}
                >
                </FlatList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    item: {
        paddingLeft: 16,
        paddingTop: 16,
        paddingBottom: 16,
        flexDirection: 'row'
    },
    itemPrimaryText: {
        fontSize: 16
    },
    itemSecondaryText: {
        fontSize: 14,
        opacity: 0.54
    },
    itemDescription: {

    }
})