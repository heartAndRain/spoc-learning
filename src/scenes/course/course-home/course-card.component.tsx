import * as React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableNativeFeedback,
    AsyncStorage
} from 'react-native'

import Icon from '../../../components/rn/Icon'

interface PropsDefine {
    type?: 'week' | 'content'
    weekNum?: number
    contentTitle?: string
    hasManageAuthority?: boolean

    data?: Array<Models.CourseItem>

    onItemPress?: (id: string) => void
    onAddItem?: () => void
}
interface StateDefine {
    
}
export default class CourseCard extends React.Component<PropsDefine, StateDefine> {


    static defaultProps: PropsDefine = {
        type: 'content',
        contentTitle: '居然没有题目',
        data: []
    }

    constructor(props: PropsDefine) {
        super(props)
    }

    handleEnterCourseContent = (id: string) => {
        this.props.onItemPress && this.props.onItemPress(id)
    }

    handleAddCourseContent = () => {
        this.props.onAddItem && this.props.onAddItem()
    }

    renderAddItemBtn = () => {
        return (
            <TouchableNativeFeedback
                onPress={this.handleAddCourseContent}
            >
                <View style={{height: 50, alignItems: 'center', justifyContent: 'center'}}>
                    <Icon name={'add'} size={30}></Icon>
                </View>
            </TouchableNativeFeedback>
        )
    }
    renderContentList = () => {
        // 如果课程列表数据不为空
        if (!this.props.data || !this.props.data.length) {
            // 如果拥有管理该课程的权限
            if (this.props.hasManageAuthority) {
                return this.renderAddItemBtn()
            } else {
                return (
                    <View style={{height: 100, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 14}}>等待老师设置内容哦~</Text>
                    </View>
                )
            }
        }
        const contentList = this.props.data.map((item) => {
            return <View>
                <TouchableNativeFeedback onPress={() =>  this.handleEnterCourseContent(item.itemId)}>
                    <View style={styles.contentItem}>
                        <Text style={{fontSize: 16}}>{item.name}</Text>
                        <Icon name="keyboard-arrow-right" size={20}></Icon> 
                    </View>
                </TouchableNativeFeedback>
            </View>
        })
        if (this.props.hasManageAuthority) {
            contentList.push(this.renderAddItemBtn())
        }
        return contentList
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    {
                        this.props.type === 'week' ? <Text style={[styles.titleText]}>{`第${this.props.weekNum}周`}</Text> : <Text style={[styles.titleText]}>{this.props.contentTitle}</Text>
                    }
                </View>
                <View style={{flex: 1}}>
                    {
                        this.renderContentList()    
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: 320,
        backgroundColor: '#fff',
        borderRadius: 2,
        elevation: 8
    },
    title: {
        height: 40,
        paddingLeft: 20,
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    contentItem: {
        height: 50,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})