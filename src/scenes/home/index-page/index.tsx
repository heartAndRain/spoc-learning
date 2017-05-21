import * as React from 'react'
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ScrollView
} from 'react-native'
import CourseCard from './course-card.component'
import {Client} from '../../../utils/gql-client'

interface PropsDefine {
    navigation?: any

    selectedCourse: Array<Models.Course>
}

export default class IndexPage extends React.Component<PropsDefine, {}> {

    static contextTypes = {
        navigation: React.PropTypes.object
    }

    handleOnPressEnterCourse = (courseId: number) => {
        this.context.navigation.navigate('CourseScene', {courseId})
    }

    componentDidMount() {
        
    }

    render() {
        const { selectedCourse } = this.props
        if (!selectedCourse.length) {
            return (
                <View><Text>快去选课吧~</Text></View>
            )
        }
        return (
                <FlatList
                    contentContainerStyle={{alignItems: 'center'}}
                    
                    showsVerticalScrollIndicator={false}
                    data={selectedCourse}
                    renderItem={({item}: {item: Models.Course}) =>
                            <CourseCard itemData={item} onPressEnterCourse={() => this.handleOnPressEnterCourse(item.courseId)}></CourseCard>
                        }
                    ItemSeparatorComponent={() => <View style={{height: 20}}></View>}
                    ListHeaderComponent={() => <View style={{height: 20}}></View>}
                    ListFooterComponent={() => <View style={{height: 50}}></View>}
                >
                </FlatList>
        )
    }
}

const styles = StyleSheet.create({
})