declare module 'react-hot-loader' {

    interface AppContainerProps {
        children?: React.ReactElement<any>
    }

    export class AppContainer extends React.Component<AppContainerProps, {}> {}
}