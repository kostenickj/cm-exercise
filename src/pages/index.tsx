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
import { ChangeEventHandler, Component, createRef, PureComponent, Ref, RefObject } from 'react';
import { CssPropsRecursive, FClientUtil, IBaseComponentProps } from '../Common/Common';
import { observer } from 'mobx-react';
import { AppRootStoreContext } from '../Store/Root.Store';
import { SelectInputProps } from '@material-ui/core/Select/SelectInput';
import MaskedInput from 'react-text-mask';
import Visa from '../Assets/visa.png';
import Chip from '../Assets/chip.png';
import clsx from 'clsx';

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
        , cardWrapper: {
            height: 'auto'
            ,minHeight: '250px'
            ,maxWidth: '100%'
            ,position: 'relative'
            ,borderRadius: AppTheme.spacing(2)
            , margin: AppTheme.spacing(2)
            , backgroundImage: 'url("6.jpeg")'
            , '& .card-label': {
                display: 'block'
                , textAlign: 'center'
                , letterSpacing: '2px'
                , fontSize: `${AppTheme.typography.fontSize-3}px !important`
            }
            , '& .visa': {
                maxHeight: '50px'
                , width: 'auto'
                , float: 'right'
                , margin: AppTheme.spacing(1)
            }
            , '& .chip': {
                maxHeight: '50px'
                , width: 'auto'
                , margin: AppTheme.spacing(1)
            }
            , '& .middle-wrapper': {
                width: '100%'
                , position: 'absolute'
                , bottom: '100px'
                , left: 0
                , height: '70px'
                , display: 'flex'
                , alignItems: 'flex-end'
                , paddingLeft: AppTheme.spacing(3)
                , paddingRight: AppTheme.spacing(3)
                , '& .card-number': {
                    width: '100%'
                    , '& .ccnum-text': {
                        color: 'white'
                        ,[AppTheme.breakpoints.down(500)]: {
                            letterSpacing: 0
                            , fontSize: 14
                        }
                        , letterSpacing: '4px'
                        , fontSize: 18
                    }
                }
            }
            ,'& .bottom-wrapper': {
                color: 'white'
                , height: '70px'
                , width: '100%'
                , position: 'absolute'
                , bottom: 0
                , left: 0
                , display: 'flex'
                , justifyContent: 'space-between'
                ,'& .card-holder-box': {
                    height: '70px'
                    , width: '100%'
                    , marginLeft: AppTheme.spacing(3)
                    , paddingBottom: AppTheme.spacing(2)
                    , '& .holder-container': {
                        display: 'flex'
                        , flexDirection: 'column'
                        , justifyContent: 'space-between'
                        , padding: AppTheme.spacing(.75)
                        , height: '100%'
                    }
                    , '& .holder-text': {
                        ...AppTheme.typography.caption
                        , width: '100%'
                        , display: 'block'
                        , textAlign: 'left'
                        , fontSize: '1em'
                    }
                }
                ,'& .expire-box': {
                    height: '70px'
                    , width: '70px'
                    , marginRight: AppTheme.spacing(3)
                    , paddingBottom: AppTheme.spacing(2)
                    , '& .expire-outline': {
                        '&.has-value': {
                            borderStyle: 'solid'
                            , borderColor: 'gray'
                        }
                        , height: '100%'
                        , borderWidth: '1px'
                        , borderRadius: AppTheme.spacing(1)
                        , padding: AppTheme.spacing(.75)
                        , display: 'flex'
                        , flexDirection: 'column'
                        , justifyContent: 'space-between'
                        , '& .exp-text': {
                            ...AppTheme.typography.caption
                            , width: '100%'
                            , display: 'block'
                            , textAlign: 'center'
                        }
                    }
                }
            }
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
            FClientUtil.ReplaceAll((Ev.target.value as string || ''), ' ', '').trim()
        );
    };

    OnCardNameChange:  ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (Ev) =>
    {
        this.context.ACT_SetCardName((Ev.target?.value as string || ''));
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

    /**
     * this is really hacky, in real life i would just make my own task mask component cuz this one sucks
     * it causes its own problems
     * but i dont wanna spend all day on this
     * */
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

    OnCCnumberFocused = (Ev: any)=>
    {
        this.context.ACT_SetCCNumFocused(true);
    };

    OnCCnumberBlur = (Ev: any)=>
    {
        this.context.ACT_SetCCNumFocused(false);
        this.FixAnnoyingCursorBug(Ev);
    };

    GetCCnumDisplay = (bIsFocused: boolean, CCnum: string): string =>
    {
        CCnum = CCnum.toString().trim();

        if(CCnum.length <= 4)
        {
            return CCnum;
        }
        else if(CCnum.length > 4 && CCnum.length <= 8)
        {
            const Start = CCnum.toString().substr(0,4);
            const NumLeft = CCnum.toString().length - 4;
            const End = bIsFocused ? CCnum.slice(-NumLeft) : Array(NumLeft).fill('*').join('');
            return `${Start}\u2000\u2000\u2000\u2000 ${End}`;
        }
        else if(CCnum.length > 8 && CCnum.length <= 12)
        {
            const Start = CCnum.toString().substr(0,4);
            const NumLeft = CCnum.toString().length - 8;
            const Mid = bIsFocused ? CCnum.substr(4,4) : Array(4).fill('*').join('');
            const End = bIsFocused ? CCnum.slice(-NumLeft) : Array(NumLeft).fill('*').join('');
            return `${Start}\u2000\u2000\u2000\u2000${Mid}\u2000\u2000\u2000\u2000 ${End}\u2000\u2000\u2000\u2000`;
        }
        else
        {
            const Start = CCnum.toString().substr(0,4);
            const Mid1 = bIsFocused ? CCnum.substr(4,4) : Array(4).fill('*').join('');
            const Mid2 = bIsFocused ? CCnum.substr(8,4) : Array(4).fill('*').join('');
            const End = CCnum.toString().substr(12,4).trim();
            return `${Start}\u2000\u2000\u2000\u2000${Mid1}\u2000\u2000\u2000\u2000${Mid2}\u2000\u2000\u2000\u2000${End}`;
        }
    };

    render(): JSX.Element
    {

        const {
            classes: cls
        } = this.props;

        const {
            COMP_CCInfo: CCInfo
        } = this.context;

        const CCnumberIsFocused: boolean = this.context.COMP_CCNumIsFocused;
        const CCNumDisplay = this.GetCCnumDisplay(CCnumberIsFocused, CCInfo.CardNum);

        const ExpText = `${CCInfo.ExpireMonth||'MM'}/${CCInfo.ExpireYear ? CCInfo.ExpireYear.toString().slice(-2) : 'YY'}`;
        const Holder = CCInfo.CardName;

        const ExpireOutlineClasses = {
            'expire-outline': true
            ,'has-value': ExpText !=='MM/YY'
        };

        return (
            <>
                <Grid item xs={12} className={cls!.pageRoot}>

                    <Paper style={{
                        height: 'auto !important'
                    }} elevation={3}>

                        <form noValidate autoComplete="off" className={cls!.form}>
                            <Grid container spacing={4}>
                                <Grid className={cls!.cardWrapper} item xs={12}>
                                    <img className='visa' src={Visa}/>
                                    <img className='chip' src={Chip}/>
                                    <div className='middle-wrapper'>
                                        <div className='card-number'>
                                            <Typography className='ccnum-text'>{CCNumDisplay}</Typography>
                                        </div>
                                    </div>
                                    <div className='bottom-wrapper'>
                                        <div className='card-holder-box'>
                                            <div className='holder-container'>
                                                <Typography className='card-label' style={{ textAlign: 'left' }} variant='caption'>
                                                    Card Holder
                                                </Typography>
                                                <Typography className='holder-text'>{Holder}</Typography>
                                            </div>
                                        </div>
                                        <div className='expire-box'>
                                            <div className={clsx(ExpireOutlineClasses)}>
                                                <Typography className='card-label' variant='caption'>
                                                Expires
                                                </Typography>
                                                <Typography className='exp-text'>{ExpText}</Typography>
                                            </div>
                                        </div>

                                    </div>
                                </Grid>
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
                                            onFocus={this.OnCCnumberFocused}
                                            onBlur={this.OnCCnumberBlur}
                                            onClick={this.FixAnnoyingCursorBug}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ maxLength: 50, type: 'text' }}
                                        fullWidth
                                        label="Card Name"
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
                                    <Button onClick={this.context.SubmitCardInfo} disabled={!this.context.CanSubmitCard()} fullWidth variant="contained" color="primary">
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
