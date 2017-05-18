import * as React from 'react'
import {
    View,
    Text,
    Dimensions,
    TouchableNativeFeedback,
    StyleSheet,
    ScrollView,
    FlatList,
    StatusBar
} from 'react-native'

import Video from 'react-native-video'

import Icon, {IconPlus} from '../../../components/rn/Icon'

interface PropsDefine {

}
export default class CourseContentScene extends React.Component<PropsDefine, {}> {

    private VIDEO_HEIGHT = Dimensions.get('window').width * 9 / 16   // 16: 9
    private player: any

    static navigationOptions: any = {
        header: null
    }
    componentWillMount() {
        StatusBar.setBackgroundColor('#000', true)
    }
    componentWillUnmount() {
        StatusBar.setBackgroundColor('#ba3d42', true)
    }

    renderFileItem = (info: {item: any, index: number}) => {
        const {item, index} = info

        let iconName = item.type === 'hw' ? 'file-document' : `file-${item.type}`

        if (item.type === 'hw') {
            return (
                <TouchableNativeFeedback>
                    <View style={styles.fileItem}>
                        <View style={{marginRight: 16}}>
                            <IconPlus name={iconName} size={40}></IconPlus>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{fontSize: 16, }}>数据结构与算法分析</Text>
                            <Text style={{fontSize: 14, color: '#999'}}>补充说明</Text>
                        </View>
                        <View>
                            <Icon name={'keyboard-arrow-right'} size={30}></Icon>
                        </View>
                    </View>
                    
                </TouchableNativeFeedback>
            )
        }

        return (
            <View style={styles.fileItem}>
                <View style={{marginRight: 16}}>
                    <IconPlus name={iconName} size={40}></IconPlus>
                </View>
                <View style={{flex: 1}}>
                    <Text style={{fontSize: 16, }}>数据结构与算法分析</Text>
                    <Text style={{fontSize: 14, color: '#999'}}>补充说明</Text>
                </View>
                <TouchableNativeFeedback hitSlop={{top: 30, left: 30, right: 30, bottom: 30}}>
                    <View>
                        <Icon name={'cloud-download'} size={30}></Icon>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{backgroundColor: '#000'}}>
                    <Video
                        ref={(player: any) => {this.player = player}}
                        source={{uri: 'http://oq39rralr.bkt.clouddn.com/job_video/test.wmv', mainVer: 1, patchVer: 0}}
                        rate={1.0}
                        volume={1.0}
                        muted={false}                           // Mutes the audio entirely.
                        paused={false}                          // Pauses playback entirely.
                        resizeMode="contain"                      // Fill the whole screen at aspect ratio.*
                        repeat={false}                           // Repeat forever.
                        playInBackground={false}
                        style={[styles.video, {height: this.VIDEO_HEIGHT}]}
                    ></Video>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.title}>
                        <Text style={{fontSize: 20, marginBottom: 20}}>数据结构与算法分析</Text>
                        <Text style={{fontSize: 14, color: '#999', marginBottom: 10}}>本章重点</Text>
                        <Text numberOfLines={3} style={{fontSize: 14}}>
                            本节重点掌握数据的基本类型，数据结构与算法之间的关系，为什么数据结构很重要。
                        </Text>
                    </View>
                    <View style={styles.material}>
                        <View style={{height: 40, backgroundColor: '#eee', justifyContent: 'center', paddingLeft: 16}}>
                            <Text style={{fontSize: 16}}>课程资料</Text>
                        </View>
                            <FlatList
                                style={{marginBottom: 30}}
                                data={[{type: 'word'}, {type: 'powerpoint'}, {type: 'hw'}]}
                                renderItem={this.renderFileItem}   
                            >

                            </FlatList>
                    </View>
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    video: {
        backgroundColor: '#000'
    },
    title: {
        padding: 16
    },
    material: {

    },
    fileItem: {
        flexDirection: 'row',
        padding: 16,
        height: 80,
        alignItems: 'center'
    }
})