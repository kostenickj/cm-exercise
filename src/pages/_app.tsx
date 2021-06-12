import '@fontsource/roboto'; // Defaults to weight 400.
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import type { AppProps /*, AppContext */ } from 'next/app';
import { GetAppTheme } from '../Common/Theme';
import { RootContextProvider } from '../Store/Root.Store';
import { FAppLayout } from '../Components/Layout';

const Theme = GetAppTheme(false);

const MyApp = ({ Component, pageProps }: AppProps) =>
{
    return (
        <ThemeProvider theme={Theme}>
            <CssBaseline>
                <style jsx global>{
                    `
                    html{
                        height: 100%;
                        display: flex;
                        overflow-x: hidden;
                        max-width: 100%;
                    }
                    body {
                        display: flex;
                        overflow-x: hidden;
                        flex: 1 auto;    
                        max-width: 100%;
                    }
                    #__next{
                        display: flex;
                        flex: 1 auto;
                        flex-direction: column;
                        max-width: 100%;
                    }
                `
                }</style>
                <RootContextProvider>
                    <FAppLayout>
                        <Component {...pageProps} />
                    </FAppLayout>
                </RootContextProvider>
            </CssBaseline>
        </ThemeProvider>
    );
};
// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;