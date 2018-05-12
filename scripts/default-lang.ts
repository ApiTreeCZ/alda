import {readFileSync, writeFileSync} from 'fs';
import {resolve} from 'path';
import {sync} from 'glob';

const defaultMessages = sync('./lang/.messages/**/*.json')
    .map((filename) => readFileSync(filename, 'utf8'))
    .map((file) => JSON.parse(file))
    .reduce((messages, descriptors) => {
        descriptors.forEach(({id, defaultMessage}) => {
            if (messages.hasOwnProperty(id)) {
                throw new Error(`Duplicate message id: ${id}`);
            }
            messages[id] = defaultMessage;
        });
        return messages;
    }, {});

writeFileSync('./lang/en.json', JSON.stringify(defaultMessages, null, 2));
// tslint:disable-next-line
console.log(`> Wrote default messages to: "${resolve('./lang/en.json')}"`);
