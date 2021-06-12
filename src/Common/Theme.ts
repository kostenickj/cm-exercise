import { createMuiTheme, Theme } from '@material-ui/core/styles';

interface IThemeExtender {
    BackgroundColor: string;
}

export class FThemeExtension implements IThemeExtender
{
    BackgroundColor!: string;
    constructor(Data: IThemeExtender)
    {
        Object.assign(this, Data);
    }
}

export interface IAppTheme extends Theme {
    Ext: FThemeExtension;
}

export const GetAppTheme = (bDark: boolean): IAppTheme =>
{
    return createMuiTheme({
        overrides: {

        }
        , typography: {

            h1: {
                fontWeight: 'bold'
            }
            , h2: {

                fontWeight: 'bold'
            }
            , h3: {

                fontWeight: 'bold'
            }
            , h4: {

                fontWeight: 'bold'
            }
            , h5: {

                fontWeight: 'bold'
            }
            , h6: {
                fontWeight: 'bold'
            }
        }
        , props: {

        }
        , palette: {
            type: bDark ? 'dark' : 'light'
            ,primary: {
                main: process.env.NEXT_PUBLIC_PRIMARY_COLOR
            }
        }
        , Ext: new FThemeExtension({
            BackgroundColor: process.env.NEXT_PUBLIC_BACKGROUND_COLOR || 'white'
        })
    } as IAppTheme) as IAppTheme;
};