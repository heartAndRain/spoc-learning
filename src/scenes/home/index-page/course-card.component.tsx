import * as React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableNativeFeedback,
    TouchableOpacity
} from 'react-native'
import Icon from '../../../components/rn/Icon'

interface PropsDefine {
    onPressEnterCourse?: (courseId: number) => void
}
export default class CourseCard extends React.Component<PropsDefine, {}> {

    handleOnPressEnterCourse = () => {
        this.props.onPressEnterCourse && this.props.onPressEnterCourse(110)
    }
    render() {
        return (
            <TouchableNativeFeedback>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Image style={styles.cover} source={require('../../../../images/test.jpeg')}></Image>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>数据结构与算法分析</Text>
                            <Text style={styles.school}>
                                武汉理工大学
                            </Text>
                            <Text style={styles.teacher}>
                                胡燕
                            </Text>
                        </View>
                        <View style={styles.menuContainer}>
                            <TouchableNativeFeedback onPress={() => {}}>
                                <View>
                                    <Icon name="more-vert" size={25} color={'#999'}></Icon>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.message}></View>
                        <View style={styles.btnContainer}>
                            <TouchableNativeFeedback onPress={this.handleOnPressEnterCourse}>
                                <View style={styles.enterBtn}>
                                    <Text style={styles.btnText}>进入课程</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        width: 320,
        height: 260,
        padding: 10,
        // marginBottom: 20,
        elevation: 3,
        borderWidth: 0,
        borderColor: 'transparent',
        backgroundColor: '#fff',
        borderRadius: 2
    },
    header: {
        height: 80,
        flexDirection: 'row'
    },
    content: {
        height: 150,
        backgroundColor: '#eee',
        marginTop: 10,
        padding: 10
    },
    cover: {
        width: 80,
        height: 80,
        marginRight: 10
    },
    titleContainer: {
        flex: 1
    },
    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold'
    },
    school: {
        fontSize: 14,
        color: '#999'
    },
    teacher: {
        fontSize: 14,
        color: '#999'
    },
    menuContainer: {
        width: 45,
        alignItems: 'center',
        paddingTop: 10
    },
    message: {
        // backgroundColor: 'red',
        height: 85
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    enterBtn: {
        width: 90,
        height: 40,
        backgroundColor: '#e84e40',
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    },
    btnText: {
        fontSize: 14,
        color: '#fff'
    }
})