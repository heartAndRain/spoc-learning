import * as React from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableNativeFeedback,
    TouchableOpacity,
    Image,
    Dimensions,
    StyleSheet
} from 'react-native'

import Icon from '../../../components/rn/Icon'

interface PropsDefine {

}
export default class SelectPage extends React.Component<PropsDefine, any> { 

    static contextTypes = {
        navigation: React.PropTypes.object
    }

    private ITEM_HEIGHT = Dimensions.get('window').width * 9 / 16   // 16: 9

    data: any[] = [
        {
            name: '哲学',
            cover: 'http://oq39rralr.bkt.clouddn.com/image/zhexue.jpeg'
        },
        {
            name: '经济学',
            cover: 'http://oq39rralr.bkt.clouddn.com/image/zhexue.jpeg'
        },
        {
            name: '法学',
            cover: 'http://oq39rralr.bkt.clouddn.com/image/zhexue.jpeg'
        },
        {
            name: '教育学',
            cover: 'http://oq39rralr.bkt.clouddn.com/image/zhexue.jpeg'
        },
        {
            name: '文学',
            cover: 'http://oq39rralr.bkt.clouddn.com/image/zhexue.jpeg'
        },
        {
            name: '历史学',
            cover: 'http://oq39rralr.bkt.clouddn.com/image/zhexue.jpeg'
        },
        {
            name: '理学',
            cover: 'http://oq39rralr.bkt.clouddn.com/image/zhexue.jpeg'
        },
        {
            name: '工学',
            cover: 'http://oq39rralr.bkt.clouddn.com/image/zhexue.jpeg'
        },
        {
            name: '农学',
            cover: 'http://oq39rralr.bkt.clouddn.com/image/zhexue.jpeg'
        },
        {
            name: '医学',
            cover: 'http://oq39rralr.bkt.clouddn.com/image/zhexue.jpeg'
        },
        {
            name: '军事学',
            cover: 'http://oq39rralr.bkt.clouddn.com/image/zhexue.jpeg'
        },
        {
            name: '管理学',
            cover: 'http://oq39rralr.bkt.clouddn.com/image/zhexue.jpeg'
        },
        {
            name: '艺术学',
            cover: 'http://oq39rralr.bkt.clouddn.com/image/zhexue.jpeg'
        }
    ]
    renderItem = (info: {item: any, index: number}) => {

        const {item, index} = info
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={() => {
                    this.context.navigation.navigate('SelectScene')
                }}>
                <View style={[styles.categoryItem, {height: this.ITEM_HEIGHT}]}>
                    <Image resizeMode="cover" style={styles.itemImage} source={{uri: item.cover}}></Image>
                    <Text style={styles.itemText}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    renderSeperator() {
        return (
            <View style={{height: 20}}></View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.data}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={this.renderSeperator}
                    ListFooterComponent={() => <View style={{height: 40}}></View>}
                >
                </FlatList>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1
    },
    categoryItem: {
        backgroundColor: '#000',

        alignItems: 'center',
        justifyContent: 'center'
    },
    itemImage: {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0
    },
    itemText: {
        color: '#fff',
        fontSize: 20
    }
})