import * as PubSub from 'pubsub-js'
import {Navigation} from 'react-native-navigation'
import {AsyncStorage} from 'react-native'

export function initApp() {
    /**
     * 全局事件订阅
     */
    PubSub.subscribe('LOGIN', () => {
        Navigation.showModal({
            screen: 'LoginScene',
            overrideBackPress: true
        })
    })
    PubSub.subscribe('LOGOUT', async () => {
        await AsyncStorage.removeItem('@userkey')
        Navigation.showModal({
            screen: 'LoginScene',
            overrideBackPress: true
        })
    })

}