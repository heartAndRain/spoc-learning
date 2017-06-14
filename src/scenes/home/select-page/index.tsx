import * as React from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableNativeFeedback,
    TouchableOpacity,
    Image,
    Dimensions,
    StyleSheet,
    ActivityIndicator
} from 'react-native'
import {SourseType, getUrl} from '../../../utils/getUrl'
import Icon from '../../../components/rn/Icon'
import {Client} from '../../../utils/gql-client'

interface PropsDefine {
    navigator?: any
}

interface StateDefine {
    isFailed?: boolean
    isFetching?: boolean
    hasLoaded?: boolean
    categoryList?: Array<Models.Category>
}
export default class SelectPage extends React.Component<PropsDefine, StateDefine> { 

    constructor(props: PropsDefine) {
        super(props)

        this.state = {
            isFailed: false,
            isFetching: false,
            hasLoaded: false
        }
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    loadData = () => {
        this.setState({
            isFetching: true
        })
        Client.getInstance().query(`
            {
                categoryList {
                    categoryId,
                    name,
                    cover
                }
            }
        `).then((result: any) => {
            this.setState({
                isFetching: false,
                hasLoaded: true,
                categoryList: result.categoryList
            })
        }).catch(e => {
            console.log(e)
            this.setState({
                isFailed: true,
                hasLoaded: false,
                isFetching: false
            })
        })
    }

    onNavigatorEvent(event: any) {
        if (event.id === 'tabSelected') {
            if (!this.state.hasLoaded && !this.state.isFetching) {
                this.loadData()
            }
        }
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
        const {categoryList, isFetching, isFailed} = this.state 
        if (isFetching) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size={'large'} animating={true}></ActivityIndicator>
                </View>
            )
        }
        if (isFailed) {
            return (
                <View>
                    <Text>加载失败，服务器错误</Text>
                </View>
            )
        }
        if (categoryList && !categoryList.length) {
            return <View><Text>暂时没有学科目录</Text></View>
        }
        return (
            <View style={styles.container}>
                <FlatList
                    keyExtractor={item => item.name}
                    showsVerticalScrollIndicator={false}
                    data={categoryList}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={this.renderSeperator}
                    ListFooterComponent={() => <View style={{height: 20}}></View>}
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