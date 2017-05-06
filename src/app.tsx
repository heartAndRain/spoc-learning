import * as React from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar
} from 'react-native'
import { Tabs, Tab } from  './components/rn/tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'


export default class App extends React.Component<any, any> {
    componentWillMount() {
        StatusBar.setBackgroundColor('#ba3d42', true)
    }
    render() {
        return (
            <View>
                <Tabs headerStyle={{backgroundColor: '#e84e40'}} itemStyle={'icon'}>
                    <Tab name="首页" icon={<Icon name={'home'} size={25} color={'#fff'}></Icon>}>
                        <View>
                            <Text>首页</Text>
                        </View>
                    </Tab>
                    <Tab name="选课" icon={<Icon name={'library-books'} size={25} color={'#fff'}></Icon>}>
                        <View>
                            <Text>选课</Text>
                        </View>
                    </Tab>
                    <Tab name="搜索" icon={<Icon name={'search'} size={25} color={'#fff'}></Icon>}>
                        <View>
                            <Text>搜索</Text>
                        </View>
                    </Tab>
                    <Tab name="个人" icon={<Icon name={'person'} size={25} color={'#fff'}></Icon>}>
                        <View>
                            <Text>个人</Text>
                        </View>
                    </Tab>
                </Tabs>
            </View>
        )
    }
}
