import * as React from 'react'
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableNativeFeedback,
    FlatList
} from 'react-native'
import Icon from '../../../components/rn/Icon'
import {TabLazyLoad} from '../../../components/rn/tabs'
import CourseCard from './course-card.component'

class SeparatorComponent extends React.Component<any, any> {
    render() {
        return (
            <View style={{height: 20}}></View>
        )
    }
}
class HeaderComponent extends React.Component<any, any> {
    render() {
        return (
            <View style={{height: 20}}></View>
        )
    }
}
class FooterCompnent extends React.Component<any, any> {
    render() {
        return (
            <View style={{height: 150}}></View>
        )
    }
}

interface PropsDefine {
    courseName?: string
}

export default class CourseHomePage extends React.Component<PropsDefine, {}> {
    static contextTypes = {
        tabIndex: React.PropTypes.number
    }
    render() {
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.courseName}>
                    <Text style={styles.courseNameText}>{this.props.courseName}</Text>
                </View>
                <View style={styles.courseInfo}>
                    <TouchableNativeFeedback>
                        <View style={styles.infoBtn}>
                            <Icon name={'info-outline'} size={20}></Icon>
                            <Text style={styles.infoBtnText}>课程介绍</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback>
                        <View style={styles.infoBtn}>
                            <Icon name={'access-time'} size={20}></Icon>
                            <Text style={styles.infoBtnText}>设置提醒</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <FlatList
                    data={[{}, {}, {}, {}, {}]}
                    renderItem={() => <CourseCard contentTitle={"第1章"}></CourseCard>}
                    ItemSeparatorComponent={SeparatorComponent}
                    ListFooterComponent={FooterCompnent}
                >
                </FlatList>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    courseName: {
        height: 45,
        justifyContent: 'center'
    },
    courseNameText: {
        fontSize: 18
    },
    courseInfo: {
        flexDirection: 'row',
        height: 55,
        marginTop: 20,
        marginBottom: 20
    },
    infoBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    infoBtnText: {
        fontSize: 16,
        marginLeft: 5
    }
})