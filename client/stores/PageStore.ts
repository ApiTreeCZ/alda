import {ThemeOptions} from 'material-ui/styles/createMuiTheme';

export interface PageStore {
    readonly themeOptions: ThemeOptions;
    readonly isOpenLeftMenu: boolean;
}
