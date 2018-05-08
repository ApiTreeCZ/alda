import * as React from 'react';
import Document, {Head, Main, NextScript} from 'next/document';
import {StylesContext} from '../client/styles/StylesContext';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const prefixer = postcss([autoprefixer]);
const minifier = postcss([cssnano]);

class MainDocument extends Document {
    static async getInitialProps(ctx: any) {
        const pageContext = StylesContext.getPageContext({palette: {type: 'light'}});
        const page = ctx.renderPage((Component: any) => (props: any) => <Component pageContext={pageContext} {...props} />);

        let css = pageContext.sheetsRegistry.toString();
        if (process.env.NODE_ENV === 'production') {
            css = (await prefixer.process(css, {from: undefined})).css;
            css = (await minifier.process(css, {from: undefined})).css;
        }

        return {
            ...page,
            pageContext,
            styles: <style id="jss-server-side" dangerouslySetInnerHTML={{__html: css}} />,
        };
    }

    render() {
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
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}

export default MainDocument;
