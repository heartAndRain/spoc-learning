interface IconProps {
    size?: number
    name?: string
    color?: string
}

declare module 'react-native-vector-icons/FontAwesome' {
    export default class Icon extends React.Component<IconProps, {}> {}
}

declare module 'react-native-vector-icons/MaterialIcons' {
    export default class Icon extends React.Component<IconProps, {}> {}
}



