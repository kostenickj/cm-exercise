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
    Button,
    OutlinedInput
} from '@material-ui/core';
import { ChangeEventHandler, Component, PureComponent } from 'react';
import { CssPropsRecursive, FClientUtil, IBaseComponentProps } from '../Common/Common';
import { observer } from 'mobx-react';
import { AppRootStoreContext } from '../Store/Root.Store';
import { SelectInputProps } from '@material-ui/core/Select/SelectInput';
import MaskedInput from 'react-text-mask';

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

const TextMaskCreditCard = (props: any) =>
{
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) =>
            {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
};

const TextMaskCCV = (props: any) =>
{
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) =>
            {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
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

    OnCardNumChange:  ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (Ev) =>
    {
        this.context.ACT_SetCardNum(
            FClientUtil.ReplaceAll((Ev.target.value as string || ''), ' ', '')
        );
    };

    OnCardNameChange:  ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (Ev) =>
    {
        this.context.ACT_SetCardName((Ev.target?.value as string || '').trim());
    };
    OnCardExpireMonthChange: SelectInputProps['onChange'] = (Ev) =>
    {
        this.context.ACT_SetExpireMonth((Ev.target?.value as string || ''));
    };
    OnCardExpireYearChange:  SelectInputProps['onChange']  = (Ev) =>
    {
        this.context.ACT_SetExpireYear((Ev.target?.value as string || ''));
    };
    OnCardCCVChange:  ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (Ev) =>
    {
        this.context.ACT_SetCCV(
            FClientUtil.ReplaceAll((Ev.target.value as string || ''), ' ', '').trim()
        );
    };

    /** this is really hacky, in real life i would just make my own task mask component cuz this one sucks */
    FixAnnoyingCursorBug = (Ev: any) =>
    {
        setTimeout(() =>
        {
            requestAnimationFrame(()=>
            {
                Ev.target.setSelectionRange(0, 0, 'none');
            });

        },1);
    };

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
                                    <FormControl fullWidth variant='outlined'>
                                        <InputLabel
                                            shrink
                                            htmlFor="cc-input"
                                        >
                                            Card Number
                                        </InputLabel>
                                        <OutlinedInput
                                            label={'Card Number'}
                                            value={this.context.COMP_CCInfo.CardNum}
                                            onChange={this.OnCardNumChange}
                                            name="textmask"
                                            id="cc-input"
                                            inputComponent={TextMaskCreditCard}
                                            fullWidth
                                            onBlur={this.FixAnnoyingCursorBug}
                                            onClick={this.FixAnnoyingCursorBug}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth label="Card Name"
                                        variant="outlined"
                                        value={this.context.COMP_CCInfo.CardName}
                                        onChange={this.OnCardNameChange}
                                    />
                                </Grid>
                                <Grid item xs={12} className={cls!.expireLabelWrapper}>
                                    <Typography variant={'caption'}>Expiration Date</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel shrink>Month</InputLabel>
                                        <Select
                                            value={this.context.COMP_CCInfo.ExpireMonth}
                                            onChange={this.OnCardExpireMonthChange}
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
                                            value={this.context.COMP_CCInfo.ExpireYear}
                                            onChange={this.OnCardExpireYearChange}                                        >
                                            {this.ExpirationYears.map((Year) =>
                                            {
                                                return <MenuItem key={Year} value={Year}>{Year}</MenuItem>;
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth variant='outlined'>
                                            <InputLabel
                                                shrink
                                                htmlFor="ccv-input"
                                            >
                                            CCV
                                            </InputLabel>
                                            <OutlinedInput
                                                label={'CCV'}
                                                value={this.context.COMP_CCInfo.CCV}
                                                onChange={this.OnCardCCVChange}
                                                name="textmask-ccv"
                                                id="ccv-input"
                                                inputComponent={TextMaskCCV}
                                                fullWidth
                                                onBlur={this.FixAnnoyingCursorBug}
                                                onClick={this.FixAnnoyingCursorBug}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button disabled={!this.context.CanSubmitCard()} fullWidth variant="contained" color="primary">
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
