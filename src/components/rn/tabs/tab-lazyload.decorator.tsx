import * as React from 'react'
import * as PubSub from 'pubsub-js'
import {
    View,
    Text
} from 'react-native'

export function TabLazyLoad<P, S>(WrappedComponent: any) {
    return class extends React.Component<any, any> {

        constructor(props: P) {
            super(props)
        }
        state: any = {
            hasRendered: false
        }
        static contextTypes = {
            tabIndex: React.PropTypes.number
        }
        componentWillMount() {

            if (this.context.tabIndex === 0) {
                this.setState({
                    hasRendered: true
                })
            }
            PubSub.subscribe('TAB_CHANGE', (message: any, position: number) => {
                if (position === this.context.tabIndex) {
                    if (!this.state.hasRendered) {
                        this.setState({
                            hasRendered: true
                        })
                    }
                }
            })
        }
        render() {

            if (!this.state.hasRendered) {
                return <View><Text>loading</Text></View>
            }
            return (
                <WrappedComponent {...(this.props as any)}></WrappedComponent>
            )
        }
    }
}