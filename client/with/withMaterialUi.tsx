import * as React from 'react';
import {MuiThemeProvider, Reboot} from 'material-ui';
import {StylesContext} from '../styles/StylesContext';
// tslint:disable-next-line
const JssProvider = require('react-jss/lib/JssProvider').default;


export const withMaterialUi = (BaseComponent: React.ComponentClass & { getInitialProps?(ctx: any): Promise<any> }) => {

    interface Props {
        readonly pageContext?: any;
    }

    class Component extends React.Component<Props> {

        private pageContext: any = null;

        static async getInitialProps(ctx: any) {
            if (BaseComponent.getInitialProps) {
                return await BaseComponent.getInitialProps(ctx);
            }
            return {};
        }

        componentWillMount() {
            this.pageContext = this.props.pageContext || StylesContext.getPageContext('light');
        }

        componentDidMount() {
            // Remove the server-side injected CSS.
            const jssStyles = document.querySelector('#jss-server-side');
            if (jssStyles && jssStyles.parentNode) {
                jssStyles.parentNode.removeChild(jssStyles);
            }
        }

        render() {
            const {jss, sheetsRegistry, generateClassName, sheetsManager, theme} = this.pageContext;
            return (
                <JssProvider jss={jss} registry={sheetsRegistry} generateClassName={generateClassName}>
                    <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
                        <Reboot/>
                        <BaseComponent {...this.props}/>
                    </MuiThemeProvider>
                </JssProvider>
            );
        }
    }

    return Component;
};
