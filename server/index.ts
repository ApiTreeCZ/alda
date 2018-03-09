import * as express from 'express';
import * as nextjs from 'next';

const dev: boolean = process.env.NODE_ENV !== 'production';

const app = nextjs({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

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
