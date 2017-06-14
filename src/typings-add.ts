declare module 'react-native-navigation' {
  export interface NavigatorStyle {
    navBarTextColor?: string;
    navBarBackgroundColor?: string;
    navBarButtonColor?: string;
    navBarHidden?: boolean;
    navBarHideOnScroll?: boolean;
    navBarTranslucent?: boolean;
    navBarNoBorder?: boolean;
    drawUnderNavBar?: boolean;
    drawUnderTabBar?: boolean;
    statusBarBlur?: boolean;
    navBarBlur?: boolean;
    tabBarHidden?: boolean;
    statusBarHideWithNavBar?: boolean;
    statusBarHidden?: boolean;
    statusBarTextColorScheme?: string;
  }

  export interface NavigatorButtons {
    leftButtons?: NavigatorButton[];
    rightButtons?: NavigatorButton[];
  }

  export interface NavigatorButton {
    id: string;
    icon?: any;
    title?: string;
    testID?: string;
    disabled?: boolean;
  }

  export interface Drawer {
    left?: {
      screen: string;
    };
    right?: {
      screen: string;
    };
    disableOpenGesture?: boolean;
  }

  export interface TabBasedApp {
    tabs: TabScreen[],
    tabsStyle?: {
      tabBarButtonColor: string;
      tabBarSelectedButtonColor: string;
      tabBarBackgroundColor: string;
    };
    drawer?: Drawer;
    passProps?: Object;
    animationType?: string;
  }

  export interface SingleScreenApp {
    screen: Screen,
    drawer?: Drawer;
    passProps?: Object;
    animationType?: string;
    appStyle?: any
  }

  export interface TabScreen {
    label?: string;
    screen: string;
    icon?: any;
    selectedIcon?: any;
    title?: string;
    navigatorStyle?: NavigatorStyle;
    navigatorButtons?: NavigatorButtons;
  }

  export interface Screen {
    screen: string;
    title?: string;
    navigatorStyle?: NavigatorStyle;
    navigatorButtons?: NavigatorButtons;
    topTabs?: Array<any>
  }

  export interface ModalScreen extends Screen {
    passProps?: Object;
    animationType?: string;
    hideStatusBarAndroid?: boolean;
    orientation?: 'landscape' | 'portrait';
    overrideBackPress?: boolean
  }

  export interface PushedScreen extends ModalScreen {
    backButtonTitle?: string;
    backButtonHidden?: boolean;
  }

  export interface LightBox {
    screen: string;
    passProps?: Object;
    style?: {
      backgroundBlur: string;
      backgroundColor?: string;
    };
  }

  export class Navigation {
    static registerComponent(screenID: string, generator: () => any, store?: any, provider?: any): any;

    static registerScreen(screenId: string, generator: () => any): any;

    static startTabBasedApp(params: TabBasedApp): any;

    static startSingleScreenApp(params: SingleScreenApp): any;

    static showModal(params: ModalScreen): any;

    static dismissModal(params?: {animationType?: string}): any;

    static dismissMeasurementFlow(params?: {animationType?: string}): any;

    static dismissAllModals(params?: {animationType?: string}): any;

    static showLightBox(params: LightBox): any;

    static dismissLightBox(): any;

    static lockToPortrait(): any;

    static lockToLandscape(): any;

    static lockToSensorLandscape(): any;

    static unlockAllOrientations(): any;
    
    static showMaterialDialog(options: any): any;
  }

  export interface Navigator {
    push: (options: PushedScreen) => any;
    pop: (options?: {animated?: boolean}) => any;
    popToRoot: (options?: {animated?: boolean}) => any;
    resetTo: (options: ModalScreen) => any;
    showModal: (options: ModalScreen) => any;
    dismissModal: (options?: {animationType?: string}) => any;
    dismissMeasurementFlow: () => any;
    dismissAllModals: (options?: {animationType?: string}) => any;
    showLightBox: (options: LightBox) => any;
    dismissLightBox: () => any;
    handleDeepLink: (options: {link: string}) => any;
    setOnNavigatorEvent: (callback: (event: any) => any) => any;
    setButtons: (options: NavigatorButtons & {animated?: boolean}) => any;
    setTitle: (options: {title: string}) => any;
    toggleDrawer: (options: {side: string, animated?: boolean, to?: string}) => any;
    toggleTabs: (options: {to: string; animated?: boolean}) => any;
    setTabBadge: (options: {tabIndex?: number, badge: number}) => any;
    switchToTab: (options: {tabIndex: number}) => any;
    toggleNavBar: (options: {to: string, animated?: boolean}) => any;
    showSnackbar: (options: any) => any
  }
}


interface IconProps {
    size?: number
    name?: string
    color?: string
}
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

declare module 'react-native-video-controls' {
    export default class VideoPlayer extends React.Component<any, any> {}
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
