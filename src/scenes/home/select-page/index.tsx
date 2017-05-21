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
import {SourseType, getUrl} from '../../../utils/getUrl'
import Icon from '../../../components/rn/Icon'

interface PropsDefine {
    categoryList: Array<Models.Category>
}
export default class SelectPage extends React.Component<PropsDefine, any> { 

    static contextTypes = {
        navigation: React.PropTypes.object
    }

    private ITEM_HEIGHT = Dimensions.get('window').width * 9 / 16   // 16: 9
    renderItem = (info: {item: Models.Category, index: number}) => {

        const {item, index} = info
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={() => {
                    this.context.navigation.navigate('SelectScene')
                }}>
                <View style={[styles.categoryItem, {height: this.ITEM_HEIGHT}]}>
                    <Image resizeMode="cover" style={styles.itemImage} source={{uri: getUrl(SourseType.Image, item.cover)}}></Image>
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
        const {categoryList} = this.props 
        
        if (!categoryList.length) {
            return <View><Text>暂时没有学科目录</Text></View>
        }
        return (
            <View style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={categoryList}
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