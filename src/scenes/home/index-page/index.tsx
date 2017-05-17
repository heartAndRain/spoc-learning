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
            <View style={{height: 50}}></View>
        )
    }
}

export default class IndexPage extends React.Component<PropsDefine, {}> {
    handleOnPressEnterCourse = () => {
        this.props.navigation.navigate('CourseScene')
    }
    render() {
        return (
                <FlatList
                    style={{alignItems: 'center'}}
                    showsVerticalScrollIndicator={false}
                    data={[{text: 'hh'}, {text: 'bb'}, {text: 'vvv'}, {text: 'vvv'}, {text: 'vvv'}]}
                    renderItem={({item}) =>
                            <CourseCard onPressEnterCourse={this.handleOnPressEnterCourse}></CourseCard>
                        }
                    ItemSeparatorComponent={SeparatorComponent}
                    ListHeaderComponent={HeaderComponent}
                    ListFooterComponent={FooterCompnent}
                >
                </FlatList>
        )
    }
}

const styles = StyleSheet.create({
})