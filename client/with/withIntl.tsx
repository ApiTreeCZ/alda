import * as React from 'react';
import {addLocaleData, injectIntl, IntlProvider} from 'react-intl';
import * as en from 'react-intl/locale-data/en';
import * as cs from 'react-intl/locale-data/cs';
import {getLocaleFromStorage, getRequestLanguage, messages as getMessages} from '../lang';

interface State {
    readonly locale: string;
    readonly messages: any;
}

export const withIntl = (Page: any): React.ComponentClass<any> => {
    const IntlPage = injectIntl(Page);

    return class PageWithIntl extends React.Component<any, State> {

        static async getInitialProps(context: any) {
            let props;
            if (typeof Page.getInitialProps) {
                props = await Page.getInitialProps(context);
            }
            const requestLocale = context.req ? getRequestLanguage(context.req.headers['accept-language']) : 'cs';
            const messages = getMessages(requestLocale);
            return {...props, requestLocale, messages};
        }

        componentDidMount(): void {
            const {requestLocale} = this.props;
            const locale = getLocaleFromStorage();
            this.setState({messages: getMessages(locale || requestLocale), locale: locale || requestLocale});
            addLocaleData([...en, ...cs]);
        }

        render() {
            if (!this.state) {
                return null;
            }
            const {locale, messages} = this.state;
            const {...props} = this.props;
            return (
                <IntlProvider locale={locale} messages={messages}>
                    <IntlPage {...props}/>
                </IntlProvider>
            );
        }
    };
};
