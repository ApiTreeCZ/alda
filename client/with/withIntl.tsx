import {NextDocumentContext, DocumentProps} from 'next/document';
import * as React from 'react';
import {addLocaleData, injectIntl, IntlProvider} from 'react-intl';

declare const window: any;

// Register React Intl's locale data for the user's locale in the browser. This
// locale data was added to the page by `pages/_document.js`. This only happens
// once, on initial page load in the browser.
if (typeof window !== 'undefined' && window.ReactIntlLocaleData) {
    Object.keys(window.ReactIntlLocaleData).forEach((lang) => {
        addLocaleData(window.ReactIntlLocaleData[lang]);
    });
}

export const withIntl = (Page: React.ComponentType<any> & {getInitialProps(ctx: NextDocumentContext): DocumentProps}) => {
    const IntlPage = injectIntl(Page);

    return class PageWithIntl extends React.Component<any> {
        static async getInitialProps(contextApp: any) {
            const props = Page && Page.getInitialProps ? await Page.getInitialProps(contextApp) : {};

            // Get the `locale` and `messages` from the request object on the server.
            // In the browser, use the same values that the server serialized.
            const {locale, messages} = (contextApp.ctx.req as any) || window.__NEXT_DATA__.props.initialProps;

            // Always update the current time on page load/transition because the
            // <IntlProvider> will be a new instance even with pushState routing.
            const now = Date.now();

            return {...props, locale, messages, now};
        }

        render() {
            const {locale, messages, now, ...props} = this.props;
            return (
                <IntlProvider locale={locale} messages={messages} initialNow={now}>
                    <IntlPage {...props} />
                </IntlProvider>
            );
        }
    };
};
