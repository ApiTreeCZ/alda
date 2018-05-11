import * as express from 'express';
import * as nextjs from 'next';

const dev: boolean = process.env.NODE_ENV !== 'production';

const app = nextjs({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

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

    server.get('*', (req, res) => handle(req, res));

    const PORT = process.env.PORT || 8080;
    server.listen(PORT, (err: Error) => {
        if (err) {
            throw err;
        }
        // tslint:disable-next-line
        console.log(`Server is ready on PORT=${PORT}`);
    });
});
