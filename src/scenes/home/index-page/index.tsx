import * as React from 'react'
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ScrollView
} from 'react-native'
import CourseCard from './course-card.component'

interface PropsDefine {
    navigation?: any
}
export default class IndexPage extends React.Component<PropsDefine, {}> {
    handleOnPressEnterCourse = () => {
        this.props.navigation.navigate('CourseScene')
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <FlatList
                    data={[{text: 'hh'}, {text: 'bb'}]}
                    renderItem={({item}) => <CourseCard onPressEnterCourse={this.handleOnPressEnterCourse}></CourseCard>}
                    refreshing={false}
                    onRefresh={() => {}}
                >
                </FlatList>
            </ScrollView>
                
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    }
})