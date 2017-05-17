import * as React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableNativeFeedback
} from 'react-native'

import Icon from '../../../components/rn/Icon'

interface PropsDefine {
    
}
export default class HomeworkCard extends React.Component<PropsDefine, {}> {
    render() {
        return (
            <View style={styles.container}>
                <TouchableNativeFeedback>
                    <View style={styles.header}>
                        <View style={styles.headerHomeworkInfo}>
                            <Text style={styles.headerHomeworkName}>数据结构与算法分析</Text>
                            <Text style={styles.headerHomeworkType}>选择题</Text>
                        </View>
                        <Icon name="keyboard-arrow-right" size={20}></Icon> 
                    </View>
                </TouchableNativeFeedback>
                <View style={styles.homeworkInfo}>
                    <View style={styles.deadline}>
                        <Text style={styles.infoLable}>截止日期</Text>
                        <Text style={styles.infoValue}>05-30</Text>
                    </View>
                    <View style={styles.grade}>
                        <Text style={styles.infoLable}>得分</Text>
                        <Text style={styles.infoValue}>90</Text>
                    </View>
                    <View style={styles.isPass}>
                        <Text style={styles.infoLable}>是否通过</Text>
                        <Text style={styles.infoValue}>是</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    headerHomeworkInfo: {
        flex: 1
    },
    headerHomeworkName: {
        fontSize: 16
    },
    headerHomeworkType: {
        fontSize: 12,
        color: '#999'
    },
    homeworkInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50
    },
    infoLable: {
        fontSize: 11,
        color: '#999'
    },
    infoValue: {
        fontSize: 14
    },
    deadline: {
        flex: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    grade: {
        flex: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    isPass: {
        flex: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
})