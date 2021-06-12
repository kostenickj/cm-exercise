import {
    Typography,
    withStyles,
    withTheme,
    Theme,
    Paper,
    Grid,
    TextField,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    Button
} from '@material-ui/core';
import Link from 'next/link';
import { Component } from 'react';
import { CssPropsRecursive, IBaseComponentProps } from '../Common/Common';
import { observer } from 'mobx-react';
import { AppRootStoreContext } from '../Store/Root.Store';

const styles = (AppTheme: Theme): CssPropsRecursive =>
{
    return {
        pageRoot: {
            display: 'flex'
            ,justifyContent: 'center'
            ,alignItems: 'center'
            ,flexWrap: 'wrap'
            ,'& .MuiPaper-root': {
                margin: AppTheme.spacing(1)
                ,width: AppTheme.spacing(64)
                ,height: AppTheme.spacing(64)
                ,borderRadius: AppTheme.spacing(2)
                ,padding: AppTheme.spacing(3)
            }
        }
        , form: {
            display: 'flex'
            , flex: '1 auto'
            , flexDirection: 'column'
            , '& .MuiFormLabel-root': {
                color: 'black !important'
            }
        }
        , expireLabelWrapper: {
            paddingBottom: '0 !important'
            ,paddingTop: '0 !important'
        }
    };
};


interface IHomeProps extends IBaseComponentProps {
}

class Home extends Component<IHomeProps>
{


    static contextType = AppRootStoreContext;
    context!: React.ContextType<typeof AppRootStoreContext>;

    private ExpirationYears: number[];
    private ExpirationMonths: string[];

    constructor(props: any)
    {
        super(props);
        this.ExpirationMonths = [
            '01','02','03','04','05','06','07','08','09','10','11','12'
        ];
        const CurrentYear = new Date().getFullYear();
        this.ExpirationYears = [];
        for(let Year = CurrentYear; Year <= (CurrentYear+10); Year++)
        {
            this.ExpirationYears.push(Year);
        }
    }

    componentDidMount(): void
    {

    }

    componentWillUnmount(): void
    {

    }


    render(): JSX.Element
    {

        const {
            classes: cls
        } = this.props;


        return (
            <>
                <Grid item xs={12} className={cls!.pageRoot}>
                    <Paper elevation={3}>
                        <form noValidate autoComplete="off" className={cls!.form}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <TextField InputLabelProps={{ shrink: true }}  fullWidth label="Card Number" variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField InputLabelProps={{ shrink: true }}  fullWidth label="Card Name" variant="outlined" />
                                </Grid>
                                <Grid item xs={12} className={cls!.expireLabelWrapper}>
                                    <Typography variant={'caption'}>Expiration Date</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel shrink>Month</InputLabel>
                                        <Select
                                            value={''}
                                            //   onChange={handleChange}
                                        >
                                            {this.ExpirationMonths.map((Month) =>
                                            {
                                                return <MenuItem key={Month} value={Month}>{Month}</MenuItem>;
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel shrink>Year</InputLabel>
                                        <Select
                                            value={''}
                                            //   onChange={handleChange}
                                        >
                                            {this.ExpirationYears.map((Year) =>
                                            {
                                                return <MenuItem key={Year} value={Year}>{Year}</MenuItem>;
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <Grid item xs={12}>
                                        <TextField
                                            inputProps={{ maxLength: 3 }}
                                            InputLabelProps={{ shrink: true }}
                                            fullWidth
                                            label="CCV"
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button fullWidth variant="contained" color="primary">
                                         Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>

            </>
        );
    }
}

//typings being dumb here but its correct
const HomeObs = observer(Home);
const FHome = withTheme(withStyles(styles as any)(HomeObs) as any);
export default FHome;
