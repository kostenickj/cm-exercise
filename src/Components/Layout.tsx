import Head from 'next/head';
import { Container, Grid, withStyles, withTheme } from '@material-ui/core';
import { withRouter } from 'next/router';
import { observer } from 'mobx-react';
import { IAppTheme } from '../Common/Theme';
import { Component } from 'react';
import { CssPropsRecursive, IBaseComponentProps } from '../Common/Common';
import { AppRootStoreContext } from '../Store/Root.Store';
import clsx from 'clsx';

interface ILayoutProps extends IBaseComponentProps {

}

const Styles = (Theme: IAppTheme): CssPropsRecursive =>
{
    return {
        appContent: {
            display: 'flex'
            ,flex: '1 auto'
            , backgroundColor: Theme.Ext.BackgroundColor
        }
        ,appFooter: {
            backgroundColor: Theme.Ext.BackgroundColor
        }
    };
};


const AppLayoutObs = observer(
    class AppLayout extends Component<ILayoutProps>
    {
        static defaultProps: ILayoutProps = {
            classes: {}
        };
        static contextType = AppRootStoreContext;
        context!: React.ContextType<typeof AppRootStoreContext>;

        bUnmounting: boolean;

        constructor(props: any)
        {
            super(props);
            this.bUnmounting = false;
        }

        OnWindowResize()
        {

        }

        componentDidMount(): void
        {
            if (typeof window !== 'undefined')
            {
                window.addEventListener('resize', this.OnWindowResize.bind(this));
            }
        }

        componentWillUnmount(): void
        {
            if (typeof window !== 'undefined')
            {
                window.removeEventListener('resize', this.OnWindowResize.bind(this));
            }
        }

        render(): JSX.Element
        {
            const MainClasses = {
                [this.props.classes!.appContent]: true
            };

            const FooterClasses = {
                [this.props.classes!.appFooter]: true
            };

            return (
                <>
                    <Head>
                        <title>Nice App</title>
                        <meta charSet='utf-8' />
                        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                    </Head>
                    <Container maxWidth={'xl'} id='app-main-content' className={clsx(MainClasses)}>
                        <Grid container>
                            <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {this.props.children}
                            </Grid>
                        </Grid>
                    </Container>
                    <footer  className={clsx(FooterClasses)}>
                        <hr />
                        <span>Such footer</span>
                    </footer>
                </>
            );
        }
    }
);

//tpyings are super borked here...but trust me its fine
const LayoutWithRouter: typeof AppLayoutObs = withRouter(AppLayoutObs as any) as any;
const FAppLayout: typeof AppLayoutObs = withTheme(withStyles(Styles as any)(LayoutWithRouter as any)) as any;

export { FAppLayout };
