import {readFileSync, writeFileSync} from 'fs';
import {resolve} from 'path';
import {sync} from 'glob';

// lang directory
const dir = './lang';

// default locale
const defaultLocale = 'en';

const readMessages = (file: string) => JSON.parse(readFileSync(file, 'utf8'));
const writeMessages = (file: string, content: any) => writeFileSync(file, JSON.stringify(content, null, 2));

// get default messages from ./${dir}/.messages/*
const defaultMessages = sync(`${dir}/.messages/**/*.json`)
    .map((filename) => readMessages(filename))
    .reduce((messages, descriptors) => {
        descriptors.forEach(({id, defaultMessage}) => {
            if (messages.hasOwnProperty(id)) {
                throw new Error(`Duplicate message id: ${id}`);
            }
            messages[id] = defaultMessage;
        });
        return messages;
    }, {});

const defaultLangFile = `${dir}/${defaultLocale}.json`;

// save default messages to default lang file
writeMessages(defaultLangFile, defaultMessages);

// merge default messages with other languages files
sync(`${dir}/*.json`)
    .filter((f) => f !== defaultLangFile)
    .forEach((file) => {
        writeMessages(file, {...defaultMessages, ...readMessages(file)});
    });

// tslint:disable-next-line
console.log(`> Wrote default messages to: "${resolve(defaultLangFile)}"`);
