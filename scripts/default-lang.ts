import {readFileSync, writeFileSync} from 'fs';
import {sync} from 'glob';

// lang directory
const dir = './lang';

// default locale
const defaultLocale = 'en';

// default Lang.ts file
const defaultLangTsFile = './client/Lang.ts';

const readMessages = (file: string) => JSON.parse(readFileSync(file, 'utf8'));
const writeMessages = (file: string, content: any) => writeFileSync(file, JSON.stringify(content, null, 2));

// get default messages from ./${dir}/.messages/*
const defaultMessages = sync(`${dir}/.messages/**/*.json`)
    .map((filename) => readMessages(filename))
    .reduce((messages, descriptors) => {
        descriptors.forEach(({id, defaultMessage}: any) => {
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

// tslint:disable-next-line
console.log('\x1b[32m', `Wrote default messages to: "${defaultLangFile}"`);

// save Lang.ts
const keys = Object.keys(defaultMessages);
const langTsContent = `// This file is generated from scripts/default-lang.ts, don\'t modify, run npm run generate:lang
${keys.reduce((acc, key, index) => {
    const endLine = index + 1 === keys.length ? '' : '\n';
    acc += `    ${key
        .toUpperCase()
        .replace(',', '')
        .replace(/\./g, '_')}: '${key}',${endLine}`;
    return acc;
}, 'export const Lang = {\n')}
};\n`;
writeFileSync(defaultLangTsFile, langTsContent);

// tslint:disable-next-line
console.log('\x1b[32m', `Create or replace TypeScript file: "${defaultLangTsFile}"`);

// merge default messages with other languages files
sync(`${dir}/*.json`)
    .filter((f) => f !== defaultLangFile)
    .forEach((file) => {
        writeMessages(file, {...defaultMessages, ...readMessages(file)});
        // tslint:disable-next-line
        console.log('\x1b[32m', `Merge file: ${file} with ${defaultLangFile}`);
    });

// tslint:disable-next-line
console.log('\x1b[0m');
