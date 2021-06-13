import { action, computed, configure, makeObservable, observable } from 'mobx';
import { createContext, useEffect, useState } from 'react';
import Router from 'next/router';


type RootStoreConstructorArgs = {

};

interface FCCInfo
{
    CardNum: string;
    CardName: string;
    ExpireMonth: string;
    ExpireYear: string;
    CCV: string;
}

export class FRootAppStore
{

    static _inst: FRootAppStore;

    private OBS_CCInfo: FCCInfo;
    public get COMP_CCInfo(){ return this.OBS_CCInfo; }

    private OBS_CCNumIsFocused: boolean;
    public get COMP_CCNumIsFocused(){ return this.OBS_CCNumIsFocused; }

    constructor(Args: RootStoreConstructorArgs)
    {
        if (FRootAppStore._inst)
        {
            throw new Error('singleton pattern violated!');
        }
        FRootAppStore._inst = this;
        this.OBS_CCNumIsFocused = false;
        this.OBS_CCInfo = {
            CardNum: ''
            , ExpireMonth: ''
            , ExpireYear: ''
            , CCV: ''
            , CardName: ''
        };

        makeObservable<
        FRootAppStore,
        (
        //declarations only needed here for non public props
        'OBS_CCInfo' | 'OBS_CCNumIsFocused'
        )>(this, {
                OBS_CCInfo: observable
                , OBS_CCNumIsFocused: observable
                , COMP_CCInfo: computed
                , COMP_CCNumIsFocused: computed
                , ACT_SetCardNum: action
                , ACT_SetExpireMonth: action
                , ACT_SetExpireYear: action
                , ACT_SetCCV: action
                , ACT_SetCardName: action
                , ACT_SetCCNumFocused: action
            });
    }

    public ACT_SetCCNumFocused(bFocus: boolean)
    {
        this.OBS_CCNumIsFocused = bFocus;
    }

    public ACT_SetCardNum(Val: string)
    {
        this.OBS_CCInfo.CardNum = Val;
    }
    public ACT_SetCardName(Val: string)
    {
        this.OBS_CCInfo.CardName = Val;
    }

    public CanSubmitCard = (): boolean =>
    {
        if(this.OBS_CCInfo.CardNum?.length < 16)
        {
            return false;
        }
        if(!this.OBS_CCInfo.CardName)
        {
            return false;
        }
        if(this.OBS_CCInfo.CCV.length < 3)
        {
            return false;
        }
        return !!this.OBS_CCInfo.ExpireMonth && !!this.OBS_CCInfo.ExpireYear;
    };

    public SubmitCardInfo = () =>
    {
        // this turns it into POJO from observable that has a ton of other stuff on it
        const Info = { ...(this.OBS_CCInfo) };
        console.log(Info);
    };

    public ACT_SetExpireMonth(Val: string)
    {
        this.OBS_CCInfo.ExpireMonth = Val;
    }

    public ACT_SetExpireYear(Val: string)
    {
        this.OBS_CCInfo.ExpireYear = Val;
    }

    public ACT_SetCCV(Val: string)
    {
        this.OBS_CCInfo.CCV = Val;
    }

    static GetInstance(Args: RootStoreConstructorArgs)
    {
        if (FRootAppStore._inst)
        {
            return FRootAppStore._inst;
        }
        return new FRootAppStore(Args);
    }
}

export const AppRootStoreContext = createContext<FRootAppStore>(null as any);

export const RootContextProvider = (props: any) =>
{
    const [RootStore, SetRootStore] = useState<FRootAppStore>(FRootAppStore.GetInstance({}));

    useEffect(() =>
    {
        const AppStore = FRootAppStore.GetInstance({ });
        SetRootStore(AppStore);
    });

    return (
        <AppRootStoreContext.Provider value={RootStore!}>
            {props.children}
        </AppRootStoreContext.Provider>
    );
};
