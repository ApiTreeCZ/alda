import * as React from 'react';
import {InjectedIntlProps, injectIntl} from 'react-intl';
import {AppFrame, Content, LeftMenu, TopBar} from '../';

interface OwnProps {}

type Props = OwnProps & InjectedIntlProps;

const initialState = {
    isOpenLeftMenu: false,
};

export class Container extends React.Component<Props, typeof initialState> {
    readonly state = initialState;

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
