interface IconProps {
    size?: number
    name?: string
    color?: string
}

// declare module 'react-native-vector-icons/FontAwesome' {
//     export default class Icon extends React.Component<IconProps, {}> {}
// }

declare module 'react-native-vector-icons/MaterialIcons' {
    export default class Icon extends React.Component<IconProps, {}> {}
}

declare module 'react-native-vector-icons/MaterialCommunityIcons' {
    export default class IconPlus extends React.Component<IconProps, {}> {}
}

declare module 'react-native-pathjs-charts' {
    interface BarPropsDefine {

    }
    export class Bar extends React.Component<BarPropsDefine, any> {}
}

declare module 'react-native-video' {
    interface VideoPropsDefine {
        source: { uri: string, mainVer?: number, patchVer?: number}
        rate?: number
        volume?: number
        muted?: boolean
        paused?: boolean
        resizeMode?: "cover" | "contain" | "stretch"
        repeat?: boolean
        playInBackground?: boolean
        /** iOS only */
        playWhenInactive?: boolean
        /** iOS only */
        ignoreSilentSwitch?: "ignore"
        /** iOS only */
        progressUpdateInterval?: number
        onLoadStart?: (...args: any[]) => any
        onLoad?: (...args: any[]) => any
        onProgress?: (...args: any[]) => any
        onEnd?: (...args: any[]) => any
        onError?: (...args: any[]) => any
        onBuffer?: (...args: any[]) => any
        onTimedMetadata?: (...args: any[]) => any


        style?: any
        ref?: any
    }
    export default class Video extends React.Component <VideoPropsDefine, any> {}
}

