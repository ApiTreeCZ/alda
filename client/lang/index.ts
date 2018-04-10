import {defineMessages} from 'react-intl';
import {translate as cs} from './cs';
import {translate as en} from './en';

export const messages = (locale?: string) => {
    // const tr: any = require(`./${locale}`).translate;
    const tr: any = locale === 'cs' ? cs : en;
    const result: any = {};
    tr.forEach((f: any) => (result[f.key] = f.message));
    return defineMessages(result);
};

export const getRequestLanguage = (acceptLanguage?: string) => {
    const supportLangs = ['en', 'cs'];
    if (!acceptLanguage || acceptLanguage.length === 0) {
        return supportLangs[0];
    }
    const parse = acceptLanguage.split(';');
    if (parse.length > 0) {
        const langs = parse[0].split(',');
        for (let i = 0; i <= langs.length; i++) {
            const find = supportLangs.find((f) => f === langs[i]);
            if (find) {
                return find;
            }
        }
    }
    return supportLangs[0];
};

export const setLanguage = (lang: string) => {
    localStorage.setItem('ics_language', lang);
};

export const getLocaleFromStorage = (): string | null => {
    return localStorage.getItem('ics_language');
};

export * from './Lang';
