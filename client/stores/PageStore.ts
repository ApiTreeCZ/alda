import {ThemeOptions} from '@material-ui/core/styles/createMuiTheme';

export interface PageStore {
    readonly themeOptions: ThemeOptions;
    readonly isOpenLeftMenu: boolean;
}
