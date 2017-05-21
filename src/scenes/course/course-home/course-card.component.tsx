import * as React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableNativeFeedback
} from 'react-native'

import Icon from '../../../components/rn/Icon'

interface PropsDefine {
    type?: 'week' | 'content'
    weekNum?: number
    contentTitle?: string
    data?: Array<Models.CourseItem>
}
export default class CourseCard extends React.Component<PropsDefine, {}> {

    static contextTypes = {
        navigation: React.PropTypes.object
    }

    static defaultProps: PropsDefine = {
        type: 'content',
        contentTitle: '居然没有题目',
        data: []
    }

    handleEnterCourseContent = (id: string) => {
        this.context.navigation.navigate('CourseContentScene')
    }

    renderContentList = () => {
        return this.props.data.map((item) => {
            return <View>
                <TouchableNativeFeedback onPress={() =>  this.handleEnterCourseContent(item.itemId)}>
                    <View style={styles.contentItem}>
                        <Text style={{fontSize: 16}}>{item.name}</Text>
                        <Icon name="keyboard-arrow-right" size={20}></Icon> 
                    </View>
                </TouchableNativeFeedback>
            </View>
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    {
                        this.props.type === 'week' ? <Text style={[styles.titleText]}>{`第${this.props.weekNum}周`}</Text> : <Text style={[styles.titleText]}>{this.props.contentTitle}</Text>
                    }
                </View>
                <View>
                    {
                        this.props.data.length
                            ? this.renderContentList()
                            : <View><Text>等待老师设置内容哦~</Text></View> 
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
        elevation: 3
    },
    title: {
        height: 40,
        backgroundColor: '#eee',
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