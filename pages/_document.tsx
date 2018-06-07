import autoprefixer from 'autoprefixer';
import Document, {Context, Head, Main, NextScript} from 'next/document';
import postcss from 'postcss';
import * as React from 'react';

import {StylesContext} from '../client/styles/StylesContext';

const prefixer = postcss([autoprefixer as any]);

// tslint:disable-next-line
const JssProvider = require('react-jss/lib/JssProvider').default;

const generateCss = async (css: string): Promise<string> => {
    if (process.env.NODE_ENV === 'production') {
        return (await prefixer.process(css, {from: undefined})).css;
    }
    return css;
};

type ContextWithLocale = Context & {req: {locale: string; localeDataScript: string}};

export default class extends Document {
    static async getInitialProps({renderPage, req: {locale, localeDataScript}}: ContextWithLocale) {
        const pageContext = StylesContext.getPageContext({palette: {type: 'light'}});
        const page = renderPage((Component: any) => (props) => (
            <JssProvider registry={pageContext.sheetsRegistry} generateClassName={pageContext.generateClassName}>
                <Component pageContext={pageContext} {...props} />
            </JssProvider>
        ));

        return {
            ...page,
            pageContext,
            locale,
            localeDataScript,
            styles: <style id="jss-server-side" dangerouslySetInnerHTML={{__html: await generateCss(pageContext.sheetsRegistry.toString())}} />,
        };
    }

    render() {
        const {locale, localeDataScript} = this.props;
        // Polyfill Intl API for older browsers
        const polyfill = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${locale}`;

        return (
            <html lang="en" dir="ltr">
                <Head>
                    <title>ALDA</title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height" />
                    <meta name="keywords" content="" />
                    <meta name="description" content="" />
                    <meta name="author" content="ApiTree s.r.o." />
                    {/*<link rel="shortcut icon" type="image/x-icon" href="/static/images/favicon.ico"/>*/}
                    {/*<link rel="icon" type="image/x-icon" href="/static/images/favicon.ico"/>*/}
                    <link rel="stylesheet" href="/static/nprogress/nprogress.css" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                    <link
                        rel="stylesheet"
                        href="https://use.fontawesome.com/releases/v5.0.13/css/all.css"
                        integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp"
                        crossOrigin="anonymous"
                    />
                </Head>
                <body>
                    <Main />
                    <script src={polyfill} />
                    <script dangerouslySetInnerHTML={{__html: localeDataScript}} />
                    <NextScript />
                </body>
            </html>
        );
    }
}
