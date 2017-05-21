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



declare namespace Lokka {
    export type QL = string;
    export interface ITransport {
        send(rawQuery: string, variables: { [index: string]: any }, operationName: string): any;
    }
    export interface IConfig {
        transport: ITransport;
    }
    export interface IVars { [index: string]: any }
    export type IFragment = string;
    export interface IWatchHandler<T> {
        (err: any, payload: T): any;
    }
    export interface IStop {
        (): void;
    }
    export interface ICacheConfig {
        cacheExpirationTimeout?: number;
    }
    export interface ICache {
        getItemPayload<T>(query: QL, vars?: IVars): T;
        setItemPayload<T>(query: QL, vars: IVars, payload: T): void;
        fireError(query: QL, vars: IVars, error: Error): void;
        removeItem(query: QL, vars?: IVars): void;
        getItem<T>(query: QL, vars?: IVars): T;
    }
    export class Lokka {
        constructor(config: IConfig);
        query<T>(query: QL, vars?: IVars): Promise<T>;
        mutate<T>(query: QL, vars?: IVars): Promise<T>;
        watchQuery<T>(query: QL, handler?: IWatchHandler<T>): IStop;
        watchQuery<T>(query: QL, vars?: IVars, handler?: IWatchHandler<T>): IStop;
        createFragment(fragment: QL): IFragment;
        refetchQuery(query: QL, vars?: IVars): void;
        cache: ICache;
    }
}

declare module 'lokka' {
    export = Lokka
}

declare module 'lokka-transport-http' {
    export class Transport {
        constructor(url: string)
        send(rawQuery: string, variables: { [index: string]: any }, operationName: string): any
    }
}
