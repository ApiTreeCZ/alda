import * as accepts from 'accepts';
import * as express from 'express';
import {readFileSync} from 'fs';
import {sync} from 'glob';
import * as IntlPolyfill from 'intl';
import * as nextjs from 'next';
import {basename} from 'path';

import {createApolloServer} from './graphql';

// tslint:disable-next-line
require('dotenv').config();

Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

const dev: boolean = process.env.NODE_ENV !== 'production';

const app = nextjs({dev});
const handle = app.getRequestHandler();

const languages = sync('./lang/*.json').map((f) => basename(f, '.json'));

// We need to expose React Intl's locale data on the request for the user's
// locale. This function will also cache the scripts by lang in memory.
const localeDataCache = new Map();
const getLocaleDataScript = (locale: string) => {
    const lang = locale.split('-')[0];
    if (!localeDataCache.has(lang)) {
        const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`);
        const localeDataScript = readFileSync(localeDataFile, 'utf8');
        localeDataCache.set(lang, localeDataScript);
    }
    return localeDataCache.get(lang);
};

// We need to load and expose the translations on the request for the user's
// locale. These will only be used in production, in dev the `defaultMessage` in
// each message description in the source code will be used.
const getMessages = (locale: string) => require(`../lang/${locale}.json`);

app.prepare().then(() => {
    const server = express();

    createApolloServer().applyMiddleware({app: server});

    server.get('/healthz', (_, res) => {
        // check my health
        // -> return next(new Error('DB is unreachable'))
        res.sendStatus(200);
    });

    server.get('/_info', (_, res) => {
        const {NODE_ENV, NODE_VERSION, LC_CTYPE, BACKEND_ENDPOINT, BUILD_AUTHOR, BUILD_NUM, BUILD_DATE, K8S_NAMESPACE} = process.env;
        const {name, version, description, author, homepage, dependencies} = require('../package.json');
        res.json({
            NAME: name,
            DESCRIPTION: description,
            AUTHOR: author,
            VERSION: version,
            HOMEPAGE: homepage,
            BACKEND_ENDPOINT,
            NODE_ENV,
            NODE_VERSION,
            LC_CTYPE,
            BUILD_AUTHOR,
            BUILD_NUM,
            BUILD_DATE,
            K8S_NAMESPACE,
            DEPENDENCIES: dependencies,
        });
    });

    server.get('*', (req: any, res) => {
        // When you change language other way (with browser settings is now), you must rewrite get locale from client on this code row
        const locale = accepts(req).language(languages);
        req.locale = locale;
        if (locale) {
            req.localeDataScript = getLocaleDataScript(locale);
            req.messages = getMessages(locale);
        }
        return handle(req, res);
    });

    const PORT = process.env.PORT || 8080;
    server.listen(PORT, (err: Error) => {
        if (err) {
            throw err;
        }
        // tslint:disable-next-line
        console.log(`Server is ready on PORT=${PORT}`);
    });
});
