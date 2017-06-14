import * as React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableNativeFeedback
} from 'react-native'

import Icon from '../../../components/rn/Icon'

interface PropsDefine {
    homework: Models.Homework

    onEnterHomework: (hwId: string) => void
}
export default class HomeworkCard extends React.Component<PropsDefine, {}> {
    static contextTypes = {
        navigation: React.PropTypes.object
    }

    formatTime(date: string) {
        try {
            const dateObj = new Date(+date)
            let fakeMonth = dateObj.getMonth()
            let month = fakeMonth + 1 > 12 ? 1 : fakeMonth + 1
            let day = dateObj.getDate()

            return `${month}-${day}`
        } catch(e) {
            console.log('format error:', e)
        }
        return ''
    }
    render() {
        if (!this.props.homework) {
            return null
        }
        const { hwId, name, type, deadline, score, pass } = this.props.homework
        
        return (
            <View style={styles.container}>
                <TouchableNativeFeedback
                    delayPressOut={50}
                    onPressOut={() => {
                        this.props.onEnterHomework && this.props.onEnterHomework(hwId)
                    }}
                >
                    <View style={styles.header}>
                        <View style={styles.headerHomeworkInfo}>
                            <Text style={styles.headerHomeworkName}>{name}</Text>
                            <Text style={styles.headerHomeworkType}>{+type === 0 ? '选择题' : '问答题'}</Text>
                        </View>
                        <Icon name="keyboard-arrow-right" size={20}></Icon> 
                    </View>
                </TouchableNativeFeedback>
                <View style={styles.homeworkInfo}>
                    <View style={styles.deadline}>
                        <Text style={styles.infoLable}>截止日期</Text>
                        <Text style={styles.infoValue}>{this.formatTime(deadline)}</Text>
                    </View>
                    <View style={styles.grade}>
                        <Text style={styles.infoLable}>得分</Text>
                        <Text style={styles.infoValue}>{score ? score : '-'}</Text>
                    </View>
                    <View style={styles.isPass}>
                        <Text style={styles.infoLable}>是否通过</Text>
                        <Text style={styles.infoValue}>{pass === 1 ? '是' : pass === 0 ? '否' : '-'}</Text>
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