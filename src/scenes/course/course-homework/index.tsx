import * as React from 'react'
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableNativeFeedback,
    SectionList,
    SectionListData
} from 'react-native'
import Icon from '../../../components/rn/Icon'
import {TabLazyLoad} from '../../../components/rn/tabs'
import HomeworkCard from './homework-card.component'

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
    
    renderSectionHeader = ({section}: {section: SectionListData<any>}) => {
        return (
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{section.key}</Text>
            </View>
        )
    }
    render() {
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.courseName}>
                    <Text style={styles.courseNameText}>{this.props.courseName}</Text>
                </View>
                <SectionList
                    renderSectionHeader={this.renderSectionHeader}
                    renderItem={() => <HomeworkCard></HomeworkCard>}
                    sections={[
                        {
                            key: '第一周',
                            data: [{}, {}],
                            
                        },
                        {
                            key: '第二周',
                            data: [{}, {}, {}],
                        }
                    ]}
                    ItemSeparatorComponent={SeparatorComponent}
                    SectionSeparatorComponent={SeparatorComponent}
                    ListHeaderComponent={HeaderComponent}
                    ListFooterComponent={FooterCompnent}
                >

                </SectionList>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20
    },
    courseName: {
        height: 45,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center'
    },
    courseNameText: {
        fontSize: 18
    },
    sectionHeader: {
        alignItems: 'center',
        height: 20
    },
    sectionHeaderText: {
        fontSize: 12,
        color: '#999'
    }
})