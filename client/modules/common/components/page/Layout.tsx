import * as React from 'react';
import {InjectedIntlProps, injectIntl} from 'react-intl';
import {AppFrame, Content, LeftMenu, TopBar} from '../';

interface OwnProps {}

interface State {
    readonly isOpenLeftMenu: boolean;
}

type Props = OwnProps & InjectedIntlProps;

export class Container extends React.Component<Props, State> {
    constructor(props: Props, context: any) {
        super(props, context);
        this.state = {
            isOpenLeftMenu: false,
        };
    }

    handleOnOpenLeftMenu = () => {
        this.setState((prevState) => ({...prevState, isOpenLeftMenu: true}));
    };

    handleOnCloseLeftMenu = () => {
        this.setState((prevState) => ({...prevState, isOpenLeftMenu: false}));
    };

    render() {
        const {
            children,
            intl: {locale},
        } = this.props;
        const {isOpenLeftMenu} = this.state;
        return (
            <AppFrame>
                <TopBar locale={locale} gitHubUrl={'https://github.com/ApiTreeCZ/alda'} onClickOpenLeftMenu={this.handleOnOpenLeftMenu} />
                <LeftMenu open={isOpenLeftMenu} onClose={this.handleOnCloseLeftMenu} />
                <Content>{children}</Content>
            </AppFrame>
        );
    }
}

export const Layout = injectIntl<OwnProps>(Container);
