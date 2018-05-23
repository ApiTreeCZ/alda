import autoprefixer from 'autoprefixer';
import Document, {Context, Head, Main, NextScript} from 'next/document';
import postcss from 'postcss';
import * as React from 'react';

import {StylesContext} from '../client/styles/StylesContext';

const prefixer = postcss([autoprefixer as any]);

export default class extends Document {
    static async getInitialProps(ctx: Context) {
        const pageContext = StylesContext.getPageContext({palette: {type: 'light'}});
        const page = ctx.renderPage((Component: any) => (props: any) => <Component pageContext={pageContext} {...props} />);

        let css = pageContext.sheetsRegistry.toString();
        if (process.env.NODE_ENV === 'production') {
            css = (await prefixer.process(css, {from: undefined})).css;
            // css = (await minifier.process(css, {from: undefined})).css;
        }

        const {
            req: {locale, localeDataScript},
        } = ctx as any;

        return {
            ...page,
            pageContext,
            locale,
            localeDataScript,
            styles: <style id="jss-server-side" dangerouslySetInnerHTML={{__html: css}} />,
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
