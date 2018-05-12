export interface InfoModel {
    readonly NAME: string;
    readonly DESCRIPTION: string;
    readonly AUTHOR: string;
    readonly VERSION: string;
    readonly HOMEPAGE: string;
    readonly LC_CTYPE: string;
    readonly DEPENDENCIES: {[key: string]: string};
}
